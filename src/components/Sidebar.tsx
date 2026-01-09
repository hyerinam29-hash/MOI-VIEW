import React from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  currentMode: 'photo' | 'video';
  onModeChange: (mode: 'photo' | 'video') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentMode, onModeChange }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h1>MOI VIEW</h1>
        <span>모이뷰</span>
      </div>

      <div className={styles.menuGroup}>
        <p className={styles.menuTitle}>모드 선택</p>
        
        <button 
          className={`${styles.menuItem} ${currentMode === 'photo' ? styles.active : ''}`}
          onClick={() => onModeChange('photo')}
        >
          <div className={styles.iconBox}>📷</div>
          <div className={styles.menuText}>
            <span className={styles.mainText}>사진 모드</span>
            <span className={styles.subText}>AI 배경 생성</span>
          </div>
        </button>

        <button 
          className={`${styles.menuItem} ${currentMode === 'video' ? styles.active : ''}`}
          onClick={() => onModeChange('video')}
        >
          <div className={styles.iconBox}>🎥</div>
          <div className={styles.menuText}>
            <span className={styles.mainText}>동영상 모드</span>
            <span className={styles.subText}>AI 배경 교체</span>
          </div>
        </button>
      </div>

      <div className={styles.bottomMenu}>
        <button className={styles.bottomLink}><span>❓</span> 도움말</button>
        <button className={styles.bottomLink}><span>⚙️</span> 설정</button>
      </div>
    </aside>
  );
};

export default Sidebar;
