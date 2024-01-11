
import  { displayStudent, updateStudent, deleteStudent, createNewStudent } from '../services/StudentService';


const getHomePage = async (req, res) => {
    console.log('Cookies: ', req.cookies)
    return res.render("homepage.ejs");
}

const handleCreateStudent = async (req, res) => {
    const data = req.body;
    const message = await createNewStudent(data);
    return res.status(200).json(message);
}

const getAllStudents = async (req, res) => {
    const data = await displayStudent();
    // const message = await updateStudent(data);
    return res.send(data);
}   

const handleEditStudent = async (req, res) => {
    const data = req.body;
    const message = await updateStudent(data);
    return res.status(200).json(message);
}

const handleDeleteStudent = async (req, res) => {
    if(!req.body.id) {
        return res.status(200).json({
            errCode: 2,
            errMessage: 'Missing id parameter'
        })
    }

    const message = await deleteStudent(req.body.id);
    return res.status(200).json(message);
}

export { getHomePage, handleCreateStudent, getAllStudents, handleEditStudent, handleDeleteStudent };