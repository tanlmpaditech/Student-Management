import Jwt from "jsonwebtoken";

require("dotenv").config();

const createJwt = (payload) => {
    // let payload = { email }
    let key = process.env.JWT_SECRET

    let token = null;
    try {
        token = Jwt.sign(payload, key);
        // console.log(token);
    } catch (error) {
        console.log(error)
    }
    // console.log(token)
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try {
        let decoded = Jwt.verify(token, key);
        data = decoded;
    } catch (error) {
        console.log(error)
        return data;
    }
    // Jwt.verify(token, key, function (err, decoded) {
    //     if(err) {
    //         console.log(err)
    //         return data;
    //     }
    //     console.log(decoded);
    //     return decoded;
    // })
}



export { createJwt, verifyToken };