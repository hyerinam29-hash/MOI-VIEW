import React, { useState } from 'react';
import styles from './BackgroundSelector.module.css';

interface BackgroundSelectorProps {
  onSelectBackground: (bgId: string, customSrc?: string) => void;
  selectedBackground: string | null;
  onGenerate: () => void;
  onGenerateBackground: (prompt: string) => Promise<void>;
  isGeneratingBg: boolean;
  searchResults?: any[];
}

const Backgrounds = [
  { id: 'paris', label: '해 질 녘의 파리 에펠탑 앞', src: '/backgrounds/paris.jpg' },
  { id: 'kyoto', label: '벚꽃이 만발한 교토의 거리', src: '/backgrounds/kyoto.jpg' },
  { id: 'santorini', label: '노을 지는 산토리니 블루돔', src: '/backgrounds/santorini.jpg' },
  { id: 'swissen', label: '눈 내리는 스위스 알프스', src: '/backgrounds/swissen.jpg' }
];

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ 
  onSelectBackground, 
  selectedBackground, 
  onGenerate,
  onGenerateBackground,
  isGeneratingBg,
  searchResults = []
}) => {
  const [prompt, setPrompt] = useState('');

  const handlePresetClick = (bg: typeof Backgrounds[0]) => {
    setPrompt(bg.label);
    onSelectBackground(bg.id);
  };

  const handleGenerateClick = () => {
    if (prompt.trim()) {
      onGenerateBackground(prompt);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>✏️</span>
        <h3>배경 생성</h3>
      </div>
      
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input 
            type="text" 
            placeholder="원하는 여행지를 설명해주세요..." 
            className={styles.textInput}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button 
            className={styles.searchBtn}
            onClick={handleGenerateClick}
            disabled={isGeneratingBg || !prompt.trim()}
          >
            {isGeneratingBg ? '...' : '검색'}
          </button>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className={styles.resultsGrid}>
          {searchResults.map((res) => (
            <div 
              key={res.id} 
              className={`${styles.resultItem} ${selectedBackground === res.id ? styles.selectedResult : ''}`}
              onClick={() => onSelectBackground(res.id, res.src)}
            >
              <img src={res.src} alt={res.label} />
            </div>
          ))}
        </div>
      )}

      <div className={styles.tagsContainer}>
        {Backgrounds.map((bg) => (
          <button 
            key={bg.id}
            className={`${styles.tag} ${selectedBackground === bg.id ? styles.active : ''}`}
            onClick={() => handlePresetClick(bg)}
          >
            {bg.label}
          </button>
        ))}
      </div>

      <button 
        className={styles.generateBtn} 
        disabled={!selectedBackground || isGeneratingBg}
        onClick={onGenerate}
      >
        ✨ AI 합성하기
      </button>
    </div>
  );
};

export default BackgroundSelector;
