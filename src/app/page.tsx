'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import Sidebar from '@/components/Sidebar';
import BackgroundSelector from '@/components/BackgroundSelector';
import PhotoUploader from '@/components/PhotoUploader';
import PreviewPanel from '@/components/PreviewPanel';
import VideoMode from '@/components/VideoMode';

export default function Home() {
  const [currentMode, setCurrentMode] = useState<'photo' | 'video'>('photo');
  
  // Photo Mode States
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  const [customBgSrc, setCustomBgSrc] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]); // 검색 결과 저장용
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingBg, setIsGeneratingBg] = useState(false);

  const bgMap: Record<string, string> = {
    'paris': '/backgrounds/paris.jpg',
    'kyoto': '/backgrounds/kyoto.jpg',
    'santorini': '/backgrounds/santorini.jpg',
    'swissen': '/backgrounds/swissen.jpg'
  };

  // 배경 선택 핸들러
  const handleSelectBackground = (bgId: string, customSrc?: string) => {
    setSelectedBackground(bgId);
    if (customSrc) {
      setCustomBgSrc(customSrc);
    } else if (bgMap[bgId]) {
      setCustomBgSrc(null);
    }
    console.log(`Background selected: ${bgId}`);
  };

  // 배경 생성 핸들러 (Unsplash 연동)
  const handleGenerateBackground = async (prompt: string) => {
    setIsGeneratingBg(true);
    setSearchResults([]); // 이전 결과 초기화
    try {
      const response = await fetch('/api/generate-background', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('배경 생성 실패');
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setSearchResults(data.results); // 4장의 검색 결과 저장
        // 첫 번째 이미지 자동 선택
        const firstResult = data.results[0];
        setCustomBgSrc(firstResult.src);
        setSelectedBackground(firstResult.id);
      } else {
        alert('검색 결과가 없습니다.');
      }
    } catch (error: any) {
      console.error('BG Generation error:', error);
      alert('배경 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGeneratingBg(false);
    }
  };

  // 파일 업로드 핸들러
  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    console.log(`File uploaded: ${file.name}`);
  };

  // 생성하기 핸들러 (실제 API 호출)
  const handleGenerate = async () => {
    if (!selectedBackground || !uploadedFile) {
      alert('배경을 선택하고 사진을 업로드해주세요.');
      return;
    }
    
    setIsLoading(true);
    setPersonImage(null);

    try {
      const formData = new FormData();
      formData.append('image', uploadedFile);

      const response = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '배경 제거 실패');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setPersonImage(imageUrl);
    } catch (error: any) {
      console.error('Generation error:', error);
      alert(`오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const currentBgSrc = selectedBackground ? (bgMap[selectedBackground] || customBgSrc) : null;

  return (
    <div className={styles.container}>
      <Sidebar 
        currentMode={currentMode} 
        onModeChange={setCurrentMode}
      />
      
      <main className={styles.mainContent}>
        {currentMode === 'photo' ? (
          <>
            <div className={styles.pageHeader}>
              <h2 className={styles.pageTitle}>AI 배경 생성</h2>
              <p className={styles.pageDescription}>원하는 여행지를 설명해주세요. AI가 멋진 배경을 찾아드립니다!</p>
            </div>

            <div className={styles.contentGrid}>
              <div className={styles.leftColumn}>
                <BackgroundSelector 
                   selectedBackground={selectedBackground} 
                   onSelectBackground={handleSelectBackground}
                   onGenerate={handleGenerate} 
                   onGenerateBackground={handleGenerateBackground}
                   isGeneratingBg={isGeneratingBg}
                   searchResults={searchResults}
                />
                <PhotoUploader onFileSelect={handleFileSelect} />
              </div>
              
              <div className={styles.rightColumn}>
                <PreviewPanel 
                  backgroundSrc={currentBgSrc} 
                  personSrc={personImage}
                  isLoading={isLoading} 
                />
              </div>
            </div>
          </>
        ) : (
          <VideoMode />
        )}
      </main>
    </div>
  );
}
