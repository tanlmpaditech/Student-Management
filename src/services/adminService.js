require('dotenv').config();
import db from '../models/index';
import bcrypt from 'bcrypt';
import { createJwt } from '../middleware/JWTAction';

const salt = bcrypt.genSaltSync(10);

let createNewAdmin = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let hassPasswordByBcrypt = await hashAdminPassword(data.password);
            await db.Admin.create({
                fullName: data.fullName,
                email: data.email,
                password: hassPasswordByBcrypt,
            })
            resolve({
                errCode: '0',
                message: 'Admin created successfully'
            });
        } catch (error) {
            reject(error);
        }
    })
    
}

const hashAdminPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hassPassword = bcrypt.hashSync(password, salt);
            resolve(hassPassword);
        } catch (error) {
            reject(error);
        }
    })
}

let handleAdminLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let adminData = {};
            let isExist = await checkAdminEmail(email)
            if(isExist) {
                // resolve()
                let admin = await db.Admin.findOne({
                    attributes: ['email', 'password'],
                    where: {email: email},
                    raw: true
                })
                if(admin) {
                    // let check = bcrypt.compareSync(password, admin.password);
                    let check = admin.password === password;
                    if(check) {
                        adminData.errCode = 0;
                        adminData.errMessage = 'Login successful';
                        let payload = {
                            email: admin.email,
                            expiresIn: process.env.JWT_EXPIRES_IN
                        }
                        const token = createJwt(payload);
                        adminData.token = token;
                        // console.log(admin);
                        // console.log(token);

                        delete admin.password;
                        // adminData.admin = admin;
                        // console.log(admin.email);
                    } else {
                        adminData.errCode = 3;
                        adminData.errMessage = 'Password incorrect';
                    }
                }
            } else {
                adminData.errCode = 2;
                adminData.errMessage = 'Username or password incorrect';
            }

            resolve(adminData);
        } catch (error) {
            adminData.errCode = 1;
            adminData.errMessage = 'Your email is not exists';
        }
    });
    // return true;
}

let checkAdminEmail = (adminEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let admin = await db.Admin.findOne({
                where: { email: adminEmail }
            })
            if(admin) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });

    // return true;
}


export { handleAdminLogin, checkAdminEmail, createNewAdmin };