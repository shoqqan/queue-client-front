import React from 'react';
import s from './Landing.module.css';

export const Landing = () => {
    return (
        <div className={s.screen}>
            <div className={s.screenImage}/>
            <div className={s.screenOverlay}></div>
            <div className={s.welcomeText}>
                Сервис для отслеживания заказа
                <br/>
                <span className="text-[20px]">
                Бесплатно для&nbsp;ресторанов и клиентов
                </span>
            </div>
            <span className={s.linkToWhatsapp}>
                <a href="https://wa.me/77071013735" target="_blank" rel="noreferrer">
                    <img src="https://img.icons8.com/color/48/000000/whatsapp--v1.png" alt="whatsapp"/>
                </a>
            </span>
        </div>
    );
};



