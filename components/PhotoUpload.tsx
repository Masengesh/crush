import React, { useState, useRef } from 'react';
import Button from './Button';

interface PhotoUploadProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  photos,
  onPhotosChange,
  maxPhotos = 6,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newPhotos = Array.from(files)
      .slice(0, maxPhotos - photos.length)
      .map(file => URL.createObjectURL(file));

    onPhotosChange([...photos, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="photo-upload">
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo} alt={`Photo ${index + 1}`} />
            <button
              type="button"
              className="remove-photo"
              onClick={() => removePhoto(index)}
            >
              ×
            </button>
          </div>
        ))}
        {photos.length < maxPhotos && (
          <div className="photo-upload-slot" onClick={openFileDialog}>
            <div className="upload-placeholder">
              <span>+</span>
              <p>Add Photo</p>
            </div>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <p className="photo-count">{photos.length}/{maxPhotos} photos</p>
    </div>
  );
};

export default PhotoUpload;