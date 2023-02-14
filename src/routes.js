import Admin from "./pages/admin/Admin";
import {
    ADMIN_ROUTE,
    HOME_ROUTE,
    ACCOUNT_ROUTE,
    QR_ROUTE,
    TERMS_ROUTE,
    OFFER_ROUTE,
    PAYMENT_ROUTE, PAYMENT_END_ROUTE
} from "./utils/consts";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import QrCode from "./pages/qrCode/QrCode";
import Terms from "./pages/Terms/Terms";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import Checkout from "./pages/checkout/Checkout";

export const authRoutes = [
    {
        path: PAYMENT_ROUTE + '/:confirmationToken',
        Component: Payment
    },
    {
        path: PAYMENT_END_ROUTE + '/:confirmationToken',
        Component: Checkout
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ACCOUNT_ROUTE + '/:id',
        Component: Account
    }
]

export const publicRoutes = [
    {
        path: TERMS_ROUTE,
        Component: Terms
    },
    {
        path: OFFER_ROUTE,
        Component: Offer
    },
    {
        path: HOME_ROUTE + ":block?",
        Component: Home
    },
    {
        path: QR_ROUTE + "/:id",
        Component: QrCode
    }

]