export const getToken = (req) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    if(token === undefined) {
        return "No token found in the header"
    } else {
        return token;
    }
}