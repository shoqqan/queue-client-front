import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {authMe} from "../../store/app-reducer";
import {AppStateType} from "../../store/store";
import {getOrdersTC, getRestaurantTC, RestaurantType} from "../../store/restaurant-reducer";
import {Header} from "../../components/Header/Header";
import {Table} from "../../components/Table/Table";
import ReactDOM from "react-dom";
import {BottomPopUpWindow} from "../../components/BottomPopUpWindow/BottomPopUpWindow";
import {useTranslation} from "react-i18next";


export const Restaurant = () => {
    const {restaurantId} = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch<any>()
    const accessToken = useSelector<AppStateType, string>((state) => state.app.accessToken)
    const {title, logo, orders} = useSelector<AppStateType, RestaurantType>((state: AppStateType) => state.restaurant)
    const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
    const {t} = useTranslation()
    const gettingReadyOrders = orders.filter(order => !order.is_ready)
        .map(order => ({
            ...order,
            isSelected: selectedOrders.includes(order.id)
        }))
    const readyOrders = orders.filter(order => order.is_ready)


    const onItemClicked = (id: number) => {
        const index = selectedOrders.indexOf(id);
        if (index === -1) {
            setSelectedOrders([...selectedOrders, id]);
        } else {
            setSelectedOrders(selectedOrders.filter((_, i) => i !== index))
        }
    }

    const onConfirmHandler = () => {
        //TODO: Need translate to local language
        const message = `Хочу следить за этими заказами: ${selectedOrders.join(', ')}
        Текст нельзя менять, иначе бот не сможет распознать заказы`
        window.location.href = 'https://wa.me/77071013735?text=' + message
        setSelectedOrders([]);
    }
    useEffect(() => {
        if (Number.isNaN(Number(restaurantId))) {
            navigate('/')
        } else {
            dispatch(authMe())
        }
    }, [])

    let intervalId: any;
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
        if (orders.length) {
            const gettingReadyOrdersId = orders.filter(order => !order.is_ready).map(order => order.id)
            setSelectedOrders(selectedOrders.filter(id => gettingReadyOrdersId.includes(id)))
        }
    }, [orders])


    return (
        <div
            className={'w-mobile h-full rounded-3xl flex flex-col gap-4 relative overflow-y-auto'}>
            <Header title={title} img={logo}/>
            <Table
                orders={gettingReadyOrders}
                title={t('RESTAURANT_PAGE.CHOOSE_ORDERS')}
                variant={'primary'}
                onItemClicked={onItemClicked}
            />
            <Table
                orders={readyOrders}
                title={t('ORDERS_PAGE.READY')}
                variant={'secondary'}
            />
            {
                selectedOrders.length > 0 &&
                <SelectedOrdersPopUp selected={selectedOrders.length} onConfirm={onConfirmHandler}/>

            }
        </div>
    );
};

const SelectedOrdersPopUp: React.FC<{ selected: number, onConfirm: () => void }> = ({selected, onConfirm}) => {
    const {t} = useTranslation()
    return ReactDOM.createPortal(<BottomPopUpWindow isOpened={selected > 0}>
        <div>{`${t('RESTAURANT_PAGE.TOASTER.ORDERS_SELECTED')} ${selected}`}</div>
        <button
            className={'m-1 text-white py-1 text-xl bg-orange-600 flex justify-center items-center rounded-lg border-none shadow-sm font-semibold'}
            onClick={onConfirm}>{t('RESTAURANT_PAGE.TOASTER.CONFIRM')}
        </button>
    </BottomPopUpWindow>, document.getElementById('portal')!)
}