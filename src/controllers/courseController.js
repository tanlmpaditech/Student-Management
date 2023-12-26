import { displayCourse, createNewCourse, deleteCourse, updateCourse } from '../services/courseService'

let getAllCourses = async (req, res) => {
    let data = await displayCourse();
    // let message = await updateStudent(data);
    return res.send(data);
}

let handleCreateCourse = async (req, res) => {
    let data = req.body;
    let message = await createNewCourse(data);
    console.log(data);
    return res.status(200).json(message);
}

let handleEditCourse = async (req, res) => {
    let data = req.body;
    let message = await updateCourse(data);
    return res.status(200).json(message);
}

let handleDeleteCourse = async (req, res) => {
    if(!req.body.id) {
        return res.status(200).json({
            errCode: 2,
            errMessage: 'Missing id parameter'
        })
    }

    let message = await deleteCourse(req.body.id);
    return res.status(200).json(message);
}
export { getAllCourses, handleCreateCourse, handleDeleteCourse, handleEditCourse } ;