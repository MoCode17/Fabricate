import { Download, Loader, AlertCircle } from "lucide-react";
//import { useDesign } from "../../stores/designContext";
import { useState, useEffect } from "react";

export default function GeneratedDesigns() {
  const [loading, setLoading] = useState(false);
  const [designs, setDesign] = useState<
    {
      id: number;
      filename: string;
      prompt: string;
      ceated_at: string;
    }[]
  >([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/designs");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result);
        setDesign(result);
      } catch (error) {
        console.log(error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //const { generatedDesigns, isGenerating, error, generateDesignsFunc } =
  // useDesignStore();

  if (error) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center text-red-500">
          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-orange-500 mx-auto" />
          <p className="mt-4 text-gray-600">Generating your designs...</p>
          <p className="text-sm text-gray-500 mt-2">
            This may take a few minutes
          </p>
        </div>
      </div>
    );
  }

  if (designs.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>No designs generated yet</p>
          <p className="text-sm mt-2">
            Upload a design or enter a prompt to get started
          </p>
        </div>
      </div>
    );
  }

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const contentType = response.headers.get("content-type");
      console.log(response.headers);
      // Verify it's an image
      if (!contentType || !contentType.includes("image")) {
        throw new Error("Content is not an image");
      }

      const blob = await response.blob();
      // Create blob with explicit type
      const imageBlob = new Blob([blob], { type: "image/png" });

      const downloadUrl = window.URL.createObjectURL(imageBlob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `design-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="h-full flex items-center justify-center overflow-y-auto">
      <div className="grid grid-cols-2 gap-4 p-5">
        {designs.map((design, index) => (
          <div key={index} className="relative group aspect-square w-full">
            <div className="w-full h-full rounded-lg overflow-hidden">
              <img
                src={"http://localhost:3000/designs/" + design?.filename}
                alt={`Generated design ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={() =>
                  handleDownload(
                    "http://localhost:3000/designs/" + design?.filename
                  )
                }
                className="bg-white text-gray-900 px-4 py-2 rounded-lg flex items-center hover:bg-gray-100 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
