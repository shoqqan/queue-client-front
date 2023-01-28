import s from './App.module.css'
import {Link, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import {Restaurant} from "./pages/RestorauntComponent/Restaurant";
import {useDispatch, useSelector} from "react-redux";
import {getRestaurants, RestaurantType} from "./store/app-reducer";
import {AppStateType} from "./store/store";
import RestaurantCard from "./components/RestaurantCard/RestaurantCard";


export const App = () => {
    const restaurants = useSelector<AppStateType, RestaurantType[]>(state => state.app.restaurants);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(getRestaurants())
    }, [])

    return (
        <div className={s.app}>
            <Routes>
                <Route path={'/'} element={<div>
                    {restaurants.map((r) => {
                        return <RestaurantCard key={r.id} id={r.id} img={r.img}/>
                    })}
                </div>}/>


                <Route path={'/restaurants/:id'} element={<Restaurant/>}/>
            </Routes>
        </div>
    )
}



