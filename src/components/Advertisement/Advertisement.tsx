import React, {useEffect, useState} from 'react';
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs';
import {useSelector} from "react-redux";
import {AppStateType} from "../../store/store";

type AdvertisementPropsType = {
    adds: string[]
}

export const Advertisement: React.FC<AdvertisementPropsType> = React.memo(({adds = []}) => {
    const loader = useSelector<AppStateType, boolean>(state => state.app.isLoading)

    const [currentIndex, setCurrentIndex] = useState(0);
    const [id, setId] = useState<any>(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? adds.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === adds.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        if (id) {
            clearInterval(id)
        }
        const intervalId = setInterval(() => {
            nextSlide()
        }, 3000)

        setId(intervalId)

        return () => {
            clearInterval(intervalId)
        }
    }, [currentIndex])

    return (
        <div className='lg:w-full relative group'>
            {loader && <AdvertisementSkeleton/>}
            {!loader && <div
                style={{backgroundImage: `url(${adds[currentIndex]})`}}
                className='w-full h-56 rounded-2xl bg-center bg-cover duration-500'
            ></div>}
            <div
                className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30}/>
            </div>
            <div
                className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30}/>
            </div>
            <div className='flex top-4 justify-center py-2'>
                {adds.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className='text-2xl cursor-pointer'
                    >
                    </div>
                ))}
            </div>
        </div>
    );
});

const AdvertisementSkeleton = () => {
    return (
        <div
            className={'w-full h-56 rounded-2xl bg-center bg-white duration-500 dark:bg-slate-300 animate-pulse'}></div>
    )
}