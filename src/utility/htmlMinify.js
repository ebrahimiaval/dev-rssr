/**
 *  remove space between html template
 */
export const htmlMinify = function (template) {
    return template.replace(/(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g, "$1$3");
}
