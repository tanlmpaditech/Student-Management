
import  { displayStudent, updateStudent, deleteStudent, createNewStudent } from '../services/studentService';


let getHomePage = async (req, res) => {
    console.log('Cookies: ', req.cookies)
    // console.log('Signed Cookies: ', req.signedCookies)
    // res.cookie('test', 'test');
    return res.render("homepage.ejs");
}

let handleCreateStudent = async (req, res) => {
    let data = req.body;
    let message = await createNewStudent(data);
    console.log(data);
    return res.status(200).json(message);
}

let getAllStudents = async (req, res) => {
    let data = await displayStudent();
    // let message = await updateStudent(data);
    return res.send(data);
}   

let handleEditStudent = async (req, res) => {
    let data = req.body;
    let message = await updateStudent(data);
    return res.status(200).json(message);
}

let handleDeleteStudent = async (req, res) => {
    console.log(req)
    if(!req.body.id) {
        return res.status(200).json({
            errCode: 2,
            errMessage: 'Missing id parameter'
        })
    }

    let message = await deleteStudent(req.body.id);
    return res.status(200).json(message);
}

export { getHomePage, handleCreateStudent, getAllStudents, handleEditStudent, handleDeleteStudent };