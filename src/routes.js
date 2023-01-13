import Admin from "./pages/admin/Admin";
import {ADMIN_ROUTE, HOME_ROUTE, ACCOUNT_ROUTE} from "./utils/consts";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ACCOUNT_ROUTE + '/:id',
        Component: Account
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE + ":block?",
        Component: Home
    },
    // {
    //     path: LOGIN_ROUTE,
    //     Component: Account
    // },
    // {
    //     path: REGISTRATION_ROUTE,
    //     Component: Account
    // },
]