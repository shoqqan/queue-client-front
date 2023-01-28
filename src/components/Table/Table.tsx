import React from 'react';
import s from './Table.module.css'
import {OrdersType, selectedElement} from "../../store/orders-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";


export type TableType = {
    orders: OrdersType[]
    loader: boolean
}

export const Table = (props: TableType) => {
    const selectedOrders = useSelector<AppStateType,OrdersType[]>(state => state.orders.selectedOrders)
    const dispatch = useDispatch<any>()
    const selectOrder = (isSelected: boolean, id:number) =>{
        dispatch(selectedElement(id,isSelected))
    }

    return (
        <div className={selectedOrders.length>0?`${s.main} ${s.popupActive}`:`${s.main} `}>
            <div className={s.table}>
                <div>
                    <div className={s.check}>Готовится</div>
                    <div className={s.numbersTrue_scroll}>
                        {props.orders.map((t) => {
                            if (!t.is_ready) return <button key={t.id}
                                                            onClick={()=>{selectOrder(t.isSelected,t.id)}}
                                                            className={t.isSelected ? `${s.selectedButton} ${s.true}` : s.true}>{t.key}</button>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
