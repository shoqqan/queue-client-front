import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Header} from "../../components/Header/Header";
import {AppStateType} from "../../store/store";
import {getOrdersTC, OrdersType, resetSelectedOrders} from "../../store/orders-reducer";
import {Advertisement} from "../../components/Advertisement/Advertisement";
import click from '../../assets/img/bell.png'
import {BottomPopUpWindow} from "../../components/BottomPopUpWindow/BottomPopUpWindow";
import {useNavigate, useParams} from "react-router-dom";
import {RestaurantType} from "../../store/app-reducer";
import ReactDOM from "react-dom";
import {Table} from "../../components/Table/Table";



export const Restaurant = () => {
    localStorage.clear()
    const params: any = useParams()
    const dispatch = useDispatch<any>()
    const restaurant = useSelector<AppStateType,RestaurantType>(state => state.orders.selectedRestaurant)
    const orders = useSelector<AppStateType, OrdersType[]>(state => state.orders.orders)
    const idOfSelectedElement = useSelector<AppStateType, number>(state => state.orders.idOfSelectedElement)
    const selectedOrders = useSelector<AppStateType,OrdersType[]>(state => state.orders.selectedOrders)
    const navigate = useNavigate()
    const notReadyOrders = orders.filter(el=>!el.is_ready)
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
        <div className={'lg:w-96 h-full rounded-3xl bg-slate-100 flex flex-col overflow-y-scroll justify-between relative'}>
            <Header title={restaurant.title} img={restaurant.img} clickBtn={click}/>
            <Table orders={notReadyOrders} title={'Выберите свой заказ'} variant={'primary'} clickable/>
            <Advertisement/>
            {selectedOrders.length>0 &&
                ReactDOM.createPortal(<BottomPopUpWindow isOpened={selectedOrders.length>0}>
                    <div>Выбрано заказов: {selectedOrders.length}</div>
                    <button className={'m-1 text-white pl-1 pr-1 text-xl bg-orange-600 flex justify-center items-center rounded-lg border-none shadow-sm font-semibold'} onClick={onConfirmHandler}>Подтвердить</button>
                </BottomPopUpWindow>,document.getElementById('portal')!)
            }
        </div>
    );
};

