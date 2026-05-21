import { axiosClassic, axiosWithAuth } from "../api/api.interceptors";
import { API_URL } from "../config/api.config";
import { IBook, IBookInput } from "../shared/types/book.interface";

class BookService {
    async getAll(searchTerm?: string | null) {
        const { data } = await axiosClassic<IBook[]>({
            url: API_URL.books(),
            method: 'GET',
            params: searchTerm
                ? {
                    searchTerm
                }
                : {}
        })

        return data || []
    }

    async getById(id: string) {
        const { data } = await axiosClassic<IBook>({
            url: API_URL.books(`/by-id/${id}`),
            method: 'GET',
        })

        return data
    }

    async getByCategory(categoryId: string) {
        const { data } = await axiosClassic<IBook[]>({
            url: API_URL.books(`/by-category/${categoryId}`),
            method: 'GET',
        })

        return data
    }

    async getMostPopular() {
        const { data } = await axiosClassic<IBook[]>({
            url: API_URL.books('/most-popular'),
            method: 'GET',
        })

        return data
    }

    async getSimilar(id: string) {
        const { data } = await axiosClassic<IBook[]>({
            url: API_URL.books(`/similar/${id}`),
            method: 'GET',
        })

        return data
    }

    async create(data: IBookInput) {
        const { data: createdBook } = await axiosWithAuth<IBook[]>({
            url: API_URL.books(),
            method: 'POST',
            data
        })

        return createdBook
    }

    async update(id: string, data: IBookInput) {
        const { data: updatedBook } = await axiosWithAuth<IBook>({
            url: API_URL.books(`/${id}`),
            method: 'PUT',
            data
        })

        return updatedBook
    }

    async delet(id: string) {
        const { data: deletedBook } = await axiosWithAuth<IBook>({
            url: API_URL.books(`/${id}`),
            method: 'DELETE',
        })

        return deletedBook
    }
}

export const bookService = new BookService()