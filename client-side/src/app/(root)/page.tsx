import type { Metadata } from 'next'
import { Home } from './Home'

export const metadata: Metadata = {
    title: 'BookStore — Купить книги онлайн: от бестселлеров до классики'
}

export default function HomePage() {
    return <Home />
}