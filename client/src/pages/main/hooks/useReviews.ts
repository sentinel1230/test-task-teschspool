import { useEffect, useState } from 'react'
import { getReviews, type Review } from '../reviewAPI'

export function useReviews() {
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getReviews()
            .then(setReviews)
            .catch(() => setError('Failed to load reviews'))
            .finally(() => setLoading(false))
    }, [])

    return { reviews, loading, error }
}
