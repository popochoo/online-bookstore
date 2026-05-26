import { Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'

import styles from './BookReviews.module.scss'
import { Button } from '@/src/components/ui/button'
import { ConfirmModal } from '@/src/components/ui/models/ConfirmModal'
import { ReviewModal } from '@/src/components/ui/models/ReviewModal'
import { useDeleteReview } from '@/src/hooks/useDeleteReview'
import { useProfile } from '@/src/hooks/useProfile'
import { IBook } from '@/src/shared/types/book.interface'

interface BookReviewsProps {
	book: IBook
}

export function BookReviews({ book }: BookReviewsProps) {
	const { user } = useProfile()

	const { deleteReview } = useDeleteReview()

	return (
		<>
			<div className={styles.header}>
				<h1>Отзывы</h1>
				{user && (
					<ReviewModal bookId={book.id}>
						<Button variant={'ghost'}>
							<Plus />
							Добавить отзыв
						</Button>
					</ReviewModal>
				)}
			</div>
			<div className={styles.reviews}>
				{book.reviews.length ? (
					book.reviews.map(review => (
						<div className={styles.review} key={review.id}>
							<div className={styles.header}>
								<div className={styles.user}>
									<Image
										src={review.user.picture}
										alt={review.user.name}
										width={40}
										height={40}
									/>
									{review.user.name}
								</div>
								{review.user.id === user?.id && (
									<ConfirmModal
										handleClick={() =>
											deleteReview(review.id)
										}
									>
										<button className={styles.delete}>
											<Trash />
										</button>
									</ConfirmModal>
								)}
							</div>
							<Rating
								readonly
								initialValue={review.rating}
								SVGstyle={{
									display: 'inline-block'
								}}
								size={18}
								allowFraction
								transition
							/>
							<div className={styles.text}>{review.text}</div>
						</div>
					))
				) : (
					<div className={styles.not_found}>
						У этого товара нету отзывов
					</div>
				)}
			</div>
		</>
	)
}
