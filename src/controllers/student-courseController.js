import { displayStudentOnCourse, addNewStudentToCourse, deleteStudentFromCourse } from '../services/student-courseService'

let getAllStudentOnCourse = async (req, res) => {
    let data = await displayStudentOnCourse(req.params);
    // let message = await updateStudent(data);
    return res.send(data);
}

let handleAddStudentToCourse = async (req, res) => {
    let data = req.body;
    let message = await addNewStudentToCourse(data);
    console.log(data);
    return res.status(200).json(message);
}

let handleDeleteStudentFromCourse = async (req, res) => {
    // console.log(req)
    if(!req.params.id) {
        return res.status(200).json({
            errCode: 2,
            errMessage: 'Missing id parameter'
        })
    }

    let message = await deleteStudentFromCourse(req.params.id);
    return res.status(200).json(message);
}
export { getAllStudentOnCourse, handleAddStudentToCourse, handleDeleteStudentFromCourse } ;