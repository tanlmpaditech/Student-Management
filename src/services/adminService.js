import db from '../models/index';

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
                    if(password === admin.password) {
                        adminData.errCode = 0;
                        adminData.errMessage = 'Login successful';
                        console.log(admin);
                        delete admin.password;
                        adminData.admin = admin;
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


export { handleAdminLogin, checkAdminEmail };