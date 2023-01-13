import React, {useContext, useEffect, useState} from 'react';
import s from './Account.module.sass'
import Footer from "../../components/footer/Footer";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {login, registration, userInfo, edit} from "../../http/userApi";
import {LOGIN_ROUTE} from "../../utils/consts";


const Account = observer(() => {
    let {orderDetails, barcode, user} = useContext(Context)
    const [editActive, setEditActive] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [nameDirty, setNameDirty] = useState(false)
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [emailError, setEmailError] = useState("E-mail не может быть пустым")
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым")
    const [nameError, setNameError] = useState("Имя не может быть пустым")
    const [phoneError, setPhoneError] = useState("Телефон не может быть пустым")
    const [regError, setRegError] = useState("")
    const [userOrders, setUserOrders] = useState({})
    const orderInfo = [
        {
            id: 1,
            number: '9384HO90',
            status: 'pay'
        }
    ]
    const [inputField, setInputField] = useState({})
    const [constField, setConstField] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    })

    useEffect(() => {
        userInfo(user.user.id).then(data =>{setInputField(data)})
    }, [])

    const inputsHandler = (e) => {
        if(e.target.name !== 'phone'){
            setInputField( regField => ({...regField, [e.target.name]: e.target.value}))
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
        if(e.target.name === 'password' && e.target.value.length < 8 && e.target.value.length > 0){
            setPasswordError('Пароль не может быть меньше 8 символов')
        }else{
            setPasswordError('')
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
            setInputField( inputField => ({...inputField, [e.target.name]: e.target.value}))
            setPhoneError('')
        }
        // setInputField(inputField => ({...inputField, [e.target.name]: e.target.value}))
    }
    const blurHandler = (e) => {
        switch (e.target.name){
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
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
    const back = () => {
        setInputField(inputField => ({...constField}))
        setEditActive(false)
    }

    const submitButton = () => {
        setEditActive(false)
        setConstField(constField => ({...inputField}))
        console.log(inputField)
        let data = edit(inputField.email, inputField.phone, inputField.name, inputField.password, user.user.id)
        user.setUser(data)
    }
    console.log(orderDetails.orders)
    return (
        <div className={s.root}>
            <div className={s.root__header}>
                <p>Личный кабинет</p>
                <h2>Приветствуем вас!</h2>
            </div>
            <div className={s.root__main}>
                <div className={s.root__wrapper_person}>
                    <div className={s.root__person}>
                        <div className={s.root__person_header}>
                            <h4>Ваши данные</h4>
                            <div className={s.root__header_icon}>
                                <svg
                                    className={editActive ? `${s.root__header_img} ${s.nonActive}` : `${s.root__header_img}`}
                                    onClick={() => setEditActive(true)} viewBox="0 0 23 23" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.1663 6.5L17.6504 4.01592C17.8536 3.81282 18.1291 3.69873 18.4163 3.69873C18.7036 3.69873 18.9791 3.81282 19.1823 4.01592L21.9838 6.81742C22.1869 7.02057 22.3009 7.29607 22.3009 7.58333C22.3009 7.87059 22.1869 8.14609 21.9838 8.34925L19.4997 10.8333M15.1663 6.5L4.65042 17.0159C4.44725 17.219 4.33307 17.4945 4.33301 17.7818V20.5833C4.33301 20.8707 4.44714 21.1462 4.65031 21.3494C4.85347 21.5525 5.12902 21.6667 5.41634 21.6667H8.21784C8.50514 21.6666 8.78064 21.5524 8.98376 21.3493L19.4997 10.8333M15.1663 6.5L19.4997 10.8333"
                                        stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <svg onClick={back} className={editActive ? `${s.active}` : `${s.nonActive}`}
                                     viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.744 0L8 5.744L2.256 0L0 2.256L5.744 8L0 13.744L2.256 16L8 10.256L13.744 16L16 13.744L10.256 8L16 2.256L13.744 0Z"
                                        fill="black"/>
                                </svg>
                            </div>
                        </div>
                        <div className={s.root__person_content}>
                            <form action="">
                                <div className={s.root__input_cont}>
                                    <label htmlFor="">Ваше ФИО</label>
                                    {editActive
                                        ? <input type="text" value={inputField.name} onChange={inputsHandler} onBlur={e => blurHandler(e)}
                                                 name="name"/>
                                        : <p>{inputField.name}</p>
                                    }

                                </div>{(nameDirty && nameError) && <div>{nameError}</div>}
                                <div className={s.root__input_cont}>
                                    <label htmlFor="">Ваш email</label>
                                    {editActive
                                        ? <input type="email" value={inputField.email} onChange={inputsHandler} onBlur={e => blurHandler(e)}
                                                 name="email"/>
                                        : <p>{inputField.email}</p>
                                    }

                                </div>{(emailDirty && emailError) && <div>{emailError}</div>}
                                <div className={s.root__input_cont}>
                                    <label htmlFor="">Ваш телефон: </label>
                                    {editActive
                                        ? <input type="tel" value={inputField.phone} onChange={inputsHandler} onBlur={e => blurHandler(e)}
                                                 name="phone"/>
                                        : <p>{inputField.phone}</p>
                                    }

                                </div>{(phoneDirty && phoneError) && <div>{phoneError}</div>}
                                <div className={s.root__input_cont}>
                                    <label htmlFor="">Ваш пароль</label>
                                    {editActive
                                        ? <input type="password" value={inputField.password} onChange={inputsHandler} onBlur={e => blurHandler(e)}
                                                 name="password" placeholder="********" />
                                        : <input type="password" value={inputField.password} disabled name="password" placeholder="********"/>

                                    }

                                </div>{(passwordDirty && passwordError) && <div>{passwordError}</div>}
                                <div>{regError}</div>
                                <p className={editActive ? `${s.root__btn_submit}` : `${s.root__btn_submit} ${s.nonActive}`}
                                   onClick={submitButton}>Сохранить изменения</p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={s.root__wrapper_order}>
                    <div className={s.root__order}>
                        <div className={s.root__order_header}>
                            <h4>Ваши заказы</h4>
                        </div>
                        <div className={s.root__orders}>
                            {
                                orderDetails.orders.map(item =>
                            <div className={s.root__order_content}>
                                <div className={`${s.root__order_grid} ${s.grid_header}`}>
                                    <div><span>Номер заказа</span></div>
                                    <div><span>Статус</span></div>
                                    <div><span>Подробности</span></div>
                                    <div><span>QR-код</span></div>
                                </div>

                                        <div className={s.root__order_grid}>
                                            <div>{item.number}</div>
                                            <div>{item.status}</div>
                                            <div><a onClick={() => {
                                                orderDetails.setActive(true)
                                                orderDetails.setId(item.id)
                                            }}>Перейти</a></div>
                                            <div><a onClick={() => {
                                                barcode.setActive(true)
                                                barcode.setId(item.id)
                                            }}>Открыть</a></div>
                                        </div>


                            </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
});

export default Account;