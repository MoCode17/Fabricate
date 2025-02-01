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
  generateDesignsFunc: () => Promise<void>;
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

  generateDesignsFunc: async () => {
    const { uploadedFile, parameters } = get();
    set({ isGenerating: true, error: null });

    try {
      let imageBase64: string | null = null;
      if (uploadedFile) {
        const reader = new FileReader();
        const result = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(uploadedFile);
        });

      // Ensure the result is a string
      if (typeof result === 'string') {
        imageBase64 = result;
      } else {
        throw new Error('Failed to convert image to base64');
      }

      }

      /*
      const designs = await generateDesigns({
        
        ...parameters,
        image: imageBase64,
      });
      */
      const response = await fetch('http://localhost:3000/designs');
      console.log("yooooo");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      //set({ generatedDesigns: designs });
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