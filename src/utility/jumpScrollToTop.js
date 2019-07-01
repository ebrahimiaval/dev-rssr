import {$} from "../config/jquery";


/**
 * for reset scroll and got to top of page when redirect
 */
if (typeof window !== 'undefined')
    window.jumpScrollToTop_offset = 0;
//
export const jumpScrollToTop = () => {
    if (typeof window === "undefined")
        return;

    // time out is for ensure new component script loaded
    setTimeout(() => $('html,body').animate({scrollTop: window.jumpScrollToTop_offset}, 'fast'), 200);
}