import React, {useEffect, useState} from 'react';
import s from "./Map.module.sass";
import map from '../../../img/villageMap.jpg'
import {create} from "../../../http/feedbackApi";
import {set} from "mobx";

const Map = React.forwardRef((props, forwardRef) => {
    const [feedbackField, setFeedbackField] = useState({
        phone: '',
        name: '',
        message: ''
    })
    const [error, setError] = useState('')
    const [errorDirty, setErrorDirty] = useState()
    const [nameDirty, setNameDirty] = useState(false)
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [messageDirty, setMessageDirty] = useState(false)
    const [nameError, setNameError] = useState('Имя не может быть пустым')
    const [phoneError, setPhoneError] = useState('Телефон не может быть пустым ')
    const [messageError, setMessageError] = useState('Сообщение не может быть пустым')
    const feedbackHandler = (e) => {
        setError('')
        if (e.target.name === 'phone') {
            e.target.value = e.target.value.replace(/\D/g, "")
            let inputValue = ""
            if (["7", "8", "9"].indexOf(e.target.value[0]) > -1) {
                if (e.target.value[0] === "9") {
                    e.target.value = "7" + e.target.value
                }
                let firstSymbols = (e.target.value[0] === "8") ? "8" : "+7"
                inputValue = firstSymbols + " "
                if (e.target.value.length > 1) {
                    inputValue += "(" + e.target.value.substring(1, 4)

                }
                if (e.target.value.length >= 5) {
                    inputValue += ") " + e.target.value.substring(4, 7)
                }
                if (e.target.value.length >= 8) {
                    inputValue += "-" + e.target.value.substring(7, 9)
                }
                if (e.target.value.length >= 10) {
                    inputValue += "-" + e.target.value.substring(9, 11)
                }
            } else {
                inputValue = "+" + e.target.value
            }
            e.target.value = inputValue
            setFeedbackField(feedbackField => ({...feedbackField, [e.target.name]: e.target.value}))
            setPhoneError('')
        }
        if (e.target.name === 'name' && e.target.value.length > 1) {
            setFeedbackField(feedbackField => ({...feedbackField, [e.target.name]: e.target.value}))
            setNameError("")
        }
        if (e.target.name === 'message' && e.target.value.length > 10) {
            setFeedbackField(feedbackField => ({...feedbackField, [e.target.name]: e.target.value}))
            setMessageError('')
        }
    }
    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'message':
                setMessageDirty(true)
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
    const submitBtn = async (e) => {
        e.preventDefault()
        console.log(feedbackField)
        create(feedbackField.phone, feedbackField.name, feedbackField.message)
            .catch(e => setError(e.response.data.message))
        // setError(data)
    }
    return (<div className={s.root} id="map" ref={forwardRef}>
            <div className={s.root__header}>
                <div className={s.root__h2_cont}><h2>КАРТА ПОСЕЛКА</h2></div>
            </div>
            <div className={s.root__map_cont}>
                <div className={s.root__feedback}>
                    <div className={s.root__h3_cont}>
                        <h3>По вопросам
                            бронирования и
                            покупки домов</h3>
                    </div>

                    <h4>воспользуйтесь формой обратной связи:</h4>
                    <form action="">
                        <input type="text" className="text" name="name" placeholder="ВАШЕ ИМЯ"
                               onChange={feedbackHandler} onBlur={e => blurHandler(e)}/>
                        {(nameDirty && nameError) && <div className={s.root__error}>{nameError}</div>}
                        <input type="tel" className="tel" name="phone" placeholder="+7(999)-999-99-99"
                               onChange={feedbackHandler} onBlur={e => blurHandler(e)}/>
                        {(phoneDirty && phoneError) && <div className={s.root__error}>{phoneError}</div>}
                        <textarea name="" id="" cols="30" rows="10" name="message" placeholder="ВАШЕ СООБЩЕНИЕ"
                                  onChange={feedbackHandler} onBlur={e => blurHandler(e)}></textarea>
                        {(messageDirty && messageError) && <div className={s.root__error}>{messageError}</div>}
                        <div className={s.root__error}>{error}</div>
                        <button className={s.root__submit_btn} onClick={submitBtn}>ОТПРАВИТЬ</button>
                    </form>
                </div>
                <div className={s.root__map}>
                    <img src={map} alt="map"/>
                </div>
            </div>
        </div>);
});

export default Map;