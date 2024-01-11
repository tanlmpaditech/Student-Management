import db from '../models/index'

const displayStudentOnCourse = (courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const students = await db.Student.findAll({
                include: [{
                    model: db.Student_Course,
                    where: {
                        courseId: courseId.courseId,
                    }
                }]
            }, );
            resolve(students);
        } catch (error) {
            reject(error);
        }
    });
}

const addNewStudentToCourse = (courseId, studentId) => {
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

const deleteStudentFromCourse = (courseId, studentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const student = await db.Student_Course.findOne({
                where: { studentId: studentId, courseId: courseId }
            })
            if (student) {
                await student.destroy();
                resolve({
                    errCode: 0,
                    message: 'Remove student successfully'
                });
            }
            resolve({
                errCode: 1,
                message: 'Student not found'
            })
            
        } catch (error) {
            reject(error)
        }
    })
}

const checkConflictCourseTime = (studentCourseTimeExisted, studentCourseDateExisted, courseTimeRegister, courseDateRegister) => {
    const check = {boolean: false, conflictTime: false};
    if(studentCourseDateExisted.includes(courseDateRegister)) {
        check.boolean = true;
    }
    if(check.boolean === true) {
        const timeRegister = courseTimeRegister.slice(0, -1).split('-');
        const timeExisted = studentCourseTimeExisted.map((item) => {
            return item.slice(0, -1).split('-');
        })
        timeExisted.map((item) => {
            if(+timeRegister[0] >= +item[0] && +timeRegister[0] < +item[1]) {
                check.conflictTime = true;
            }
            if (+timeRegister[1] > +item[0] && +timeRegister[1] <= +item[1]) {
                check.conflictTime = true;
            }
        })
        check.boolean = check.conflictTime;
    }
    return check.boolean;
}

const registerStudentToCourse = (courseId, studentId) => {
    return new Promise(async (resolve, reject) => {

        const student = await db.Student_Course.findOne({
            where: { studentId: studentId , courseId: courseId }
        })
        
        if(student) {
            resolve({
                errCode: '1',
                message: 'Student already existed in course'
            });
            return;
        }

        const course = await db.Course.findOne({
            where: { id: courseId }
        })

        const existStudent = await db.Student.findOne({
            where: { id: studentId }
        })

        if(!course || !existStudent) {
            resolve({
                errCode: '2',
                message: 'Course ID or Student ID is not existed'
            });
            return; 
        }
            const courseQuantity = course.quantity;

            const numberOfStudentInCourse = await db.Student_Course.count({
                where: { courseId: courseId }
            })

            if(+numberOfStudentInCourse >= +courseQuantity) {
                resolve({
                    errCode: '3',
                    message: 'This course is full'
                });
                return;
            }      

            const registerCourseTime = course.time;
            const registerCourseDate = course.date;
            const studentCourseTimeExisted_ = await db.Course.findAll({
                attributes: ['time'],
                where: { date : registerCourseDate }
            })

            const studentCourseDateExisted_ = await db.Course.findAll({
                attributes: ['date'],
                where: {'$student_courses.studentId$': studentId},
                include: [{
                    model: db.Student_Course,
                }], 
            })
            const studentCourseTimeExisted = studentCourseTimeExisted_.map((data) => data.dataValues.time);
            const studentCourseDateExisted = studentCourseDateExisted_.map((data) => data.dataValues.date);
            checkConflictCourseTime(studentCourseTimeExisted, studentCourseDateExisted, registerCourseTime, registerCourseDate);

            if(checkConflictCourseTime(studentCourseTimeExisted, studentCourseDateExisted, registerCourseTime, registerCourseDate) == true) {
                resolve({
                    errCode: '4',
                    message: 'Students is conflicting course times'
                })
                return;
            }

            await db.Student_Course.create({ 
                courseId: courseId,
                studentId: studentId
            })
            resolve({
                errCode: '0',
                message: 'Add student successfully'
            });
    });
}
export { displayStudentOnCourse, addNewStudentToCourse, deleteStudentFromCourse, registerStudentToCourse }