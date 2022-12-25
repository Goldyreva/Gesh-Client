import React, {useContext, useState} from 'react';
import s from "./Cart.module.sass";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const Cart = observer(() => {
    let {cart} = useContext(Context)

    const [num, setNum] = useState(1)
    const [regField , setRegField] = useState({
        name: '',
        firstname: '',
        email: '',
        phone: '',
    })
    const regHandler = (e) =>{
        setRegField( regField => ({...regField, [e.target.name]: e.target.value}))
    }

    const regButton = () =>{
        // setRegField(false)
        console.log(regField)
        cart.setActive(false)
        //вставить отправку данных
        //вставить очистку полей
        //вставить автоматическую авторизацию
    }
    return(

        <div className={cart.isActive ? `${s.root} ${s.active}` : `${s.root}`} onClick={() => cart.setActive(false)}>
            <div className={s.root__modal_content} onClick={e =>e.stopPropagation()}>
                <div className={s.root__header}>
                    <h2>Ваш заказ</h2>
                    <div className={s.root__header_close} onClick={() => cart.setActive(false)}>
                        <svg className={s.root__header_img} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.575 7.975L1.675 12.875C1.49167 13.0583 1.25833 13.15 0.975 13.15C0.691667 13.15 0.458333 13.0583 0.275 12.875C0.0916663 12.6917 0 12.4583 0 12.175C0 11.8917 0.0916663 11.6583 0.275 11.475L5.175 6.575L0.275 1.675C0.0916663 1.49167 0 1.25833 0 0.975C0 0.691667 0.0916663 0.458333 0.275 0.275C0.458333 0.0916663 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916663 1.675 0.275L6.575 5.175L11.475 0.275C11.6583 0.0916663 11.8917 0 12.175 0C12.4583 0 12.6917 0.0916663 12.875 0.275C13.0583 0.458333 13.15 0.691667 13.15 0.975C13.15 1.25833 13.0583 1.49167 12.875 1.675L7.975 6.575L12.875 11.475C13.0583 11.6583 13.15 11.8917 13.15 12.175C13.15 12.4583 13.0583 12.6917 12.875 12.875C12.6917 13.0583 12.4583 13.15 12.175 13.15C11.8917 13.15 11.6583 13.0583 11.475 12.875L6.575 7.975Z" fill="white"/>
                        </svg>
                    </div>
                </div>
                <div className={s.root__summary}>
                    <div className={s.root__summary_top}>
                        <p>Двухместный номер (кровать king size) для 2 гостей</p>
                        <div className={s.root__summary_input_cont}>
                            <label htmlFor="">Количество суток</label>
                            <div className={s.root__input_num}>
                                <span onClick={() => {
                                    if(num >= 2){
                                        setNum(num-1)}
                                    }
                                }>-</span>
                                <input type="number" min={1} value={num} className="number"/>
                                <span onClick={() => {setNum(num+1)}}>+</span>
                            </div>
                        </div>
                    </div>
                    <h4>ИТОГО: 12 000 руб.</h4>

                </div>
                <div className={s.root_reg}>
                    <form action="" className={s.root__form}>
                        <input type="text" className={s.root__form_name} placeholder="Ваше имя" onChange={regHandler} name="name"/>
                        <input type="text" className={s.root__form_name} placeholder="Ваша фамилия" onChange={regHandler} name="firstname"/>
                        <input type="email" className={s.root__form_email} placeholder="Ваш E-mail" onChange={regHandler} name="email"/>
                        <input type="tel" className={s.root__form_phone} placeholder="+7 (999) 999-99-99" onChange={regHandler} name="phone"/>
                        <p onClick={regButton} className={s.root__btn_submit}>Оплатить</p>
                    </form>
                </div>
            </div>
        </div>
    );
});

export default Cart;