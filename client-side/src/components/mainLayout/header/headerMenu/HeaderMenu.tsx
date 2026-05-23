'use client'

import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './HeaderMenu.module.scss'
import { HeaderCart } from './headerCart/HeaderCart'
import { Button } from '@/src/components/ui/button'
import { Spinner } from '@/src/components/ui/spinner'
import { DASHBOARD_URL, PUBLIC_URL } from '@/src/config/url.config'
import { useProfile } from '@/src/hooks/useProfile'

export function HeaderMenu() {
	const { user, isLoading } = useProfile()

	return (
		<div className={styles.header_menu}>
			<HeaderCart />
			<Link href={PUBLIC_URL.explorer()}>
				<Button variant={'ghost'}>Каталог</Button>
			</Link>
			{isLoading ? (
				<Spinner className='size-3' />
			) : user ? (
				<>
					<Link href={DASHBOARD_URL.favotires()}>
						<Button variant={'ghost'}>Избранное</Button>
					</Link>
					<Link href={DASHBOARD_URL.home()}>
						<Image
							src={user.picture}
							alt={user.name}
							width={42}
							height={42}
							className={styles.avatar}
						/>
					</Link>
				</>
			) : (
				<Link href={PUBLIC_URL.auth()}>
					<Button variant={'default'}>
						<LogOut className={styles.icon} />
						Войти
					</Button>
				</Link>
			)}
		</div>
	)
}
