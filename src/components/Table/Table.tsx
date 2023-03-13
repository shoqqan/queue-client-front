import React from 'react';
import {useNavigate} from "react-router-dom";
import {OrdersType, selectedElement} from "../../store/orders-reducer";
import {useDispatch} from "react-redux";


type TableProps = {
    orders: OrdersType[],
    title: string,
    variant: 'primary' | 'secondary',
    clickable:boolean
}

export const Table: React.FC<TableProps> = ({orders, title, variant,clickable}) => {
    const dispatch = useDispatch<any>()
    const classes = {
        primary: {
            table: 'flex justify-center',
            main: 'flex text-center font-medium justify-center text-[white] overflow-y-scroll p-2.5 rounded-[20px_20px_0_0] border-[none] bg-accent',
            border: 'flex flex-row border w-80 justify-evenly flex-wrap overflow-y-scroll rounded-[0_0_8px_8px] border-solid border-2 p-1 h-[200px] border-[#fe540e]',
            order: 'h-20 font-bold p-2 min-w-[80px] text-[20px] bg-white flex justify-center items-center shadow-[0_2px_5px_0_rgba(0,0,0,0.4)]  m-[5px] px-[5px] rounded-[10px] border-2 border-[#fe540e]',
            selected: 'bg-accent-light text-white font-bold border-none'

        },
        secondary: {
            table: 'flex justify-center',
            main: 'flex text-center font-medium justify-center text-[white] overflow-y-scroll p-2.5 rounded-[20px_20px_0_0] border-[none] bg-[green]',
            border: 'flex flex-row border w-80 justify-evenly flex-wrap overflow-y-scroll rounded-[0_0_8px_8px] border-solid border-2 p-1 h-[200px] border-[green]',
            order: 'h-20 font-bold p-2 min-w-[80px] text-[20px] bg-white flex justify-center items-center shadow-[0_2px_5px_0_rgba(0,0,0,0.4)]  m-[5px] px-[5px] rounded-[10px] border-2 border-[green]',
            selected: 'bg-accent t-white font-bold border-none'
        },

    }
    const selectOrder = (isSelected: boolean, id: number) => {
        dispatch(selectedElement(id, isSelected))
    }

    const navigate = useNavigate()

    const orderInfo = (orderId: number) => {
        navigate(`/home/${45}/orders/${orderId}`)
    }

    return (
        <div className={classes[variant].table}>
            <div className={'flex flex-col'}>
                <div>
                    <div
                        className={classes[variant].main}>{title}</div>
                    <div
                        className={classes[variant].border}>
                        {orders.map((t) => (
                             <button key={t.id}
                                     className={t.isSelected?`${classes[variant].order} ${classes[variant].selected}` :`${classes[variant].order}`}
                                     onClick={clickable?() => selectOrder(t.isSelected,t.id):()=>{}}>{t.key}
                            </button>
                        ))}</div>
                </div>
            </div>
        </div>
    );
};