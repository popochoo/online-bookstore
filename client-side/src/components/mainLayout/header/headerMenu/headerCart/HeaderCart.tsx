import { Button } from '@/src/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger
} from '@/src/components/ui/sheet'

export function HeaderCart() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={'ghost'}>Корзина</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader title='Корзина товаров' className='text-xl'>
					Корзина товаров
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}
