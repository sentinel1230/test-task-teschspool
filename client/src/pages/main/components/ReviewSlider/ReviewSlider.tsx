import { useEffect, useRef, useState } from 'react'
import { useReviews } from '../../hooks/useReviews'
import { ReviewCard } from '../ReviewCard/ReviewCard'
import styles from './ReviewSlider.module.css'

const GAP = 24
const AUTO_DELAY = 3000
const TRANSITION = 'transform 0.3s ease'
const SWIPE_THRESHOLD = 50

export function ReviewSlider() {
  const { reviews } = useReviews()
  const count = reviews.length

  const slides = count ? [reviews.at(-1)!, ...reviews, reviews[0]!] : []

  const [index, setIndex] = useState(1)
  const [transition, setTransition] = useState(true)
  const [cardWidth, setCardWidth] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const sliderRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<number | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const goNext = () => setIndex(i => i + 1)
  const goPrev = () => setIndex(i => i - 1)

  useEffect(() => {
    const updateCardWidth = () => {
      if (!sliderRef.current) return
      const card = sliderRef.current.children[0] as HTMLElement | undefined
      if (!card) return

      const computedGap = parseFloat(getComputedStyle(sliderRef.current).gap) || GAP
      setCardWidth(card.offsetWidth + computedGap)
    }

    updateCardWidth()
    window.addEventListener('resize', updateCardWidth)

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setTimeout(updateCardWidth, 100)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('resize', updateCardWidth)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [count])

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = window.setInterval(goNext, AUTO_DELAY)

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused])

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const onTransitionEnd = () => {
      if (index === slides.length - 1) {
        setTransition(false)
        setTimeout(() => {
          setIndex(1)
          setTimeout(() => setTransition(true), 50)
        }, 50)
      }

      if (index === 0) {
        setTransition(false)
        setTimeout(() => {
          setIndex(slides.length - 2)
          setTimeout(() => setTransition(true), 50)
        }, 50)
      }
    }

    slider.addEventListener('transitionend', onTransitionEnd)
    return () => slider.removeEventListener('transitionend', onTransitionEnd)
  }, [index, slides.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setIsPaused(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        goNext()
      } else {
        goPrev()
      }
    }

    setTimeout(() => setIsPaused(false), 100)
  }

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  if (!count) return null

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={styles.left} onClick={goPrev} aria-label="Previous slide">
        <span className={styles.btnIcon} />
      </button>

      <div
        className={styles.viewport}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={sliderRef}
          className={styles.slider}
          style={{
            transform: `translateX(-${index * cardWidth}px)`,
            transition: transition ? TRANSITION : 'none',
          }}
        >
          {slides.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>

      <button className={styles.right} onClick={goNext} aria-label="Next slide">
        <span className={styles.btnIcon} />
      </button>
    </div>
  )
}