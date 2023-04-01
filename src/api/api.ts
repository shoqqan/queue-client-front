import axios from 'axios'
import {RestaurantType} from "../store/app-reducer";
import {OrdersType} from "../store/restaurant-reducer";

type ResponseOrdersType = {
    id: number
    img: string
    title: string
    url: string
    orders: OrdersType[]
}

// const baseURL = 'https://queue-back-development.up.railway.app/'

const instance = axios.create({
    baseURL: 'https://queue-back-development.up.railway.app/',
    headers: {
        "Content-Type": "application/json",
    }
})
export const restaurantsAPI = {
    getAll: () => instance.get<RestaurantType[]>('restaurants').then(res => res.data)
}

export const ordersAPI = {
    getAllOrders: (id: string, token: string) => {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return  instance.get<ResponseOrdersType>(`restaurants/${id}/orders`).then(res => res.data)
    }
}

export const authAPI = {
    register: () => {
        instance.defaults.headers.common['Authorization'] = ""
        return  instance.post('auth/token').then(res => res.data)
    },
    login: (token: string) => {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return instance.post('auth/token').then(res => res.data)
    }
}
