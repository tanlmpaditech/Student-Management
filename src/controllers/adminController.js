import { handleAdminLogin, createNewAdmin } from '../services/adminService';
// import { CookieParseOptions } from 'cookie-parser';
// import bcrypt from 'bcrypt';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let adminData = await handleAdminLogin(email, password);

    res.cookie('jwt', adminData.token, { httpOnly: false })
    if(!email || !password) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing email or password',
            admin: adminData.admin ? adminData.admin : {}
            // admin: adminData.adminData.admin
        })
    }
    return res.status(200).json({ adminData })
    // return res.send('Hello')
}

let handleCreateAdmin = async (req, res) => {
    let data = req.body;
    let message = await createNewAdmin(data);
    console.log(data);
    return res.status(200).json(message);
}

export {handleLogin, handleCreateAdmin};
