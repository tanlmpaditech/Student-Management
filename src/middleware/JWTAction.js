import Jwt from "jsonwebtoken";

require("dotenv").config();

const createJwt = (payload) => {
    let key = process.env.JWT_SECRET
    let token = null;
    try {
        token = Jwt.sign(payload, key);
    } catch (error) {
        console.log(error)
    }
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = Jwt.verify(token, key);
    } catch (error) {
        console.log(error)
    }
    return decoded;
}

let checkJWT = async (req, res, next) => {
    // const nonSecurePaths = ['/', '/login'];
    // if(nonSecurePaths.includes(req.path)) return next();
    // next();

    let cookies = req.cookies;
    if(cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyToken(token);
        if(decoded) {
            req.admin = decoded;
            // console.log(data);
            next();
        } else {
            return req.status(401).json({
                errCode: 1,
                errMessage: "Admin is not logged in"
            })
        }
        // console.log(cookies.jwt);
    } else {
        return req.status(401).json({
            errCode: 1,
            errMessage: "Admin is not logged in"
        })
    }
    // console.log(cookies);
}

// const checkAdmin = (req, res) => {
//     if(req.admin) {

//     } else {
//         return req.status(401).json({
//             errCode: 1,
//             errMessage: "Admin is not logged in"
//         })
//     }
// }

export { createJwt, verifyToken, checkJWT };