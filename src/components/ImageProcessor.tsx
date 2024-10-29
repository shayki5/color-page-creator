import { useCallback } from 'react';

interface ImageProcessorProps {
  width: number;
  height: number;
  imageData: ImageData;
}

export const processImage = ({ width, height, imageData }: ImageProcessorProps): ImageData => {
  const data = new Uint8ClampedArray(imageData.data);
  const grayscale = new Uint8ClampedArray(width * height);
  
  // Convert to grayscale
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    grayscale[i / 4] = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  }

  // Sobel operator kernels
  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
  
  const edges = new Uint8ClampedArray(width * height);
  
  // Apply Sobel operator
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let pixelX = 0;
      let pixelY = 0;
      
      // Calculate gradient
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const idx = (y + i) * width + (x + j);
          const kernelIdx = (i + 1) * 3 + (j + 1);
          pixelX += grayscale[idx] * sobelX[kernelIdx];
          pixelY += grayscale[idx] * sobelY[kernelIdx];
        }
      }
      
      // Calculate magnitude
      const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
      edges[y * width + x] = magnitude > 30 ? 0 : 255; // Threshold for edges
    }
  }
  
  // Create final image data
  const output = new Uint8ClampedArray(data.length);
  for (let i = 0; i < edges.length; i++) {
    const idx = i * 4;
    output[idx] = edges[i];     // R
    output[idx + 1] = edges[i]; // G
    output[idx + 2] = edges[i]; // B
    output[idx + 3] = 255;      // A
  }
  
  return new ImageData(output, width, height);
};