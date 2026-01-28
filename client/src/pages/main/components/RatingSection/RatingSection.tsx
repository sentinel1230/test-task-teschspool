import styles from './RatingSection.module.css'

import featuredLeftMobile from '../../../../assets/featured-l.png'
import featuredLeftTablet from '../../../../assets/featured-l@2x.png'
import featuredLeftDesktop from '../../../../assets/featured-l@3x.png'

import featuredRightMobile from '../../../../assets/featured-r.png'
import featuredRightTablet from '../../../../assets/featured-r@2x.png'
import featuredRightDesktop from '../../../../assets/featured-r@3x.png'

import ratingMobile from '../../../../assets/rating.png'
import ratingTablet from '../../../../assets/rating@2x.png'
import ratingDesktop from '../../../../assets/rating@3x.png'

export function RatingSection() {
    return (
        <section className={styles.rating}>
            <div className={styles.left}>
                <p className={styles.text}>
                    More than 53k positive reviews<br />
                    and ratings in the App Store
                </p>
            </div>

            <div className={styles.center}>
                <picture>
                    <source media="(max-width: 768px)" srcSet={featuredLeftMobile} />
                    <source media="(max-width: 1024px)" srcSet={featuredLeftTablet} />
                    <img src={featuredLeftDesktop} alt="" className={styles.wreath} />
                </picture>

                <div className={styles.featured}>
                    <p className={styles.featuredTitle}>Featured App</p>
                    <p className={styles.featuredSubtitle}>in 100+ countries</p>
                </div>

                <picture>
                    <source media="(max-width: 768px)" srcSet={featuredRightMobile} />
                    <source media="(max-width: 1024px)" srcSet={featuredRightTablet} />
                    <img src={featuredRightDesktop} alt="" className={styles.wreath} />
                </picture>
            </div>

            <div className={styles.right}>
                <div className={styles.ratingBlock}>
                    <picture>
                        <source media="(max-width: 768px)" srcSet={ratingMobile} />
                        <source media="(max-width: 1024px)" srcSet={ratingTablet} />
                        <img src={ratingDesktop} alt="Rating visualization" className={styles.ratingImg} />
                    </picture>
                    <p className={styles.scoreTotal}>53k total ratings</p>
                </div>

                <div className={styles.scoreBlock}>
                    <span className={styles.scoreNumber}>4.9</span>
                    <p className={styles.scoreMax}>out of 5</p>
                </div>
            </div>
        </section>
    )
}