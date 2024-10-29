import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { ImageDown, Upload } from 'lucide-react';
import { DropZone } from './DropZone';
import { Controls } from './Controls';
import { processImage } from './ImageProcessor';
import { useDebounce } from '../hooks/useDebounce';

export const ImageConverter: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [coloringPage, setColoringPage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  
  const debouncedBrightness = useDebounce(brightness, 150);
  const debouncedContrast = useDebounce(contrast, 150);

  const canvas = useMemo(() => document.createElement('canvas'), []);
  const ctx = useMemo(() => canvas.getContext('2d')!, [canvas]);

  const convertToColoringPage = useCallback((imageUrl: string) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      if (canvas.width !== img.width || canvas.height !== img.height) {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = `brightness(${100 + debouncedBrightness}%) contrast(${100 + debouncedContrast}%)`;
      ctx.drawImage(img, 0, 0);
      ctx.filter = 'none';
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const processedData = processImage({
        width: canvas.width,
        height: canvas.height,
        imageData
      });
      
      ctx.putImageData(processedData, 0, 0);
      setColoringPage(canvas.toDataURL());
      setIsProcessing(false);
    };
    
    img.src = imageUrl;
  }, [canvas, ctx, debouncedBrightness, debouncedContrast]);

  useEffect(() => {
    if (originalImage) {
      setIsProcessing(true);
      convertToColoringPage(originalImage);
    }
  }, [originalImage, debouncedBrightness, debouncedContrast, convertToColoringPage]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setIsProcessing(true);
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setOriginalImage(result);
      };
      
      reader.readAsDataURL(file);
    }
  }, []);

  const downloadColoringPage = () => {
    if (coloringPage) {
      const link = document.createElement('a');
      link.download = 'coloring-page.png';
      link.href = coloringPage;
      link.click();
    }
  };

  const resetImage = () => {
    setOriginalImage(null);
    setColoringPage(null);
    setBrightness(0);
    setContrast(0);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {!originalImage && <DropZone onDrop={onDrop} />}

      {isProcessing && (
        <div className="text-center py-12">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-20"></div>
            <div className="absolute top-2 left-2 w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 mt-6 text-lg">Creating your masterpiece...</p>
        </div>
      )}

      {originalImage && !isProcessing && (
        <div className="space-y-8">
          <div className="flex justify-end">
            <button
              onClick={resetImage}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl
                hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.01] transition-all duration-200
                flex items-center gap-2 font-semibold shadow-md"
            >
              <Upload className="w-4 h-4" />
              Upload New Image
            </button>
          </div>

          <Controls
            brightness={brightness}
            contrast={contrast}
            onBrightnessChange={setBrightness}
            onContrastChange={setContrast}
          />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 pl-2">Original Image</h3>
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 pl-2">Coloring Page</h3>
              <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
                <img
                  src={coloringPage || ''}
                  alt="Coloring page"
                  className="w-full"
                />
              </div>
              <button
                onClick={downloadColoringPage}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl
                  hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.01] transition-all duration-200
                  flex items-center justify-center gap-3 font-semibold shadow-lg"
              >
                <ImageDown className="w-5 h-5" />
                Download Your Coloring Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};