import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const slides = [
  '/images/seva1.png',
  '/images/seva2.png',
  '/images/seva3.png',
  '/images/seva4.png',
  '/images/seva5.png',
  '/images/seva6.png'
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const handlePresent = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'Escape') {
      setIsFullScreen(false);
    }
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', () => {
      setIsFullScreen(!!document.fullscreenElement);
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', () => {});
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Seva Slideshow</title>
        <meta name="description" content="Seva Slideshow Presentation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${isFullScreen ? styles.fullscreen : ''}`}>
        <div className={styles.slideshowContainer}>
          <div className={`${styles.slideWrapper} ${isFullScreen ? styles.fullscreenSlide : ''}`}>
            {isFullScreen ? (
              <>
                <div className={styles.exitInfo}>
                  To exit full screen, press <kbd>esc</kbd>
                </div>
                <img 
                  src={slides[currentSlide]} 
                  alt={`Slide ${currentSlide + 1}`}
                  className={styles.slide}
                />
              </>
            ) : (
              <img 
                src={slides[currentSlide]} 
                alt={`Slide ${currentSlide + 1}`}
                className={styles.slide}
              />
            )}
          </div>

          {!isFullScreen && (
            <>
              <div className={styles.controls}>
                <button className={styles.presentBtn} onClick={handlePresent}>
                  Present
                </button>
              </div>

              <div className={styles.navigation}>
                <button className={styles.navBtn} onClick={prevSlide}>
                  &lt;
                </button>
                <div className={styles.slideCounter}>
                  {currentSlide + 1} / {slides.length}
                </div>
                <button className={styles.navBtn} onClick={nextSlide}>
                  &gt;
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
} 