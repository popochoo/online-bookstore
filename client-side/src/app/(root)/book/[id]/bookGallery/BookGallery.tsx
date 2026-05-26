import Image from 'next/image'
import { useState } from 'react'

import styles from './BookGallery.module.scss'
import { cn } from '@/src/lib/utils'
import { IBook } from '@/src/shared/types/book.interface'

interface BookGalleryProps {
	book: IBook
}

export function BookGallery({ book }: BookGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)

	return (
		<div>
			<Image
				src={book.images[currentIndex]}
				alt={book.title}
				width={250}
				height={250}
				className={styles.image}
			/>
			<div className={styles.gallery}>
				{book.images.map((image, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={cn(
							styles.item,
							index === currentIndex
								? 'border-black'
								: 'border-transparent'
						)}
					>
						<Image
							src={image}
							alt={book.title}
							width={100}
							height={100}
						/>
					</button>
				))}
			</div>
		</div>
	)
}
