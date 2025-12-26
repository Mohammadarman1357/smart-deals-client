import { createBrowserRouter } from "react-router";
import RootLayout from '../Layouts/RootLayout.jsx';
import Home from '../components/Home.jsx';
import AuthLayout from "../Layouts/AuthLayout.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import PrivateRoute from "../provider/PrivateRoute.jsx";
import AllProducts from "../components/AllProducts.jsx";
import MyProducts from "../components/MyProducts.jsx";
import MyBids from "../components/MyBids.jsx";

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
                element: <AllProducts></AllProducts>
            },
            {
                path: '/myProducts',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/myBids',
                element: <MyBids></MyBids>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path: '/auth/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/*',
        element: <ErrorPage></ErrorPage>
    }
]);


export default router;