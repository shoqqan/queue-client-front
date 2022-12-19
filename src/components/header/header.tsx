import React from 'react';
import s from "./header.module.css";


type BurgerLogoType = {
    title: string,
    img: string,
    setActive: (value: any) => void
}

export const Header = (props: BurgerLogoType) => {
    return (
        <div className={s.main}>
            <div className={s.logoBell}>
                <div className={s.flex}>
                    <img src={props.img} className={s.img}/>
                    <div className={s.title}>{props.title}</div>
                </div>
                <div className={s.flex}>
                    <button className={s.modalButton}
                            onClick={()=>{props.setActive(true)}}>M
                    </button>
                </div>
            </div>
        </div>
    );
};
