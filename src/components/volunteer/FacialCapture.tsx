"use client"

import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Smile, RefreshCw, X } from 'lucide-react';

interface FacialCaptureProps {
  onImageCapture: (imageSrc: string) => void;
  onClose: () => void;
}

const FacialCapture: React.FC<FacialCaptureProps> = ({ onImageCapture, onClose }) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const handleUserMedia = useCallback(() => {
    setIsCameraReady(true);
    setCameraError(null);
  }, []);

  const handleUserMediaError = useCallback((error: string | DOMException) => {
    console.error('Camera error:', error);
    setCameraError('Could not access camera. Please ensure camera permissions are granted.');
  }, []);

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const retakeImage = useCallback(() => {
    setCapturedImage(null);
  }, []);

  const confirmImage = useCallback(() => {
    if (capturedImage) {
      onImageCapture(capturedImage);
    }
  }, [capturedImage, onImageCapture]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-montserrat text-xl font-bold text-gray-800">Facial Verification</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm mb-2">
            Please ensure you are in a well-lit area and your face is clearly visible.
            {!capturedImage && (
              <span className="block mt-2 text-[#09869a] font-medium">
                <Smile className="inline-block mr-1 w-5 h-5" /> Smile for the camera!
              </span>
            )}
          </p>
        </div>

        {cameraError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4">
            {cameraError}
          </div>
        )}

        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
          {!capturedImage ? (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode: "user",
                }}
                onUserMedia={handleUserMedia}
                onUserMediaError={handleUserMediaError}
                className="w-full h-full object-cover"
                mirrored
              />
              {!isCameraReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                  <div className="animate-pulse flex flex-col items-center text-white">
                    <Camera className="w-8 h-8 mb-2" />
                    <span>Initializing camera...</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <img 
              src={capturedImage} 
              alt="Captured facial image" 
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex justify-center space-x-4">
          {!capturedImage ? (
            <button
              onClick={captureImage}
              disabled={!isCameraReady}
              className="bg-[#09869a] hover:bg-[#09869a]/90 transition-colors text-white px-6 py-2 rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Camera className="w-5 h-5 mr-2" />
              Capture Image
            </button>
          ) : (
            <>
              <button
                onClick={retakeImage}
                className="border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700 px-6 py-2 rounded-md flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retake
              </button>
              <button
                onClick={confirmImage}
                className="bg-[#09869a] hover:bg-[#09869a]/90 transition-colors text-white px-6 py-2 rounded-md flex items-center"
              >
                Confirm & Continue
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacialCapture;
