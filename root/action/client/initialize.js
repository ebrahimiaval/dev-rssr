import localStorageSetup from "../../config/localStorage";
// public jQuery plugins
import 'bootstrap-v4-rtl';
import "../../utility/samplejQueryPlugin";
// vendor styles
import 'react-toastify/dist/ReactToastify.min.css';
import "../../vendorStyle/bootstrap/bootstrap-rtl.scss";
import "../../vendorStyle/animate.scss";

// define public structur and varibales
export const initialize = function () {
    // define localstorage variables
    localStorageSetup();
}