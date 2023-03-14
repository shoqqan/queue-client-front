import React from 'react';
import {useNavigate} from "react-router-dom";

type RestaurantCardPropsType = {
    id:number,
    img: string
}
export const RestaurantCard = (props: RestaurantCardPropsType) => {
    const navigate = useNavigate()

    return (
        <div onClick={()=>navigate(`/restaurants/${props.id}`)}>
            <img src={props.img} className={'w-12 h-12'}/>
        </div>
    );
};

