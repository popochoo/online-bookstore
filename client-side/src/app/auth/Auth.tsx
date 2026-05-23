'use client'

import Image from 'next/image'
import { useState } from 'react'

import styles from './Auth.module.scss'
import { AuthFields } from './AuthFields'
import { Social } from './social/Social'
import { useAuthForm } from './useAuthForm'
import { Button } from '@/src/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/src/components/ui/card'

export function Auth() {
	const [isReg, setIsReg] = useState(false)

	const { onSubmit, form, isPending } = useAuthForm(isReg)

	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<h1>BookStore</h1>
				<Image
					src={'/images/logo.svg'}
					alt='Book Store Auth'
					width={400}
					height={400}
				/>
			</div>
			<div className={styles.right}>
				<Card className={styles.card}>
					<CardHeader className={styles.header}>
						<CardTitle>
							{isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}
						</CardTitle>
						<CardDescription>
							Войдите или создайте учетную запись, чтобы оформлять
							покупки!
						</CardDescription>
					</CardHeader>
					<CardContent className={styles.content}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<AuthFields
								form={form}
								isPending={isPending}
								isReg={isReg}
							/>

							<Button disabled={isPending}>Продолжить</Button>
						</form>
						<Social />
					</CardContent>
					<CardFooter className={styles.footer}>
						{isReg ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}
						<button onClick={() => setIsReg(!isReg)}>
							{isReg ? 'Войти' : 'Создать'}
						</button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
