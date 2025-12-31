import { createBrowserRouter } from "react-router";
import RootLayout from '../Layouts/RootLayout.jsx';
import Home from '../components/Home.jsx';
import AuthLayout from "../Layouts/AuthLayout.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import PrivateRoute from "../provider/PrivateRoute.jsx";
import AllProducts from "../components/AllProducts.jsx";
import MyBids from "../components/MyBids.jsx";
import ProductDetails from "../components/ProductDetails/ProductDetails.jsx";
import CreateAProduct from "../components/CreateAProduct/CreateAProduct.jsx";

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
                loader: () => fetch('http://localhost:3000/products/'),
                element: <PrivateRoute>
                    <AllProducts></AllProducts>
                </PrivateRoute>
            },
            {
                path: '/myBids',
                element: <PrivateRoute>
                    <MyBids></MyBids>
                </PrivateRoute>
            },
            {
                path: '/productDetails/:id',
                loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`),
                element: <PrivateRoute>
                    <ProductDetails></ProductDetails>
                </PrivateRoute>
            },
            {
                path: '/createAProduct',
                element: <PrivateRoute>
                    <CreateAProduct></CreateAProduct>
                </PrivateRoute>
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