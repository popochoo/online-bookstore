import styles from './Header.module.scss'
import { HeaderMenu } from './headerMenu/HeaderMenu'
import { Logo } from './logo/Logo'
import { SearchInput } from './searchInput/SearchInput'

export function Header() {
	return (
		<div className={styles.header}>
			<Logo />
			<SearchInput />
			<HeaderMenu />
		</div>
	)
}
