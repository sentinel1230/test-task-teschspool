export interface Review {
    id: number,
    rating: string,
    title: string,
    text: string
}

export async function getReviews(): Promise<Review[]> {
    const response = await fetch('/api/reviews')

    if (!response.ok) {
        throw new Error('Failed to fetch reviews')
    }

    return response.json()
}
