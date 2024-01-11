import Jwt from "jsonwebtoken";

require("dotenv").config();

const createJwt = (payload) => {
    const key = process.env.JWT_SECRET
    const token = null;
    try {
        token = Jwt.sign(payload, key);
    } catch (error) {
        console.log(error)
    }
    return token;
}

const verifyToken = (token) => {
    const key = process.env.JWT_SECRET;
    const decoded = null;
    try {
        decoded = Jwt.verify(token, key);
    } catch (error) {
        console.log(error)
    }
    return decoded;
}

const checkJWT = async (req, res, next) => {
    // const nonSecurePaths = ['/', '/login'];
    // if(nonSecurePaths.includes(req.path)) return next();
    // next();

    const cookies = req.cookies;
    if(cookies && cookies.jwt) {
        const token = cookies.jwt;
        const decoded = verifyToken(token);
        if(decoded) {
            req.admin = decoded;
            // console.log(data);
            next();
        } 
        return req.status(401).json({
            errCode: 1,
            errMessage: "Admin is not logged in"
        })
        
        // console.log(cookies.jwt);
    }
    return req.status(401).json({
        errCode: 1,
        errMessage: "Admin is not logged in"
    })

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