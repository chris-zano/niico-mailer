
/**
 * This function converts a string ( 'hello' ) to a capitalised string ( 'Hello' )
 * @param {String} str the string to be capitalised
 * @returns capitalised string
 */
export const capitalizeFirstChar = (str) => {
    try {
        if (!str) return str;

        return str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().slice(1);
    }
    catch (error) {
        console.error({ capitalise_error: error });
        return str;
    }
}

// console.log(capitalizeFirstChar('😢😢ello'))