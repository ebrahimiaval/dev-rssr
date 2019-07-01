// utility
import {route} from "./route";
// component
import E404 from "../App/E404/E404";
import Home from "../App/Home/Home";


export const routeMap = [
    {
        path: route.home,
        component: Home,
        exact: true
    },

    // ------- E404 -------
    {
        path: "*",
        component: E404,
        status: 404
    }
];
