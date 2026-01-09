import React, { useRef } from 'react';
import styles from './PreviewPanel.module.css';
import html2canvas from 'html2canvas';

interface PreviewPanelProps {
  backgroundSrc: string | null;
  personSrc: string | null;
  isLoading: boolean;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ backgroundSrc, personSrc, isLoading }) => {
  const resultRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!resultRef.current) return;
    
    try {
      const canvas = await html2canvas(resultRef.current, {
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'moiview_result.png';
      link.click();
    } catch (error) {
      console.error('Download error:', error);
      alert('이미지 다운로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3>미리보기</h3>
      </div>

      <div className={styles.previewArea}>
        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>AI가 배경을 합성하고 있습니다...</p>
          </div>
        ) : (backgroundSrc || personSrc) ? (
          <div className={styles.resultContainer} ref={resultRef}>
            {backgroundSrc && (
              <img src={backgroundSrc} alt="배경" className={styles.backgroundImage} />
            )}
            {personSrc && (
              <img src={personSrc} alt="인물" className={styles.personImage} />
            )}
            
            <div className={styles.overlay}>
               <button className={styles.downloadBtn} onClick={handleDownload}>
                 💾 이미지 저장
               </button>
            </div>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>✨</div>
            <p className={styles.emptyText}>AI 배경을 생성하면</p>
            <p className={styles.emptyText}>여기에 미리보기가 표시됩니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
