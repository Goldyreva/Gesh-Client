import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import ItemStore from './store/ItemStore';
import ModalStore from "./store/ModalStore";
import CartStore from "./store/CartStore";
import MenuStore from "./store/MenuStore";
import OrderDetailsStore from "./store/OrderDetailsStore";
import BarcodeStore from "./store/BarcodeStore";
import AdminStore from "./store/AdminStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        item: new ItemStore(),
        modal: new ModalStore(),
        orderDetails: new OrderDetailsStore(),
        barcode: new BarcodeStore(),
        cart: new CartStore(),
        menu: new MenuStore(),
        admin: new AdminStore(),
    }}>
        <App />
    </Context.Provider>,

    // document.getElementById('root')

);

