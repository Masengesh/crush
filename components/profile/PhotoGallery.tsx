import React, { useState, useRef } from 'react';
import Button from '../Button';

interface PhotoGalleryProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onPhotosChange,
  maxPhotos = 6,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    try {
      const newPhotos = Array.from(files)
        .slice(0, maxPhotos - photos.length)
        .map(file => URL.createObjectURL(file));

      // In a real app, you'd upload to a server here
      // For now, we'll just use object URLs
      onPhotosChange([...photos, ...newPhotos]);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="photo-gallery">
      <h4>Photos</h4>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo} alt={`Photo ${index + 1}`} />
            <button
              type="button"
              className="remove-photo"
              onClick={() => removePhoto(index)}
              disabled={uploading}
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
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default PhotoGallery;