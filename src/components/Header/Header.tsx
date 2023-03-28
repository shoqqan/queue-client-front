import React from 'react';

type BurgerLogoType = {
    title: string;
    img: string;
}

export const Header = (props: BurgerLogoType) => {
    return (
        <div className={'h-[70px] flex items-center justify-center gap-4'}>
            <img src={props.img} className={'w-12 h-12 rounded'} alt="logo"/>
            <div className={"text-4xl font-black text-gray-900 text-accent"}>{props.title}</div>
        </div>
    );
};
