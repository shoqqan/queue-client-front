import React from 'react';

type BottomPopUpWindowPropsType = {
    isOpened: boolean
    children: React.ReactNode
}
export const BottomPopUpWindow = (props: BottomPopUpWindowPropsType) => {
    const wrapperStyle = 'w-full bg-gray-200 flex justify-center flex-col opacity-100 visible box-border h-20 rounded-t-2xl ease-in-out px-1.5 pb-1.5 fixed bottom-0'
    const displayNoneStyle = 'w-full invisible opacity-0 translate-y-8 duration-300'
    return (
        <div className={props.isOpened?wrapperStyle:displayNoneStyle}>
            {props.children}
        </div>
    );
};

