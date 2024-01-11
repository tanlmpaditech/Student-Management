require('dotenv').config();
import db from '../models/index';
import bcrypt from 'bcrypt';
import { createJwt } from '../middleware/JWTAction';

const salt = bcrypt.genSaltSync(10);

const createNewAdmin = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const hassPasswordByBcrypt = await hashAdminPassword(data.password);
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
            const hassPassword = bcrypt.hashSync(password, salt);
            resolve(hassPassword);
        } catch (error) {
            reject(error);
        }
    })
}

const handleAdminLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const adminData = {};
            const isExist = await checkAdminEmail(email)
            if(isExist) {
                // resolve()
                const admin = await db.Admin.findOne({
                    attributes: ['email', 'password'],
                    where: {email: email},
                    raw: true
                })
                if(admin) {
                    // const check = bcrypt.compareSync(password, admin.password);
                    const check = admin.password === password;
                    if(check) {
                        adminData.errCode = 0;
                        adminData.errMessage = 'Login successful';
                        const payload = {
                            email: admin.email,
                            expiresIn: process.env.JWT_EXPIRES_IN
                        }
                        const token = createJwt(payload);
                        adminData.token = token;
                        
                        delete admin.password;
                    
                    } 
                    adminData.errCode = 3;
                    adminData.errMessage = 'Password incorrect';
                    
                }
            }
            adminData.errCode = 2;
            adminData.errMessage = 'Username or password incorrect';
            

            resolve(adminData);
        } catch (error) {
            adminData.errCode = 1;
            adminData.errMessage = 'Your email is not exists';
        }
    });
    // return true;
}

const checkAdminEmail = (adminEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const admin = await db.Admin.findOne({
                where: { email: adminEmail }
            })
            if(admin) {
                resolve(true);
            } 
            resolve(false);
            
        } catch (error) {
            reject(error);
        }
    });

    // return true;
}


export { handleAdminLogin, checkAdminEmail, createNewAdmin };