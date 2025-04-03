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

const speakerNotes = [
  "Welcome to SEVA - Serving with Selflessness. Begin by introducing the concept of selfless service. Ask the kids what selfless service means to them and how they can incorporate it in their daily lives. End with a call to learn and grow together as a community.",
  
  "For 'What is Seva?' slide: Explain the concept of Seva as selfless service. Share examples of different forms of Seva in various communities. Ask the kids if they've participated in Seva activities before. End by connecting Seva to personal growth and community welfare.",
  
  "For 'Last Week's Event' slide: Share details about the recent Seva event - when and where it happened. Discuss the purpose behind the event and key learnings. Ask kids to share their experiences if they attended. End with how these learnings can be applied to future service activities.",
  
  "For 'Kirat Karo, Naam Japo, Vand Chakko' slide: Explain these three principles - honest work, meditation/prayer, and sharing with others. Provide examples of how these principles can be applied in modern life. Ask kids how they currently practice these values. End by emphasizing the balance of all three principles.",
  
  "For 'Why Do Seva?' slide: Present the spiritual and community benefits of Seva. Share research or testimonials about how service impacts well-being. Ask kids to reflect on their motivations for service. End by connecting Seva to personal growth and collective harmony.",
  
  "For 'How Can We Do Seva?' slide: Explain the three paths - Tan (physical service), Mann (mental/emotional support), and Dhan (financial contribution). Provide specific opportunities available in your community. Ask kids which path resonates with them. End with concrete next steps and how to get involved immediately."
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

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

  const toggleNotes = () => {
    setShowNotes(prev => !prev);
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
                <button className={styles.notesBtn} onClick={toggleNotes}>
                  Speaker Notes
                </button>
              </div>

              {showNotes && (
                <div className={styles.notesContainer}>
                  <div className={styles.notesContent}>
                    {speakerNotes[currentSlide]}
                  </div>
                </div>
              )}

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