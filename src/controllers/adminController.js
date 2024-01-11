import { handleAdminLogin, createNewAdmin } from '../services/AdminService';
// import { CookieParseOptions } from 'cookie-parser';
// import bcrypt from 'bcrypt';

const handleLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const adminData = await handleAdminLogin(email, password);

    // res.cookie('jwt', adminData.token, { httpOnly: true, maxAge: 60*60*1000 })
    if(!email || !password) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing email or password',
            admin: adminData.admin ? adminData.admin : {}
        })
    }
    return res.status(200).json({ adminData })
}

const handleCreateAdmin = async (req, res) => {
    const data = req.body;
    const message = await createNewAdmin(data);
    return res.status(200).json(message);
}



export {handleLogin, handleCreateAdmin};
