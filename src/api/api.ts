import axios from 'axios'
import {RestaurantType} from "../store/app-reducer";
import {OrdersType} from "../store/restaurant-reducer";

type ResponseRestaurantType = {
    id: number
    logo: string
    title: string
    url: string
    orders: OrdersType[]
    adds: string[]
}

type ResponseOrdersType = {
    orders:OrdersType[]
}

const baseURL = 'https://queue-back-development.up.railway.app/api/'
const prod = 'https://queue.up.railway.app'

const instance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    }
})
export const restaurantsAPI = {
    getAll: () => instance.get<RestaurantType[]>('restaurants').then(res => res.data),
    getRestaurant: (id: string, token: string) => {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return  instance.get<ResponseRestaurantType>(`restaurants/${id}`).then(res => res.data)
    }
}

export const ordersAPI = {
    getOrders: (id:string,token:string) =>{
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
