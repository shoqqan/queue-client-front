import React from 'react';
import 'react-slideshow-image/dist/styles.css'
import {Slide} from "react-slideshow-image";


type AdvertisementType = {
    img: string[];
    isLoading: boolean;
}


export const ReactSlider = React.memo((props: AdvertisementType) => {
    return (
        <div className={""}>
            {props.isLoading && <div className={`w-mobile h-[224px] rounded-3xl loading`}/>}
            {!props.isLoading && <Slide infinite indicators autoplay duration={3000} arrows={false}>
                {props.img.map((t, i) => <div key={i} className={"w-mobile flex justify-center items-center"}>
                    <img src={t}
                         className={"max-w-[342px] rounded-2xl "}/>
                </div>)}
            </Slide>}
        </div>
    );
});
