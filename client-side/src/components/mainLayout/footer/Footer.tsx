import styles from './Footer.module.scss'

export function Footer() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.footer}>
				bookstore.com &copy; 2026 Все права защищены
			</div>
		</div>
	)
}
