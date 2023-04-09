import React from 'react';
import {Language} from "../Language/Language";
import {useSelector} from "react-redux";
import {AppStateType} from "../../store/store";

type BurgerLogoType = {
    title: string;
    img: string;
}

export const Header = (props: BurgerLogoType) => {
    const loader = useSelector<AppStateType, boolean>(state => state.app.isLoading)
    return (
        <div className={'h-[70px] flex items-center justify-center gap-4 mt-3'}>
            {!loader &&
                <>
                    <img src={props.img} className={'w-12 h-12 rounded'} alt="logo"/>
                    <div className={"text-2xl font-black text-gray-900 text-accent"}>{props.title}</div>
                    <Language/>
                </>
                }
            {loader && <HeaderSkeleton/>}
</div>
)
    ;
};
const HeaderSkeleton = () =>{
    return (
        <div className="flex items-center space-x-8">
            <div className="w-32 h-12  flex items-center justify-center h-15 rounded loading"/>
            <div className="w-full">
                <div className="h-2.5 rounded-full w-48 mb-4 loading"></div>
                <div className="h-2 rounded-full mb-2.5 loading"></div>
                <div className="h-2 rounded-full max-w-[440px] mb-2.5 loading"></div>
            </div>
        </div>
    )
}
