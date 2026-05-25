export interface ICategory {
	id: string
	createdAt: string
	title: string
	description: string
}

export type ICategoryInput = Pick<ICategory, 'title' | 'description'>

//export interface ICategoryInput extends Pick<ICategory, 'name' | 'value'> {}
// 7:19:23
