import React, { useRef, useState } from 'react';
import styles from './PhotoUploader.module.css';

interface PhotoUploaderProps {
  onFileSelect: (file: File) => void;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>⬆️</span>
        <h3>내 사진 업로드</h3>
      </div>

      <div 
        className={`${styles.uploadArea} ${isDragging ? styles.dragActive : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className={styles.content}>
          <div className={styles.uploadIcon}>🖼️</div>
          <p className={styles.mainText}>사진을 드래그하거나 클릭</p>
          <p className={styles.subText}>PNG, JPG 형식 지원</p>
        </div>
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleChange} 
          accept="image/png, image/jpeg" 
          className={styles.hiddenInput} 
        />
      </div>
    </div>
  );
};

export default PhotoUploader;
