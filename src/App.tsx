import {Route, Routes} from "react-router-dom";
import React from "react";
import {Restaurant} from "./pages/RestorauntComponent/Restaurant";
import {ReadyOrders} from "./pages/ReadyOrders";
import {Landing} from "./pages/Landing/Landing";


export const App = () => {
    return (
            <div className={'bg-amber-50 w-screen h-screen flex justify-center items-center overflow-hidden'}>
            <Routes>
                <Route path={'/'} element={<Landing/>}/>
                <Route path={'/restaurants/:id'} element={<Restaurant/>}/>
                <Route path={'/restaurants/:id/orders'} element={<ReadyOrders/>}/>
            </Routes>
        </div>
    )
}



