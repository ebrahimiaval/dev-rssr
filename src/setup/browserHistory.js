import {createBrowserHistory} from "history";
// config
import {IS_BROWSER} from "./constant";


// create a browser history
export const browserHistory = (IS_BROWSER) ? createBrowserHistory() : IS_BROWSER;
