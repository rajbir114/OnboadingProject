import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Customer } from "./components/Customer";
import { Product } from "./components/Product";
import { Sale } from "./components/Sale";
import { Store } from "./components/Store";
import { Home } from "./components/Home";
import { AddProduct } from "./components/AddProduct";
import { AddCustomer } from "./components/AddCustomer";
import { AddSale } from "./components/AddSale";
import { AddStore } from "./components/AddStore";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/customer',
        element: <Customer/>
    },
    {
        path: '/store',
        element: <Store/>
    },
    {
        path: '/sale',
        element: <Sale/>
    },
    {
        path: '/product',
        element: <Product/>
    },
    {
        path: '/add-product',
        element: <AddProduct/>
    },
    {
        path: '/add-customer',
        element: <AddCustomer/>
    },
    {
        path: '/add-sale',
        element: <AddSale/>
    },
    {
        path: '/add-store',
        element: <AddStore/>
    },
    {
        path: '/home',
        element: <Home/>
    }
];

export default AppRoutes;
