'use client'

import { Catalog } from '@/src/components/ui/catalog/Catalog'
import { useProfile } from '@/src/hooks/useProfile'

export function Favorites() {
	const { user } = useProfile()

	if (!user) return null

	return (
		<div className='my-6'>
			<Catalog title='Избранное' books={user.favotires} />
		</div>
	)
}
