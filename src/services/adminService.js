require('dotenv').config();
import db from '../models/index';
import bcrypt from 'bcrypt';
import { createJwt } from '../middleware/JWTAction';

const salt = bcrypt.genSaltSync(10);

const createNewAdmin = async () => {
    try {
        const hassPasswordByBcrypt = hashAdminPassword(data.password);
        await db.Admin.create({
            fullName: data.fullName,
            email: data.email,
            password: hassPasswordByBcrypt,
        })
        return ({
            errCode: '0',
            message: 'Admin created successfully'
        });
    } catch (error) {
        throw new Error (error);
    }
    
}

const hashAdminPassword = (password) => {
    try {
        const hassPassword = bcrypt.hashSync(password, salt);
        return hassPassword;
    } catch (error) {
        throw new Error (error);
    }
}

const handleAdminLogin = async (email, password) => {
    try {
        const adminData = {};
        const isExist = await checkAdminEmail(email)
        if(isExist) {
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
        

        return (adminData);
    } catch (error) {
        adminData.errCode = 1;
        adminData.errMessage = 'Your email is not exists';
    }
}

const checkAdminEmail = async (adminEmail) => {
    try {
        const admin = await db.Admin.findOne({
            where: { email: adminEmail }
        })
        if(admin) {
            return true;
        } 
        return false;
        
    } catch (error) {
        throw new Error (error);
    }
}


export { handleAdminLogin, checkAdminEmail, createNewAdmin };