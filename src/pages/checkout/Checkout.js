import React, {useEffect, useState} from 'react'
import s from './Checkout.module.sass'
import Footer from "../../components/footer/Footer";
import {$authHost} from "../../http";

const Checkout = () => {
    const [loading, setLoading] = useState(true)
    const [payData, setPayData] = useState('')
    const [receiptData, setReceiptData] = useState('')

    useEffect( () => {
        let id = window.location.pathname.replace('/checkout/', '')
        async function getData(id) {
            let endpoint = [
                `/api/payment/${id}`,
                `/api/payment/getReceipt/${id}`,
            ]

            Promise.all(endpoint.map(endpoint => $authHost.get(endpoint)))
                .then(([{data: payment}, {data: receipt}]) => {
                    setPayData(payment)
                    setReceiptData(receipt)
                })
        }

        getData(id)
    }, [])

    useEffect(() => {
        if(payData !== '' && receiptData !== '') {
            setLoading(false)
        }
    }, [payData, receiptData])

    if(loading) {
        return <div className="loader">
            <div className="lds_ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    }

    return(
        <div className={s.root}>
            <div className={s.root__content}>
                <h1 className={s.root__content_headertext}>Информация о заказе</h1>
                <div>
                    <p>Ожидайте звонка оператора для уточнения информации</p>
                </div>
                <div>
                    <p>Информация о заказе:</p>
                    {receiptData !== '' &&
                        receiptData[0].items.map(i =>
                            <div key={i.id}>
                                <p>Номер: {i.description}</p>
                                <p>{`Цена: ${i.amount.value} руб. * ${i.quantity} д. = ${i.amount.value * i.quantity} руб.`}</p>
                                <br/>
                            </div>
                        )
                    }
                    {payData !== '' && <p>Итого: {payData.amount.value} руб.</p>}
                </div>
            </div>
            <div className={s.root__footer}>
                <Footer/>
            </div>
        </div>
    )
}

export default Checkout