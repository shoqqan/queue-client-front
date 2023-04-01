import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {authMe, setIsLoading} from "../../store/app-reducer";
import {AppStateType} from "../../store/store";
import {getOrdersTC, RestaurantType} from "../../store/restaurant-reducer";
import {Header} from "../../components/Header/Header";
import {Table} from "../../components/Table/Table";
import {Advertisement} from "../../components/Advertisement/Advertisement";
import ReactDOM from "react-dom";
import {BottomPopUpWindow} from "../../components/BottomPopUpWindow/BottomPopUpWindow";
import {useTranslation} from "react-i18next";


export const Restaurant = () => {
    const {restaurantId} = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch<any>()
    const accessToken = useSelector<AppStateType, string>((state) => state.app.accessToken)
    const {title, img, orders} = useSelector<AppStateType, RestaurantType>((state: AppStateType) => state.restaurant)
    const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
    const {t} = useTranslation()
    const gettingReadyOrders = orders.filter(order => !order.is_ready)
        .map(order => ({
            ...order,
            isSelected: selectedOrders.includes(order.id)
        }))

    const onItemClicked = (id: number) => {
        const index = selectedOrders.indexOf(id);
        if (index === -1) {
            setSelectedOrders([...selectedOrders, id]);
        } else {
            setSelectedOrders(selectedOrders.filter((_, i) => i !== index))
        }
    }

    const onConfirmHandler = () => {
        navigate('orders/' + selectedOrders.join(','))
    }
    useEffect(() => {
        if (Number.isNaN(Number(restaurantId))) {
            navigate('/')
        } else {
            dispatch(authMe())
        }
    }, [])

    let intervalId = 0;
    useEffect(() => {
        if (accessToken && restaurantId) {
            dispatch(getOrdersTC(restaurantId,true))
            intervalId = setInterval(() => {
                dispatch(getOrdersTC(restaurantId))
            }, 3000)
        }
        return () => {
            clearInterval(intervalId)
        }
    }, [accessToken])

    useEffect(() => {
        if (orders.length) {
            const gettingReadyOrdersId = orders.filter(order => !order.is_ready).map(order => order.id)
            setSelectedOrders(selectedOrders.filter(id => gettingReadyOrdersId.includes(id)))
        }
    }, [orders])


    return (
        <div
            className={'h-full rounded-3xl flex flex-col justify-between gap-4 relative overflow-hidden'}>
            <Header title={title} img={img}/>
            <Table
                orders={gettingReadyOrders}
                title={t('RESTAURANT_PAGE.CHOOSE_ORDERS')}
                variant={'primary'}
                onItemClicked={onItemClicked}
            />
            <Advertisement/>
            <div className="h-[30px]"/>
            {
                selectedOrders.length > 0 &&
                ReactDOM.createPortal(<BottomPopUpWindow isOpened={selectedOrders.length > 0}>
                    <div>{`${t('RESTAURANT_PAGE.TOASTER.ORDERS_SELECTED')} ${selectedOrders.length}`}</div>
                    <button
                        className={'m-1 text-white pl-1 pr-1 text-xl bg-orange-600 flex justify-center items-center rounded-lg border-none shadow-sm font-semibold'}
                        onClick={onConfirmHandler}>{t('RESTAURANT_PAGE.TOASTER.CONFIRM')}
                    </button>
                </BottomPopUpWindow>, document.getElementById('portal')!)
            }
        </div>
    );
};

