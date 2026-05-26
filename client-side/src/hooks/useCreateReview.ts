import { useMutation, useQueryClient } from "@tanstack/react-query"
import { reviewService } from "../services/review.service"
import toast from "react-hot-toast"
import { useMemo } from "react"
import { IReviewInput } from "../shared/types/review.interface"

export const useCreateReview = (bookId: string) => {

    const queryClient = useQueryClient()

    const { mutate: createReview, isPending: isLoadingCreate } = useMutation({
        mutationKey: ['create review'],
        mutationFn: (data: IReviewInput) => reviewService.create(data, bookId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['book']
            })
            toast.success('Отзыв создан')
        },
        onError() {
            toast.error('Ошибка при создании отзыва')
        }
    })

    return useMemo(
        () => ({ createReview, isLoadingCreate }),
        [createReview, isLoadingCreate]
    )
}