import {Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import {Restaurant} from "./pages/RestorauntComponent/Restaurant";
import {useDispatch, useSelector} from "react-redux";
import {getRestaurants, RestaurantType} from "./store/app-reducer";
import {AppStateType} from "./store/store";
import {resetSelectedOrders} from "./store/orders-reducer";
import {ReadyOrders} from "./pages/ReadyOrders";
import {RestaurantCard} from "./components/RestaurantCard/RestaurantCard";


export const App = () => {
    const restaurants = useSelector<AppStateType, RestaurantType[]>(state => state.app.restaurants);
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(resetSelectedOrders())
        dispatch(getRestaurants())
    }, [])


    return (
            <div className={'bg-amber-50 w-screen h-screen flex justify-center items-center overflow-hidden'}>
            <Routes>
                <Route path={'/'} element={<div>
                    {restaurants.map((r) => {
                        return <RestaurantCard key={r.id} id={r.id} img={r.img}/>
                    })}
                </div>}/>
                <Route path={'/restaurants/:id'} element={<Restaurant/>}/>
                <Route path={'/restaurants/:id/orders'} element={<ReadyOrders/>}/>
            </Routes>

        </div>
    )
}



