import { create } from 'zustand';
import { generateDesigns } from '../services/aiService';

interface DesignParameters {
  style: string;
  pattern: string;
  colors: string[];
  prompt: string;
}

interface GeneratedDesign {
  url: string;
  timestamp: number;
}

interface DesignStore {
  uploadedFile: File | null;
  parameters: DesignParameters;
  generatedDesigns: GeneratedDesign[];
  isGenerating: boolean;
  error: string | null;
  setUploadedFile: (file: File | null) => void;
  updateParameter: (key: keyof DesignParameters, value: any) => void;
  generateDesigns: () => Promise<void>;
  clearError: () => void;
}

const useDesignStore = create<DesignStore>((set, get) => ({
  uploadedFile: null,
  parameters: {
    style: 'streetwear',
    pattern: 'solid',
    colors: ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5'],
    prompt: '',
  },
  generatedDesigns: [],
  isGenerating: false,
  error: null,

  setUploadedFile: (file) => set({ uploadedFile: file }),

  updateParameter: (key, value) => set((state) => ({
    parameters: {
      ...state.parameters,
      [key]: value,
    },
  })),

  clearError: () => set({ error: null }),

  generateDesigns: async () => {
    const { uploadedFile, parameters } = get();
    set({ isGenerating: true, error: null });

    try {
      let imageBase64;
      if (uploadedFile) {
        const reader = new FileReader();
        imageBase64 = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(uploadedFile);
        });
      }

      const designs = await generateDesigns({
        ...parameters,
        image: imageBase64,
      });

      set({ generatedDesigns: designs });
    } catch (error) {
      // Convert error to string to ensure it's serializable
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate designs. Please try again.';
      set({ error: errorMessage });
    } finally {
      set({ isGenerating: false });
    }
  },
}));

export default useDesignStore;