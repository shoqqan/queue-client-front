import {Dispatch} from "redux";
import {ordersAPI} from "../api/api";
import {AppStateType} from "./store";
import {setIsLoading} from "./app-reducer";

type ActionsType = ReturnType<typeof setRestaurant>

export type RestaurantsInitStateType = typeof restaurantOrdersInitState
export type OrdersType = {
    id: number
    is_ready: boolean
    key: string
    restaurant_id: number
    isSelected: boolean
}

export type RestaurantType = {
    id: number
    title: string
    logo: string
    url: string
    orders: OrdersType[]
    adds: string[]
}

export const restaurantOrdersInitState = {
    orders: [] as OrdersType[],
    title: "",
    logo: "",
    id: 0,
    url: "",
    adds: [] as string[]
}

//REDUCER LOGIC
export const restaurantReducer = (state: RestaurantType = restaurantOrdersInitState, action: ActionsType): RestaurantsInitStateType => {
    switch (action.type) {
        case "SET_RESTAURANT_DETAILS": {
            return {
                ...state,
                ...action.value
            }
        }
        default:
            return state
    }
}

//ACTION CREATORS
export const setRestaurant = (value: RestaurantType) => ({
    type: "SET_RESTAURANT_DETAILS" as const,
    value
})

//THUNK CREATORS
export const getOrdersTC = (id: string,isLoadingNeeded:boolean=false) => async (dispatch: Dispatch, getState: () => AppStateType) => {
    try {
        if(isLoadingNeeded){
            dispatch(setIsLoading(true))
        }
        const accessToken = getState().app.accessToken
        const restaurant = await ordersAPI.getAllOrders(id, accessToken)
        dispatch(setRestaurant(restaurant))
    } catch (e) {
    }
    finally {
        if(isLoadingNeeded){
            dispatch(setIsLoading(false))
        }
    }
}