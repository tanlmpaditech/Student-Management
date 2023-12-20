import db from '../models/index'

let displayStudentOnCourse = (courseId) => {
    // console.log(db.Student_Course.findAll({raw: true}));
    return new Promise(async (resolve, reject) => {
        try {
            let students = await db.Student_Course.find({where: {id: courseId}}, {raw: true});
            // let students = await db.Student_Course.findAll({raw: true});
            
            resolve(students); 
        } catch (error) {
            reject(error);
        }
    });
}

let addNewStudentToCourse = async (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Student_Course.create({
                // studentId: data.studentId,
                // fullName: data.fullName,
                // email: data.email,
                // address: data.address,
                // phoneNumber: data.phoneNumber,
                // gender: data.gender,
                // courseId: data.courseId,
                
                studentId: data.studentId,
            })
            resolve({
                errCode: '0',
                message: 'Add student successfully'
            });
        } catch (err) { 
            reject(err);
        }
    });
}

let deleteStudentFromCourse = (studentId) => {
// console.log(courseId);
    return new Promise(async (resolve, reject) => {
        try {
            let student = await db.Student_Course.findOne({
                where: { studentId: studentId }
            })
            // console.log(course);
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