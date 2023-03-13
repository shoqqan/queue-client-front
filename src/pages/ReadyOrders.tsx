import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {OrdersType} from "../store/orders-reducer";
import {Header} from "../components/Header/Header";
import click from "../assets/img/bell.png";
import {Table} from "../components/Table/Table";
import {Advertisement} from "../components/Advertisement/Advertisement";
import {RestaurantType} from "../store/app-reducer";

export const ReadyOrders = () => {
    const restaurant = useSelector<AppStateType,RestaurantType>(state => state.orders.selectedRestaurant)
    const orders = useSelector<AppStateType, OrdersType[]>(state => state.orders.orders)
    const selectedOrders = JSON.parse(localStorage.getItem('orders')!)
    let onGoingOrders = orders.filter(el=>selectedOrders.includes(el.id))
    onGoingOrders = onGoingOrders.filter(el=>!el.is_ready)
    const readyOrders = onGoingOrders.filter(el=>el.is_ready)
    return (
            <div className={'lg:w-96 h-full rounded-3xl bg-slate-100 flex flex-col gap-y-16 overflow-y-scroll justify-between relative box-border'}>
            <Header title={restaurant.title} img={restaurant.img} clickBtn={click}/>
            <Table orders={onGoingOrders} title={'Готовятся'} variant={'primary'} clickable={false}/>
            <Table orders={readyOrders} title={'Готово'} variant={'secondary'} clickable={false}/>
            <Advertisement/>
        </div>
    );
};

