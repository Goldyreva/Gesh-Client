import React, {useContext} from 'react';
import s from './ProductCard.module.sass'
import Carousel from "../carousel/Carousel";
import {Context} from "../../index";

const ProductCard = ({active, setActive, info, addToCart}) => {
    const {user, modal} = useContext(Context)
    return (
        <div className={active ? `${s.root} ${s.active}` : `${s.root}`} onClick={() => {
            setActive()
        }}>
            <div className={s.root__modal_content} onClick={e =>e.stopPropagation()}>
                <div className={s.root__header}>
                    <div className={s.root__close} onClick={() => setActive(false)}>
                        <svg className={s.root__close_img} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.575 7.975L1.675 12.875C1.49167 13.0583 1.25833 13.15 0.975 13.15C0.691667 13.15 0.458333 13.0583 0.275 12.875C0.0916663 12.6917 0 12.4583 0 12.175C0 11.8917 0.0916663 11.6583 0.275 11.475L5.175 6.575L0.275 1.675C0.0916663 1.49167 0 1.25833 0 0.975C0 0.691667 0.0916663 0.458333 0.275 0.275C0.458333 0.0916663 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916663 1.675 0.275L6.575 5.175L11.475 0.275C11.6583 0.0916663 11.8917 0 12.175 0C12.4583 0 12.6917 0.0916663 12.875 0.275C13.0583 0.458333 13.15 0.691667 13.15 0.975C13.15 1.25833 13.0583 1.49167 12.875 1.675L7.975 6.575L12.875 11.475C13.0583 11.6583 13.15 11.8917 13.15 12.175C13.15 12.4583 13.0583 12.6917 12.875 12.875C12.6917 13.0583 12.4583 13.15 12.175 13.15C11.8917 13.15 11.6583 13.0583 11.475 12.875L6.575 7.975Z" fill="white"/>
                        </svg>
                    </div>
                </div>
                <div className={s.root__info_img_cont}>
                    <div className={s.root__carousel_cont}>
                        {info.itemsImages
                            ?<Carousel images={info.itemsImages} keySimbols={"card"} active={active}/>
                            :<></>
                        }

                    </div>
                    <div className={s.root__info_cont}>
                        <h3>{info.name}</h3>
                        <pre className={s.root__info_cont__p}>{info.description}</pre>
                        <h4>{info.price} руб/сутки</h4>
                        {/*<p className={s.root__btn} onClick={() => {*/}
                        {/*    addToCart(info.id)*/}
                        {/*}}>В корзину</p>*/}
                        {user.isAuth
                            ? <><p onClick={e =>{e.stopPropagation()
                                addToCart(info.id)
                            }} className={s.root__btn}>
                                Забронировать
                            </p></>
                            : <><p onClick={e =>{e.stopPropagation()
                                modal.setActive(true)
                            }} className={s.root__btn}>
                                Забронировать
                            </p></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;