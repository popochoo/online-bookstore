'use client'

import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'

import styles from './Social.module.scss'
import { Button } from '@/src/components/ui/button'
import { SERVER_URL } from '@/src/config/api.config'

export function Social() {
	const router = useRouter()

	return (
		<div className={styles.social}>
			<Button
				variant={'outline'}
				onClick={() => router.push(`${SERVER_URL}/auth/google`)}
			>
				<FcGoogle />
				Продолжить через Google
			</Button>
		</div>
	)
}
