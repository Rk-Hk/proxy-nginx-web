import { useState, useEffect, useCallback } from 'react';
import { birds, type Bird } from '../data/birds';

const TRANSITION_MS = 600;

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const activeBird: Bird = birds[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setActiveIndex(index);
        setTransitioning(false);
      }, TRANSITION_MS / 2);
    },
    [transitioning]
  );

  const prev = () =>
    goTo((activeIndex - 1 + birds.length) % birds.length);

  const next = () => goTo((activeIndex + 1) % birds.length);

  // keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeIndex, transitioning]);

  const thumbnails = birds.filter((_, i) => i !== activeIndex);

  return (
    <div className="carousel-root" style={{ '--accent': activeBird.accentColor } as React.CSSProperties}>
      {/* Background layer */}
      <div
        className={`carousel-bg ${transitioning ? 'fade-out' : 'fade-in'}`}
        style={{ backgroundImage: `url(${activeBird.image})` }}
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="carousel-overlay" />

      {/* Main layout */}
      <div className="carousel-content">
        {/* Left: info */}
        <div className={`carousel-info ${transitioning ? 'slide-out' : 'slide-in'}`}>
          <span className="bird-label">Featured Bird</span>
          <h1 className="bird-name">{activeBird.name}</h1>
          <p className="bird-description">{activeBird.description}</p>
          <button className="see-more-btn">
            See More
            <span className="btn-arrow">→</span>
          </button>
        </div>

        {/* Right: thumbnails */}
        <div className="thumbnail-panel">
          {thumbnails.map((bird, i) => (
            <button
              key={bird.id}
              className={`thumbnail-card ${transitioning ? 'thumb-fade-out' : 'thumb-fade-in'}`}
              style={{ animationDelay: `${i * 80}ms` }}
              onClick={() => goTo(birds.indexOf(bird))}
              aria-label={`View ${bird.name}`}
            >
              <img src={bird.image} alt={bird.name} className="thumbnail-img" />
              <div className="thumbnail-label">{bird.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="carousel-nav">
        <button className="nav-btn" onClick={prev} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="nav-dots">
          {birds.map((_, i) => (
            <button
              key={i}
              className={`nav-dot ${i === activeIndex ? 'dot-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button className="nav-btn" onClick={next} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
