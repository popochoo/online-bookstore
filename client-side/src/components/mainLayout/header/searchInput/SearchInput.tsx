'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import styles from './SearchInput.module.scss'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { PUBLIC_URL } from '@/src/config/url.config'

export function SearchInput() {
	const [searchTerm, setSearchTerm] = useState<string>('')

	const router = useRouter()

	return (
		<div className={styles.form}>
			<Input
				placeholder='Поиск книг'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<Button
				variant={'default'}
				onClick={() =>
					router.push(
						PUBLIC_URL.explorer(`&searchTerm=${searchTerm}`)
					)
				}
			>
				<Search />
			</Button>
		</div>
	)
}
