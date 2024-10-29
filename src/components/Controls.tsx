import React from 'react';
import { Sliders } from 'lucide-react';

interface ControlsProps {
  brightness: number;
  contrast: number;
  onBrightnessChange: (value: number) => void;
  onContrastChange: (value: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  brightness,
  contrast,
  onBrightnessChange,
  onContrastChange,
}) => {
  return (
    <div className="glass-effect rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
          <Sliders className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-semibold text-gray-700 text-lg">Magic Adjustments</h3>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-gray-600 font-medium">
              Brightness
            </label>
            <span className="text-sm px-2 py-1 rounded-full bg-purple-100 text-purple-700">
              {brightness}
            </span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            value={brightness}
            onChange={(e) => onBrightnessChange(Number(e.target.value))}
            className="range-slider"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-gray-600 font-medium">
              Contrast
            </label>
            <span className="text-sm px-2 py-1 rounded-full bg-pink-100 text-pink-700">
              {contrast}
            </span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            value={contrast}
            onChange={(e) => onContrastChange(Number(e.target.value))}
            className="range-slider"
          />
        </div>
      </div>
    </div>
  );
};