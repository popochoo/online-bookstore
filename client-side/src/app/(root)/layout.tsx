import { PropsWithChildren } from 'react'

import { MainLayout } from '@/src/components/mainLayout/MainLayout'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <MainLayout>{children}</MainLayout>
}
