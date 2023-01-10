import React, {useContext, useState} from 'react';
import s from "./Cart.module.sass";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {login, registration} from "../../http/userApi";

const Cart = observer(() => {
    let {cart} = useContext(Context)

    const [num, setNum] = useState(1)
    const [emailDirty, setEmailDirty] = useState(false)
    const [firstnameDirty, setFirstnameDirty] = useState(false)
    const [nameDirty, setNameDirty] = useState(false)
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [emailError, setEmailError] = useState("E-mail не может быть пустым")
    const [nameError, setNameError] = useState("Имя не может быть пустым")
    const [firstnameError, setFirstnameError] = useState("Фамилия не может быть пуста")
    const [phoneError, setPhoneError] = useState("Телефон не может быть пустым")
    const [regError, setRegError] = useState("")
    const [regField , setRegField] = useState({
        name: '',
        firstname: '',
        email: '',
        phone: '',
    })
    const regHandler = (e) =>{
        if(e.target.name !== 'phone'){
            setRegField( regField => ({...regField, [e.target.name]: e.target.value}))
        }
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        // const tel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
        if(e.target.name === 'email' && !re.test(String(e.target.value).toLowerCase())){
            setEmailError('Некорректный E-mail')
        }else{
            setEmailError('')
        }
        if(e.target.name === 'name' && e.target.value.length < 2){
            setNameError('Некорректное имя')
        }else{
            setNameError('')
        }
        if(e.target.name === 'firstname' && e.target.value.length < 8 && e.target.value.length > 0){
            setFirstnameError("Некорректная фамилия")
        }else{
            setFirstnameError('')
        }
        if(e.target.name === 'phone'){
            e.target.value = e.target.value.replace(/\D/g, "")
            let inputValue =""
            if(["7", "8", "9"].indexOf(e.target.value[0]) > -1){
                if(e.target.value[0] === "9"){
                    e.target.value = "7" + e.target.value
                }
                let firstSymbols = (e.target.value[0] === "8") ? "8" : "+7"
                inputValue = firstSymbols + " "
                if(e.target.value.length > 1){
                    inputValue += "(" + e.target.value.substring(1, 4)

                }
                if(e.target.value.length >= 5){
                    inputValue += ") " + e.target.value.substring(4, 7)
                }
                if(e.target.value.length >= 8){
                    inputValue += "-" + e.target.value.substring(7, 9)
                }
                if(e.target.value.length >= 10){
                    inputValue += "-" + e.target.value.substring(9, 11)
                }
            }else{
                inputValue = "+" + e.target.value
            }
            e.target.value = inputValue
            console.log(e.target.value)
            console.log(e.target.value.length)
            setRegField( regField => ({...regField, [e.target.name]: e.target.value}))
            setPhoneError('')
        }
    }
    const blurHandler = (e) => {
        switch (e.target.name){
            case 'email':
                setEmailDirty(true)
                break
            case 'firstname':
                setFirstnameDirty(true)
                break
            case 'name':
                setNameDirty(true)
                break
            case 'phone':
                setPhoneDirty(true)
                break
            default:
                break
        }
    }

    // const regAuth = async () => {
    //     let data
    //     try {
    //         if(tab == false){
    //             data = await login(authField.email,authField.password)
    //             console.log(data)
    //         }else{
    //             data = await registration(regField.email, regField.phone, regField.name, regField.password)
    //             console.log(data)
    //         }
    //         user.setIsUser(user)
    //         user.setIsAuth(true)
    //
    //     } catch (e){
    //         if(tab == false) {
    //             setAuthError(e.response.data.message)
    //         }else{
    //             setRegError(e.response.data.message)
    //         }
    //     }
    // }
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
                        <input type="text" className={s.root__form_name} placeholder="Ваше имя" onChange={regHandler} onBlur={e => blurHandler(e)} name="name"/>
                        {(nameDirty && nameError) && <div>{nameError}</div>}
                        <input type="text" className={s.root__form_password} placeholder="Ваша фамилия" onChange={regHandler} onBlur={e => blurHandler(e)} name="firstname"/>
                        {(firstnameDirty && firstnameError) && <div>{firstnameError}</div>}
                        <input type="email" className={s.root__form_email} placeholder="Ваш E-mail" onChange={regHandler} onBlur={e => blurHandler(e)} name="email"/>
                        {(emailDirty && emailError) && <div>{emailError}</div>}
                        <input type="tel" className={s.root__form_phone} placeholder="+7 (999) 999-99-99" maxLength="18" onChange={regHandler} onBlur={e => blurHandler(e)} name="phone"/>
                        {(phoneDirty && phoneError) && <div>{phoneError}</div>}
                        <div>{regError}</div>
                        <p className={s.root__btn_submit}>Зарегестрироваться</p>
                    </form>
                </div>
            </div>
        </div>
    );
});

export default Cart;