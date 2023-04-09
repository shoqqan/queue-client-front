import {Route, Routes} from "react-router-dom";
import React from "react";
import {Restaurant} from "./pages/RestorauntComponent/Restaurant";
import {OrdersRequestingPage} from "./pages/OrdersRequestingPage";
import {Landing} from "./pages/Landing/Landing";
import './i18n'


export const App = () => {
    return (
        <div className={'bg-amber-50 w-screen h-screen flex justify-center items-center overflow-y-auto'}>
            <Routes>
                <Route path={'/'} element={<Landing/>}/>
                <Route path={'/restaurants/:restaurantId'} element={<Restaurant/>}/>
                <Route path={'/restaurants/:restaurantId/orders/:orderIds'} element={<OrdersRequestingPage/>}/>
            </Routes>
        </div>
    )
}



