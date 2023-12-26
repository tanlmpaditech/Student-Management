import db from '../models/index'

let displayStudentOnCourse = (courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let students = await db.Student.findAll({
                include: [{
                    model: db.Student_Course,
                    where: {
                        courseId: courseId.courseId
                    }
                }]
            });
            resolve(students);
        } catch (error) {
            reject(error);
        }
    });
}

let addNewStudentToCourse = async (courseId, studentId) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Student_Course.create({ courseId: courseId, studentId: studentId })
            resolve({
                errCode: '0',
                message: 'Add student successfully'
            });
        } catch (err) { 
            reject(err);
        }
    });
}

let deleteStudentFromCourse = (courseId, studentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let student = await db.Student_Course.findOne({
                where: { studentId: studentId, courseId: courseId }
            })
            if (student) {
                await student.destroy();
                resolve({
                    errCode: 0,
                    message: 'Remove student successfully'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'Student not found'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}


export { displayStudentOnCourse, addNewStudentToCourse, deleteStudentFromCourse }