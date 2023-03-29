import {Dispatch} from "redux";
import {authAPI, restaurantsAPI} from "../api/api";

//TYPES
export type RestaurantType = {
    id: number,
    title: string,
    img: string,
    url: string
}
type ActionsType =
    | ReturnType<typeof setRestaurants>
    | ReturnType<typeof setAccessToken>

type InitStateType = typeof initState;

const initState = {
    accessToken: '',
    isLoading: false,
}
//LOGIC
export const appReducer = (state: InitStateType = initState, action: ActionsType) => {
    switch (action.type) {
        case 'SET_RESTAURANTS': {
            return {
                ...state,
                restaurants: action.restaurants
            }
        }
        case 'SET_ACCESS_TOKEN': {
            return {
                ...state,
                accessToken: action.accessToken
            }
        }
        default: {
            return state
        }
    }
}

//ACTION CREATORS
export const setAccessToken = (accessToken: string) => ({
    type: "SET_ACCESS_TOKEN" as const, accessToken
})
export const setRestaurants = (restaurants: RestaurantType[]) => ({
    type: "SET_RESTAURANTS" as const, restaurants
})

export const setIsLoading = (value: boolean) => ({
    type: "SET_RESTAURANTS" as const, value
})

//THUNK CREATORS
export const getRestaurants = () => async (dispatch: Dispatch) => {
    // dispatch(setIsLoading(true));
    const restaurants = await restaurantsAPI.getAll();
    dispatch(setRestaurants(restaurants))
    // dispatch(setIsLoading(false));
}

export const authMe = () => async (dispatch: Dispatch<any>) => {
    try {
        const token = localStorage.getItem('token');
        let data;
        if (token) {
            try {
                data = await authAPI.login(token);
            } catch (e) {
                localStorage.removeItem('token');
                dispatch(setAccessToken(''));
                data = await authAPI.register();
            }
        } else {
            data = await authAPI.register();
        }
        dispatch(setAccessToken(data.access_token));
        localStorage.setItem('token', data.access_token);
    } catch (e) {

    }
}