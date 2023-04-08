import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {Table} from "../components/Table/Table";
import {Advertisement} from "../components/Advertisement/Advertisement";
import {getOrdersTC, getRestaurantTC, RestaurantType} from "../store/restaurant-reducer";
import {Header} from "../components/Header/Header";
import {authMe} from "../store/app-reducer";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const OrdersRequestingPage = () => {
    const {restaurantId, orderIds} = useParams();
    const dispatch = useDispatch<any>()
    const navigate = useNavigate();
    const {title, logo, orders, adds} = useSelector<AppStateType, RestaurantType>(state => state.restaurant)
    const selectedOrders = orderIds?.split(',').map(id => +id)
    const accessToken = useSelector<AppStateType, string>(state => state.app.accessToken)
    const onGoingOrders = orders.filter(order => !order.is_ready && selectedOrders?.includes(order.id))
    const readyOrders = orders.filter(order => order.is_ready && selectedOrders?.includes(order.id))
    const {t} = useTranslation()
    useEffect(() => {
        if (
            Number.isNaN(Number(restaurantId))
            || !Array.isArray(selectedOrders)
            || selectedOrders.some(Number.isNaN)
        ) {
            navigate('/')
        } else {
            dispatch(authMe())
        }
    }, [])

    let intervalId = 0;
    useEffect(() => {
        if (accessToken && restaurantId) {
            dispatch(getRestaurantTC(restaurantId))

            intervalId = setInterval(() => {
                dispatch(getOrdersTC(restaurantId))
            }, 3000)
        }
        return () => {
            clearInterval(intervalId)
        }
    }, [accessToken])

    useEffect(() => {
        if (orders.length && (onGoingOrders.length === 0 && readyOrders.length === 0)) {
            navigate('/')
        }
    }, [orders])

    return (
        <div
            className={'h-full flex flex-col gap-4 overflow-y-auto justify-between box-border'}>
            <Header title={title} img={logo}/>
            {onGoingOrders.length > 0 && <Table orders={onGoingOrders} title={t('ORDERS_PAGE.NOT_READY')} variant={'primary'}/>}
            {readyOrders.length > 0 && <Table orders={readyOrders} title={t('ORDERS_PAGE.READY')} variant={'secondary'}/>}
            <Advertisement adds={adds}/>
            <div className="h-[30px]"/>
        </div>
    );
};

