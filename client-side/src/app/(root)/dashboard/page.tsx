import type { Metadata } from 'next'

import { Dashboard } from './Dashboard'
import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Личный кабинет',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return <Dashboard />
}
