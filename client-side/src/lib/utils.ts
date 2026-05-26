import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(price)
}

export function formateDate(createdAt: string): string {
	const date = new Date(createdAt)

	if (isNaN(date.getTime())) return 'Некорректная дата'

	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(date)
}

export function getReviewWordWithEnding(reviewCount: number) {
	const lastDigit = reviewCount % 10
	const lastTwoDigits = reviewCount % 100

	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
		return `${reviewCount} отзывов`
	}

	if (lastDigit === 1) {
		return `${reviewCount} отзыв`
	}

	if (lastDigit >= 2 && lastDigit <= 4) {
		return `${reviewCount} отзыва`
	}

	return `${reviewCount} отзывов`
}
