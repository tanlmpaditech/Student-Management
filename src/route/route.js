import express from 'express';
import { getHomePage, handleCreateStudent, getAllStudents, handleEditStudent, handleDeleteStudent } from '../controllers/studentController';
import { getAllCourses, handleCreateCourse, handleDeleteCourse } from '../controllers/courseController';
import { handleLogin, handleCreateAdmin } from '../controllers/adminController';
import { getAllStudentOnCourse, handleAddStudentToCourse, handleDeleteStudentFromCourse } from '../controllers/student-courseController'

let router = express.Router({mergeParams:true});

let initWebRouter = (app) => {
    router.get('/', getHomePage);
    
    router.get('/students', getAllStudents);
    router.post('/create-student', handleCreateStudent);
    router.put('/edit-student', handleEditStudent);
    router.delete('/delete-student', handleDeleteStudent);

    router.get('/courses', getAllCourses);
    router.post('/create-course', handleCreateCourse);
    router.delete('/delete-course', handleDeleteCourse);

    router.get('/course/:courseId', getAllStudentOnCourse);
    router.post('/add-student-to-course/:courseId', handleAddStudentToCourse);
    router.delete('/delete-student-from-course/:courseId', handleDeleteStudentFromCourse);

    router.post('/login', handleLogin);
    router.post('/register', handleCreateAdmin);
    return app.use('/', router)
}

export default initWebRouter;