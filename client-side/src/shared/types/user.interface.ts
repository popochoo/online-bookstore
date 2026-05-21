import { IBook } from './book.interface'
import { IOrder } from './order.interface'

export interface IUser {
	id: string
	name: string
	email: string
	picture: string
	favotires: IBook[]
	orders: IOrder[]
}
