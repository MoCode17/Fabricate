import React, { createContext, useContext, useState, useCallback } from "react";
import { generateDesigns } from "../services/aiService";

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

interface DesignContextType {
  uploadedFile: File | null;
  parameters: DesignParameters;
  //generatedDesigns: GeneratedDesign[];
  isGenerating: boolean;
  error: string | null;
  setUploadedFile: (file: File | null) => void;
  updateParameter: (key: keyof DesignParameters, value: any) => void;
  generateDesignsFunc: () => Promise<void>;
  clearError: () => void;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

const DesignProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parameters, setParameters] = useState<DesignParameters>({
    style: "streetwear",
    pattern: "solid",
    colors: ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5"],
    prompt: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateParameter = useCallback(
    (key: keyof DesignParameters, value: any) => {
      setParameters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const generateDesignsFunc = useCallback(async () => {
    console.log("you seeee meeeee");
    console.log("Parameters: ", parameters);
    setIsGenerating(true);
    setError(null);

    try {
      let imageBase64: string | null = null;
      if (uploadedFile) {
        const reader = new FileReader();
        const result = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.readAsDataURL(uploadedFile);
        });

        if (typeof result === "string") {
          imageBase64 = result;
        } else {
          throw new Error("Failed to convert image to base64");
        }
      }

      const response = await fetch("http://localhost:3000/drip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: parameters.prompt,
          //image: imageBase64,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `HTTP error! status: ${response.status}`
        );
      }

      const json = await response.json();
      console.log(json);
      // setGeneratedDesigns(designs);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to generate designs. Please try again.";
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  }, [uploadedFile]);

  const value = {
    uploadedFile,
    parameters,
    isGenerating,
    error,
    setUploadedFile,
    updateParameter,
    generateDesignsFunc,
    clearError,
  };

  return (
    <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
  );
};

const useDesign = () => {
  const context = useContext(DesignContext);
  if (context === undefined) {
    throw new Error("useDesign must be used within a DesignProvider");
  }
  return context;
};

export { DesignProvider, useDesign };
export type { DesignParameters, GeneratedDesign, DesignContextType };
