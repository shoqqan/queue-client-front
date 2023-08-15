import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {Table, TableSkeleton} from "../components/Table/Table";
import {RestaurantType, setIsReady} from "../store/restaurant-reducer";
import {Header} from "../components/Header/Header";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ReactSlider} from "../components/Advertisement/ReactSlider";
import {setIsLoading} from "../store/app-reducer";

export const OrdersRequestingPage = () => {
    const {orderIds} = useParams();
    const dispatch = useDispatch<any>()
    const navigate = useNavigate();
    const {title, logo, orders, adds} = useSelector<AppStateType, RestaurantType>(state => state.restaurant)
    const isLoading = useSelector<AppStateType, boolean>((state) => state.app.isLoading)
    const selectedOrders = orderIds?.split(',').map(id => +id)
    const onGoingOrders = orders.filter(order => !order.is_ready && selectedOrders?.includes(order.id))
    const readyOrders = orders.filter(order => order.is_ready && selectedOrders?.includes(order.id))
    const {t} = useTranslation()
    console.log(orders)

    useEffect(() => {
        setTimeout(() => {
            dispatch(setIsReady(onGoingOrders[0].id, onGoingOrders[0].is_ready))
        }, 5000)
    }, [])

    useEffect(() => {
        if (orders.length && (onGoingOrders.length === 0 && readyOrders.length === 0)) {
            navigate('/')
        }
    }, [orders])
    useEffect(() => {
        dispatch(setIsLoading(true))
        setTimeout(() => {
            dispatch(setIsLoading(false))
        }, 1000)
    }, [])

    return (
        <div
            className={'w-mobile flex flex-col gap-4'}>
            <div className={readyOrders.length>0 && onGoingOrders.length>0?'h-[400px]':'h-[100px]'}/>
            <Header title={title} img={logo}/>
            <button className={"rounded-lg bg-gray-200 text-black disabled:opacity-40 min-w-[50px] px-3 py-1"}
                    onClick={() => {
                        navigate(`/restaurant`)
                    }
                    }>{t('ORDERS_REQUESTING.GO_BACK')}
            </button>
                {onGoingOrders.length > 0 &&
                    <Table orders={onGoingOrders} title={t('ORDERS_PAGE.NOT_READY')} variant={'primary'}/>}
                {readyOrders.length > 0 &&
                    <Table orders={readyOrders} title={t('ORDERS_PAGE.READY')} variant={'secondary'}/>}
            {(isLoading && orders.length === 0) && <TableSkeleton/>}

            <ReactSlider img={adds} isLoading={isLoading}/>
            <div className="h-[30px]"/>

        </div>
    );
};

