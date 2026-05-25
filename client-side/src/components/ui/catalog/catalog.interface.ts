import { IBook } from "@/src/shared/types/book.interface"

export interface ICatalog {
    title: string
    description?: string
    linkTitle?: string
    link?: string
    books: IBook[]
}