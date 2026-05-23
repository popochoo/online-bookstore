import { axiosWithAuth } from "../api/api.interceptors";
import { API_URL } from "../config/api.config";
import { IUser } from "../shared/types/user.interface";


class UserService {
    async getProfile() {
        const { data } = await axiosWithAuth<IUser>({
            url: API_URL.users('/profile'),
            method: 'GET'
        })

        return data
    }

    async toggleFavorite(bookId: string) {
        return axiosWithAuth<IUser>({
            url: API_URL.users(`/profile/favorites/${bookId}`),
            method: 'PATCH'
        })
    }
}

export const userService = new UserService()