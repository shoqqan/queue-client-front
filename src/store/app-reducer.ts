import {Dispatch} from "redux";
import {authAPI} from "../api/api";

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
    | ReturnType<typeof setIsLoading>


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
        case 'SET_IS_LOADING':{
            return {
                ...state,isLoading: action.value
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
    type: "SET_IS_LOADING" as const, value
})

//THUNK CREATORS
export const authMe = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(setIsLoading(true))
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
            finally {
            }
        } else {
            data = await authAPI.register();
        }
        dispatch(setAccessToken(data.access_token));
        localStorage.setItem('token', data.access_token);
    } catch (e) {

    }
    finally {
        dispatch(setIsLoading(false))
    }
}

