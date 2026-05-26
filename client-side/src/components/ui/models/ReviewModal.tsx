import { PropsWithChildren, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
// 1. Добавлен импорт Controller
import { Rating } from 'react-simple-star-rating'

import { Button } from '@/src/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/src/components/ui/dialog'
import { Field, FieldGroup } from '@/src/components/ui/field'
import { Label } from '@/src/components/ui/label'
import { Textarea } from '@/src/components/ui/textarea'
import { useCreateReview } from '@/src/hooks/useCreateReview'
import { IReviewInput } from '@/src/shared/types/review.interface'

interface ReviewModalProps {
	bookId: string
}

export function ReviewModal({
	children,
	bookId
}: PropsWithChildren<ReviewModalProps>) {
	const [isOpen, setIsOpen] = useState(false)

	const {
		register,
		handleSubmit,
		control, // 2. Заменили watch и setValue на control
		reset,
		formState: { errors }
	} = useForm<IReviewInput>({
		mode: 'onChange',
		defaultValues: {
			rating: 0,
			text: ''
		}
	})

	const { createReview, isLoadingCreate } = useCreateReview(bookId)

	const onSubmit: SubmitHandler<IReviewInput> = data => {
		createReview(data, {
			onSuccess: () => {
				reset()
				setIsOpen(false)
			}
		})
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader>
						<DialogTitle>Создание отзыва</DialogTitle>
						<DialogDescription>
							Для создания отзыва необходимо указать рейтинг и
							текст.
						</DialogDescription>
					</DialogHeader>

					<FieldGroup className='my-4'>
						<Field>
							<Label>Ваша оценка</Label>
							<div className='pt-1'>
								{/* 3. Полностью заменили скрытый инпут на контролируемый контроллер */}
								<Controller
									control={control}
									name='rating'
									rules={{
										required: 'Рейтинг обязателен',
										min: {
											value: 1,
											message:
												'Пожалуйста, поставьте оценку'
										}
									}}
									render={({ field }) => (
										<Rating
											onClick={field.onChange} // Передает число напрямую в форму
											initialValue={field.value}
											SVGstyle={{
												display: 'inline-block'
											}}
											size={24}
											transition
										/>
									)}
								/>
							</div>
							{errors.rating && (
								<span className='text-xs text-rose-500 block mt-1'>
									{errors.rating.message}
								</span>
							)}
						</Field>

						<Field>
							<Label htmlFor='review-text'>Текст отзыва</Label>
							<Textarea
								id='review-text'
								placeholder='Напишите, что вы думаете об этой книге...'
								{...register('text', {
									required: 'Текст отзыва обязателен',
									minLength: {
										value: 10,
										message: 'Минимум 10 символов'
									}
								})}
							/>
							{errors.text && (
								<span className='text-xs text-rose-500 block mt-1'>
									{errors.text.message}
								</span>
							)}
						</Field>
					</FieldGroup>

					<DialogFooter>
						<DialogClose asChild>
							<Button type='button' variant='outline'>
								Отмена
							</Button>
						</DialogClose>
						<Button type='submit' disabled={isLoadingCreate}>
							{isLoadingCreate ? 'Создание...' : 'Оставить отзыв'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
