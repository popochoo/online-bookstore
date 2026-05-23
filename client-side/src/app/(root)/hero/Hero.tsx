import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import styles from './Hero.module.scss'
import { Button } from '@/src/components/ui/button'
import { PUBLIC_URL } from '@/src/config/url.config'
import { SITE_DESCRIPTION } from '@/src/constants/seo.constants'

export function Hero() {
	return (
		<div className={styles.section}>
			<h1 className={styles.heading}>
				Наши книги, ваше удовольствие - <br />
				<span>все в одном месте</span>
			</h1>
			<p className={styles.description}>{SITE_DESCRIPTION}</p>
			<Link href={PUBLIC_URL.explorer()}>
				<Button variant={'default'}>
					За книгами <ArrowRight />
				</Button>
			</Link>
		</div>
	)
}
