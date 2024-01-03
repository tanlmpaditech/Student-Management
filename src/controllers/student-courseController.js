import { displayStudentOnCourse, addNewStudentToCourse, deleteStudentFromCourse, registerStudentToCourse } from '../services/student-courseService'

let getAllStudentOnCourse = async (req, res) => {
    let data = await displayStudentOnCourse(req.params);
    // console.log(req.params);
    // console.log(data);
    // let message = await updateStudent(data);
    return res.send(data);
}

let handleAddStudentToCourse = async (req, res) => {
    let data = req.body;
    let courseId = req.params.courseId;
    let studentId = data.studentId;
    let message = await addNewStudentToCourse(courseId, studentId);
    return res.status(200).json(message);
}

let handleDeleteStudentFromCourse = async (req, res) => {
    // console.log(req)
    let courseId = req.params.courseId;
    let studentId = req.body.studentId;
    if(!courseId || !studentId) {
        return res.status(200).json({
            errCode: 2,
            errMessage: 'Missing id parameter'
        })
    }

    let message = await deleteStudentFromCourse(courseId, studentId);
    return res.status(200).json(message);
}

let handleRegisterStudentToCourse = async (req, res) => {
    let courseId = req.body.courseId;
    let studentId = req.body.studentId;
    // console.log(courseId, studentId);
    let message = await registerStudentToCourse(courseId, studentId);
    return res.status(200).json(message);
}
export { getAllStudentOnCourse, handleAddStudentToCourse, handleDeleteStudentFromCourse, handleRegisterStudentToCourse } ;