import { axiosWithAuth } from "../api/api.interceptors";
import { API_URL } from "../config/api.config";
import { IReview, IReviewInput } from "../shared/types/review.interface";

class ReviewService {
    async getByBookId(id: string) {
        const { data } = await axiosWithAuth<IReview[]>({
            url: API_URL.reviews(`/by-bookId/${id}`),
            method: 'GET'
        })

        return data
    }

    async create(data: IReviewInput, bookId: string) {
        const { data: createdReview } = await axiosWithAuth<IReview>({
            url: API_URL.reviews(`${bookId}`),
            method: 'POST',
            data
        })

        return createdReview
    }

    async delete(id: string) {
        const { data } = await axiosWithAuth<IReview>({
            url: API_URL.reviews(`${id}`),
            method: 'DELETE'
        })

        return data
    }
}

export const reviewService = new ReviewService()