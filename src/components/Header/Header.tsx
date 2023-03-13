import React from 'react';

type BurgerLogoType = {
    title: string;
    img: string;
    clickBtn: string;
}

export const Header = (props: BurgerLogoType) => {
    return (
        <div className={'h-16 flex justify-center items-center w-96 rounded-l-3xl border-b-2 border-error'}>
            <div className={'h-16 flex justify-between items-center w-80'}>
                    <img src={props.img} className={'w-12 h-12'}/>
                    <div className={'basis-2/3'}>{props.title}</div>
            </div>
        </div>
    );
};
