import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {authMe} from "../../store/app-reducer";
import {AppStateType} from "../../store/store";
import {getOrdersTC, RestaurantType} from "../../store/restaurant-reducer";
import {Header} from "../../components/Header/Header";
import {Table} from "../../components/Table/Table";
import {Advertisement} from "../../components/Advertisement/Advertisement";


export const Restaurant = () => {
    const {id} = useParams()
    const dispatch = useDispatch<any>()
    const accessToken = useSelector<AppStateType, string>((state) => state.app.accessToken)
    const {title, img, orders} = useSelector<AppStateType, RestaurantType>((state: AppStateType) => state.restaurant)

    useEffect(() => {
        dispatch(authMe())
    }, [])

    useEffect(() => {
        if (accessToken && id) {
            dispatch(getOrdersTC(id))
        }
    }, [accessToken])
    const gettingReadyOrders = orders.filter(order => !order.is_ready)

    const onItemClicked = (id: number) => {
        console.log(id)
    }
    return (
        <div
            className={'h-full rounded-3xl flex flex-col justify-between gap-4 relative overflow-hidden'}>
            <Header title={title} img={img}/>
            <Table
                orders={gettingReadyOrders}
                title={'Выберите свой заказ'}
                variant={'primary'}
                onItemClicked={onItemClicked}
            />
            <Advertisement/>
            <div className="h-[30px]"/>
        </div>
    );
};

