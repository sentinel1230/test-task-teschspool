import styles from './ReviewCard.module.css'
import type { Review } from '../../reviewAPI'

import starsDesktop from '../../../../assets/stars@3x.png'
import starsTablet from '../../../../assets/stars@2x.png'
import starsMobile from '../../../../assets/stars.png'

interface Props {
  readonly review: Review
}

export function ReviewCard({ review }: Readonly<Props>) {
  const { title, text, rating } = review

  const numericRating = Number(rating)

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        <picture className={styles.stars}>
          <source media="(max-width: 768px)" srcSet={starsMobile} />
          <source media="(max-width: 1024px)" srcSet={starsTablet} />
          <img 
            src={starsDesktop} 
            alt={`Rating: ${numericRating} out of 5`}
            className={styles.starsImg}
          />
        </picture>
      </header>

      <p className={styles.text}>{text}</p>
    </article>
  )
}