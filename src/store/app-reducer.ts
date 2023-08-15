

//TYPES
export type RestaurantType = {
    id: number,
    title: string,
    img: string,
    url: string
}

type initStateType = {
    isLoading:boolean,
    restaurants: RestaurantType[]
}
type ActionsType =
    | ReturnType<typeof setRestaurants>
    | ReturnType<typeof setIsLoading>



const initState:initStateType = {
    isLoading: true,
    restaurants: [{id:1, title: 'KFC', img:'',url:''}]
}
//LOGIC
export const appReducer = (state: initStateType = initState, action: ActionsType) => {
    switch (action.type) {
        case 'SET_RESTAURANTS': {
            return {
                ...state,
                restaurants: action.restaurants
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

export const setRestaurants = (restaurants: RestaurantType[]) => ({
    type: "SET_RESTAURANTS" as const, restaurants
})

export const setIsLoading = (value: boolean) => ({
    type: "SET_IS_LOADING" as const, value
})

// //THUNK CREATORS
// export const authMe = () => async (dispatch: Dispatch<any>) => {
//     try {
//         dispatch(setIsLoading(true))
//         const token = localStorage.getItem('token');
//         let data;
//         if (token) {
//             try {
//                 data = await authAPI.login(token);
//             } catch (e) {
//                 localStorage.removeItem('token');
//                 dispatch(setAccessToken(''));
//                 data = await authAPI.register();
//             }
//             finally {
//             }
//         } else {
//             data = await authAPI.register();
//         }
//         dispatch(setAccessToken(data.access_token));
//         localStorage.setItem('token', data.access_token);
//     } catch (e) {
//
//     }
//     finally {
//         dispatch(setIsLoading(false))
//     }
// }
//
