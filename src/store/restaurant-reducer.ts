
type ActionsType = ReturnType<typeof setRestaurant> | ReturnType<typeof setOrders> | ReturnType<typeof setIsReady>


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

export const restaurantOrdersInitState: RestaurantType = {
    orders: [
        {id: 1, is_ready: false, key: 'A-22', restaurant_id: 0, isSelected: false},
        {id: 2, is_ready: false, key: 'B-31', restaurant_id: 0, isSelected: false},
        {id: 3, is_ready: false, key: 'C-25', restaurant_id: 0, isSelected: false},
        {id: 4, is_ready: true, key: 'D-60', restaurant_id: 0, isSelected: false}

    ],
    title: "KFC",
    logo: "https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/2048px-KFC_logo.svg.png",
    id: 0,
    url: "",
    adds: ['https://10619-2.s.cdn12.com/m7/menu-KFC-Leszno-Galeria-Leszno.jpg','https://www.kfc.kz/admin/files/medium/medium_4781.jpg']
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
        case "SET_ORDERS": {
            return {
                ...state, orders: action.value
            }
        }
        case "SET_IS_READY":{
            return {
                ...state, orders: state.orders.map((el)=>(el.id===action.id?{...el,is_ready: !action.is_ready}:{...el}))
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
export const setOrders = (value: OrdersType[]) => ({
    type: "SET_ORDERS" as const,
    value
})
export const setIsReady = (id: number, is_ready: boolean) => (
    {
        type: "SET_IS_READY" as const, id, is_ready
    }
)
//THUNK CREATORS
// export const getRestaurantTC = (id: string) => async (dispatch: Dispatch, getState: () => AppStateType) => {
//     try {
//         dispatch(setIsLoading(true))
//         const accessToken = getState().app.accessToken
//         const restaurant = await restaurantsAPI.getRestaurant(id, accessToken)
//         dispatch(setRestaurant(restaurant))
//     } catch (e) {
//     } finally {
//         dispatch(setIsLoading(false))
//     }
// }

// export const getOrdersTC = (id: string) => async (dispatch: Dispatch, getState: () => AppStateType) => {
//     try {
//         const accessToken = getState().app.accessToken
//         const res = await ordersAPI.getOrders(id, accessToken)
//         dispatch(setOrders(res.orders))
//     } catch (e) {
//     } finally {
//     }
// }
