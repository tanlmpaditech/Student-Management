import { handleAdminLogin } from '../services/adminService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing email or password',
            admin: adminData.admin ? adminData.admin : {}
        })
    }

    let adminData = await handleAdminLogin(email, password);

    return res.status(200).json({
        adminData
    })
    // return res.send('Hello')
}

export default handleLogin;
