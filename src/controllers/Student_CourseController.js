import { displayStudentOnCourse, addNewStudentToCourse, deleteStudentFromCourse, registerStudentToCourse } from '../services/Student_CourseService'

const getAllStudentOnCourse = async (req, res) => {
    const data = await displayStudentOnCourse(req.params);
    return res.send(data);
}

const handleAddStudentToCourse = async (req, res) => {
    const data = req.body;
    const courseId = req.params.courseId;
    const studentId = data.studentId;
    const message = await addNewStudentToCourse(courseId, studentId);
    return res.status(200).json(message);
}

const handleDeleteStudentFromCourse = async (req, res) => {
    // console.log(req)
    const courseId = req.params.courseId;
    const studentId = req.body.studentId;
    if(!courseId || !studentId) {
        return res.status(200).json({
            errCode: 2,
            errMessage: 'Missing id parameter'
        })
    }

    const message = await deleteStudentFromCourse(courseId, studentId);
    return res.status(200).json(message);
}

const handleRegisterStudentToCourse = async (req, res) => {
    const courseId = req.body.courseId;
    const studentId = req.body.studentId;
    const message = await registerStudentToCourse(courseId, studentId);
    return res.status(200).json(message);
}
export { getAllStudentOnCourse, handleAddStudentToCourse, handleDeleteStudentFromCourse, handleRegisterStudentToCourse } ;