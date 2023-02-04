import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import s from "./Restaurant.module.css";
import {Header} from "../../components/Header/Header";
import {Table} from "../../components/Table/Table";
import {AppStateType} from "../../store/store";
import {getOrdersTC, OrdersType, resetSelectedOrders} from "../../store/orders-reducer";
import {Advertisement} from "../../components/SpecTitle/Advertisement";
import ph1 from '../../assets/img/test1.jpg';
import ph2 from '../../assets/img/test2.jpg';
import ph3 from '../../assets/img/test3.jpg';
import click from '../../assets/img/bell.png'
import {BottomPopUpWindow} from "../../components/BottomPopUpWindow/BottomPopUpWindow";
import {useNavigate, useParams} from "react-router-dom";
import {RestaurantType} from "../../store/app-reducer";



export const Restaurant = () => {
    localStorage.clear()
    const params: any = useParams()
    const dispatch = useDispatch<any>()
    const restaurant = useSelector<AppStateType,RestaurantType>(state => state.orders.selectedRestaurant)
    const orders = useSelector<AppStateType, OrdersType[]>(state => state.orders.orders)
    const idOfSelectedElement = useSelector<AppStateType, number>(state => state.orders.idOfSelectedElement)
    const loader = useSelector<AppStateType, boolean>(state => state.orders.loader)
    const selectedOrders = useSelector<AppStateType,OrdersType[]>(state => state.orders.selectedOrders)
    const navigate = useNavigate()
    const img = [
        {id: '1', img: ph1},
        {id: '2', img: ph2},
        {id: '3', img: ph3},
    ]
    const onConfirmHandler = () =>{
        localStorage.setItem('orders',JSON.stringify(selectedOrders.map(el=>el.id)))
        dispatch(resetSelectedOrders())
        navigate('orders')
    }

    useEffect(() => {
        dispatch(getOrdersTC(params.id))
    }, [])

    useEffect(() => {
        let interval: any;
        if (interval) {
            clearInterval(interval);
        }
        if (idOfSelectedElement) {
            interval = setInterval(() => {
                dispatch(getOrdersTC(params.id))
            }, 3000)
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    }, [idOfSelectedElement])

    return (
        <div className={s.wrapper}>
            <Header title={restaurant.title} img={restaurant.img} clickBtn={click}/>
            <Table orders={orders}
                   loader={loader}/>
            <Advertisement img={img}/>
            <BottomPopUpWindow isOpened={selectedOrders.length > 0}>
                <div>Выбрано заказов: {selectedOrders.length}</div>
                <button className={s.confirm} onClick={onConfirmHandler}>Подтвердить</button></BottomPopUpWindow>
        </div>
    );
};

