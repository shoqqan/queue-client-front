import React from 'react';
import {useNavigate} from "react-router-dom";

type RestaurantCardPropsType = {
    id:number,
    img: string
}
const RestaurantCard = (props: RestaurantCardPropsType) => {
    const navigate = useNavigate()

    return (
        <div onClick={()=>navigate(`/restaurants/${props.id}`)}>
            <img src={props.img}  style={{width:"50px", height:"50px"}}/>
        </div>
    );
};

export default RestaurantCard;