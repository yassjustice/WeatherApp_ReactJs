import React from 'react';
import styles from './Particles.module.css';

function Particles() {
  return (
    <div className={styles.container}>
      {[...Array(20)].map((_, i) => (
        <div key={i} className={styles.particle} 
             style={{
               '--delay': `${Math.random() * 5}s`,
               '--position': `${Math.random() * 100}%`
             }} 
        />
      ))}
    </div>
  );
}

export default Particles;