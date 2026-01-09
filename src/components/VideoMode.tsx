import React from 'react';
import styles from './VideoMode.module.css';

const VideoMode: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>동영상 합성</h2>
        <p className={styles.pageDescription}>AI가 생성한 배경 영상 위에 나의 동영상을 합성합니다</p>
      </div>

      <div className={styles.banner}>
        <span className={styles.bannerIcon}>⚠️</span>
        <div className={styles.bannerText}>
          <strong>AI 배경 영상 모드</strong>
          <p>실시간 AI 생성 대신, 사전에 AI로 제작된 고품질 배경 영상을 사용합니다. 동영상은 5초 이하, 10MB 미만으로 제한됩니다.</p>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.leftColumn}>
          
          {/* AI 배경 영상 카드 */}
          <div className={styles.bgCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>▷</span>
              <h3>AI 배경 영상</h3>
            </div>
            <div className={styles.videoPlaceholder}>
               <div className={styles.videoInfo}>
                 <span className={styles.videoLabel}>AI Generated</span>
                 <span className={styles.videoSub}>도시의 야경 - Runway Gen-2</span>
               </div>
            </div>
          </div>

          {/* 내 동영상 업로드 카드 */}
          <div className={styles.uploadCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>⬆️</span>
              <h3>내 동영상 업로드</h3>
            </div>
            <div className={styles.uploadArea}>
              <div className={styles.uploadContent}>
                <div className={styles.uploadIcon}>🎥</div>
                <p className={styles.uploadMain}>동영상을 드래그하거나 클릭</p>
                <p className={styles.uploadSub}>MP4, WebM (최대 10MB, 5초 이하)</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.rightColumn}>
          {/* 합성 결과 카드 */}
          <div className={styles.resultCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>📹</span>
              <h3>합성 결과</h3>
            </div>
            <div className={styles.resultPlaceholder}>
              <div className={styles.timeIcon}>🕒</div>
              <p>동영상을 업로드하고</p>
              <p>합성을 시작하세요</p>
              <button className={styles.startBtn} disabled>
                ▷ 합성 시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoMode;
