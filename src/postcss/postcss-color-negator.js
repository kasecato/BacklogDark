const postcss = require('postcss')
const Color = require('color')

module.exports = postcss.plugin('postcss-color-negator', function () {

    const HEX_COLOR = /(#[\da-f]+)/i;
    const RGB_COLOR = /(rgba?\(\s*\d+,\s*\d+,\s*\d+,?\s*\.?\d*\))/i;
    const HSL_COLOR = /(hsla?\(\s*\d+,\s*\d+,\s*\d+,?\s*\.?\d*\))/i;

    const getHexColor = (value) => HEX_COLOR.exec(value);
    const getRgbColor = (value) => RGB_COLOR.exec(value);
    const getHslColor = (value) => HSL_COLOR.exec(value);
    const hasColor = (value) => {
        return getHexColor(value)
            || getRgbColor(value)
            || getHslColor(value)
    }

    const removeNonColorRule = (decl) => {
        if (!hasColor(decl.value)) {
            decl.remove();
        }
    }
    
    const negateColor = (color) => {
        const c = new Color(color);
        return c.negate();
    }

    /*------------------------------------------------------------------------------------------------------------------
     * PostCSS Entry Point
     *----------------------------------------------------------------------------------------------------------------*/
    return (root) => {

        root.walkDecls(removeNonColorRule);

        root.replaceValues(HEX_COLOR||RGB_COLOR||HSL_COLOR, {}, negateColor);

        return root;
    }

})