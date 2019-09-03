// utility
import {route} from "./route";
// component
import Error404 from "../App/Error404/Error404";
import Home from "../App/Home/Home";
import Post from "../App/Post/Post";


export const routeMap = [
    {
        path: route.home,
        component: Home,
        exact: true
    },
    {
        path: route.post(),
        component: Post
    },

    // ------- E404 -------
    {
        path: "*",
        component: Error404,
        status: 404
    }
];
