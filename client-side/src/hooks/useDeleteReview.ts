import { useMutation, useQueryClient } from "@tanstack/react-query"
import { reviewService } from "../services/review.service"
import toast from "react-hot-toast"
import { useMemo } from "react"

export const useDeleteReview = () => {
    const queryClient = useQueryClient()

    const { mutate: deleteReview, isPending: isLoadingDelete } = useMutation({
        mutationKey: ['delete review'],
        mutationFn: (reviewId: string) => reviewService.delete(reviewId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['book']
            })
            toast.success('Отзыв удален')
        },
        onError() {
            toast.error('Ошибка при удалении отзыва')
        }
    })

    return useMemo(
        () => ({ deleteReview, isLoadingDelete }),
        [deleteReview, isLoadingDelete]
    )
}