'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import styles from './Dashboard.module.scss'
import { IOrderColumn, orderColumns } from './OrderColums'
import { Button } from '@/src/components/ui/button'
import { DataTable } from '@/src/components/ui/dataTable/DataTable'
import { useProfile } from '@/src/hooks/useProfile'
import { formatPrice, formateDate } from '@/src/lib/utils'
import { saveTokenStorage } from '@/src/services/auth/auth-token.service'
import { authService } from '@/src/services/auth/auth.service'
import { EnumOrderStatus } from '@/src/shared/types/order.interface'

export function Dashboard() {
	const router = useRouter()

	const searchParams = useSearchParams()

	useEffect(() => {
		const accessToken = searchParams.get('accessToken')

		if (accessToken) {
			saveTokenStorage(accessToken)
		}
	}, [searchParams])

	const { user } = useProfile()

	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	if (!user) return null

	const formattedOrders: IOrderColumn[] = user.orders.map(order => ({
		createdAt: formateDate(order.createdAt),
		status:
			order.status === EnumOrderStatus.PENDING ? 'В ожидании' : 'Оплачен',
		total: formatPrice(order.total)
	}))

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<h1>Ваши заказы</h1>
				<Button variant={'ghost'} onClick={() => logout()}>
					Выйти из аккаунта
					<LogOut />
				</Button>
			</div>
			<DataTable columns={orderColumns} data={formattedOrders} />
		</div>
	)
}
