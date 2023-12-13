
import  { displayStudent, getStudentById, updateStudent, deleteStudent, createNewStudent } from '../services/studentService';


let getHomePage = async (req, res) => {
    return res.render("homepage.ejs");
}

let createStudent = async (req, res) => {
    await createNewStudent(req.body);
    return res.status(200).json(message);
}

let getAllStudents = async (req, res) => {
    let data = await displayStudent();
    return res.send(data);
}   

let handleEditStudent = async (req, res) => {
    let data = req.body;
    let message = await updateStudent(data);
    return res.status(200).json(message);
}

let handleDeleteStudent = async (req, res) => {
    if(!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing id parameter'
        })
    }

    let message = await deleteStudent(req.body.id);
    return res.status(200).json(message);
}

export { getHomePage, createStudent, getAllStudents, handleEditStudent, handleDeleteStudent };