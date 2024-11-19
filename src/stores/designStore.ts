import create from 'zustand';

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
  setUploadedFile: (file: File | null) => void;
  updateParameter: (key: keyof DesignParameters, value: any) => void;
  generateDesigns: () => Promise<void>;
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

  setUploadedFile: (file) => set({ uploadedFile: file }),

  updateParameter: (key, value) => set((state) => ({
    parameters: {
      ...state.parameters,
      [key]: value,
    },
  })),

  generateDesigns: async () => {
    const { uploadedFile, parameters } = get();
    
    if (!uploadedFile) return;

    set({ isGenerating: true });

    try {
      // Simulate AI generation with placeholder images
      // In production, replace with actual API calls to AI service
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockDesigns = [
        { url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b', timestamp: Date.now() },
        { url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e', timestamp: Date.now() },
        { url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2', timestamp: Date.now() },
        { url: 'https://images.unsplash.com/photo-1604176354204-9268737828e4', timestamp: Date.now() },
      ];

      set({ generatedDesigns: mockDesigns });
    } catch (error) {
      console.error('Error generating designs:', error);
    } finally {
      set({ isGenerating: false });
    }
  },
}));

export default useDesignStore;