import React, {useEffect} from "react"
import Footer from "../../components/footer/Footer";
import s from './Pyament.module.sass'

const Payment = () => {

    useEffect(() => {
        let idAndToken = window.location.pathname.replace('/payment/', '').split('_')
        new window.YooMoneyCheckoutWidget({
            confirmation_token: idAndToken[1],
            return_url: `${window.location.origin}/checkout/${idAndToken[0]}`,
            customization: {
                colors: {
                    control_primary: '#FF8A36'
                }
            },
            error_callback: function(error) {
                console.log(error)
            }
        }).render('payment-form')
    }, [])

    return(
        <div className={s.root}>
            <div className={s.root__content}>
                <h1 className={s.root__content_headertext}>Страница оплаты</h1>
                <div className={s.root__content_form} id="payment-form"></div>
            </div>
            <div className={s.root__footer}>
                <Footer/>
            </div>
        </div>
    )
}

export default Payment