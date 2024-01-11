import { displayCourse, createNewCourse, deleteCourse, updateCourse } from '../services/courseService'

const getAllCourses = async (req, res) => {
    const data = await displayCourse();
    // const message = await updateStudent(data);
    return res.send(data);
}

const handleCreateCourse = async (req, res) => {
    const data = req.body;
    const message = await createNewCourse(data);
    console.log(data);
    return res.status(200).json(message);
}

const handleEditCourse = async (req, res) => {
    const data = req.body;
    const message = await updateCourse(data);
    return res.status(200).json(message);
}

const handleDeleteCourse = async (req, res) => {
    if(!req.body.id) {
        return res.status(200).json({
            errCode: 2,
            errMessage: 'Missing id parameter'
        })
    }

    const message = await deleteCourse(req.body.id);
    return res.status(200).json(message);
}
export { getAllCourses, handleCreateCourse, handleDeleteCourse, handleEditCourse } ;