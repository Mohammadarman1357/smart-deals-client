import { createBrowserRouter } from "react-router";
import RootLayout from '../Layouts/RootLayout.jsx';
import Home from '../components/Home/Home.jsx';
import AllProducts from '../components/AllProducts/AllProducts.jsx';
import AuthLayout from "../Layouts/AuthLayout.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/allProducts',
                Component: AllProducts
            },
        ]
    },
    {
        path:'/auth',
        element:<AuthLayout></AuthLayout>,
        children:[
            {
                path:'/auth/login',
                element:<Login></Login>
            },
            {
                path:'/auth/register',
                element:<Register></Register>
            }
        ]
    },
]);


export default router;