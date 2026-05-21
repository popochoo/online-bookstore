export interface ICategory {
    id: string
    createdAt: string
    name: string
    value: string
}

export type ICategoryInput = Pick<ICategory, 'name' | 'value'>

//export interface ICategoryInput extends Pick<ICategory, 'name' | 'value'> {}