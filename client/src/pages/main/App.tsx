import { ReviewSlider } from './components/ReviewSlider/ReviewSlider'
import { RatingSection } from './components/RatingSection/RatingSection'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.handler}>
      <div className={styles.container}>
        <h1 className={styles.title}>Ratings & Reviews</h1>
        <RatingSection />
        <ReviewSlider />
      </div>
    </div>
  )
}

export default App