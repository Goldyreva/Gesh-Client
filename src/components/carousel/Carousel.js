import React, {useEffect, useState} from 'react';
import s from "./Carousel.module.sass"

const Carousel = ({images}) => {
    const [activeSlide, setActiveSlide] = useState(0)
    const [activeLink, setActiveLink] = useState(images[0].link)
    console.log(images.length)
    const setSlide = (i) => {
        setActiveLink(i.link)
        setActiveSlide(images.indexOf(i))
    }
    const nextSlide = () => {
        if(activeSlide < images.length - 1){
            setActiveSlide(activeSlide + 1)
        }else{
            setActiveSlide(0)
        }
    }
    const lastSlide = () => {
        if(activeSlide > 0){
            setActiveSlide(activeSlide - 1)
        }else{
            setActiveSlide(images.length - 1)
        }
    }


    return (
        <div className={s.root}>
            {/*{images.map(img =>*/}
            {/*    <img src={`${process.env.REACT_APP_API_URL}${img.link}`} key={img.id} alt=""/>*/}
            {/*)}*/}
            {/*<p>назад</p>*/}
            <div className={s.root__img_cont} style={{backgroundImage: `url(${process.env.REACT_APP_API_URL}${activeLink})`}} key={`pc${images[activeSlide].id}`}>
                {
                    images.map((item) =>
                        <div className={s.root__slider_cont} onMouseEnter={() => setSlide(item)} key={item.id}>
                            {
                                activeSlide === images.indexOf(item)
                                    ? <div className={s.root__slider_cont__line_white}></div>
                                    : <div className={s.root__slider_cont__line}></div>
                            }
                        </div>
                    )
                }
            </div>
            <div className={s.root__img_cont_mobile} style={{backgroundImage: `url(${process.env.REACT_APP_API_URL}${images[activeSlide].link})`}} key={`mob${images[activeSlide].id}`}>
                <div className={s.root__arrow} onClick={lastSlide}>
                    <p> {'<'} </p>
                </div>
                <div className={s.root__arrow} onClick={nextSlide}>
                    <p> {'>'} </p>
                </div>
            </div>

        </div>
    );
};

export default Carousel;