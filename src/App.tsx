import {Route, Routes} from "react-router-dom";
import React from "react";
import {Restaurant} from "./pages/RestorauntComponent/Restaurant";
import {Landing} from "./pages/Landing/Landing";
import './i18n'
import {OrdersRequestingPage} from "./pages/OrdersRequestingPage";


export const App = () => {
    return (
            <div className={'bg-amber-50 w-screen h-screen flex justify-center items-center overflow-y-auto'}>
            <Routes>
                <Route path={'/'} element={<Landing/>}/>
                <Route path={'/restaurant'} element={<Restaurant/>}/>
                <Route path={'/restaurant/request/:orderIds'} element={<OrdersRequestingPage/>}/>
            </Routes>
        </div>
    )
}



