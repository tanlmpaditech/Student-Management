import db from '../models/index'

let displayStudentOnCourse = (courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let students = await db.Student.findAll({
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

let addNewStudentToCourse = (courseId, studentId) => {
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

let checkConflictCourseTime = (studentCourseTimeExisted, studentCourseDateExisted, courseTimeRegister, courseDateRegister) => {
    let boolean = false, count = 0;

    if(studentCourseDateExisted.includes(courseDateRegister)) {
            boolean = true;
        }
        if(boolean === true) {
            let timeRegister = courseTimeRegister.slice(0, -1).split('-');
            for(let i = 0; i < studentCourseTimeExisted.length; i++) {
                let timeExisted = studentCourseTimeExisted[i].slice(0, -1).split('-');
                for(let j = 0; j < timeExisted.length; j+=2) {
                    if(+timeRegister[0] >= +timeExisted[j] && +timeRegister[0] < +timeExisted[j+1]) {
                        count++
                    } else if(+timeRegister[1] > +timeExisted[j] && +timeRegister[1] <= +timeExisted[j+1]) {
                        count++
                    } 
                }
            }
            if(count === 0) boolean = false;
        } else {
            boolean = false;
        }
    return boolean;
}

let registerStudentToCourse = (courseId, studentId) => {
    return new Promise(async(resolve, reject) => {
        let courseQuantity, studentCourseTimeExisted, studentCourseDateExisted, registerCourseTime, registerCourseDate, numberOfStudentInCourse;
        let student = await db.Student_Course.findOne({
            where: { studentId: studentId , courseId: courseId }
        })

        let course = await db.Course.findOne({
            where: { id: courseId }
        })

        let existStudent = await db.Student.findOne({
            where: { id: studentId }
        })
        
        if (course && existStudent) {
            courseQuantity = course.quantity;
            registerCourseTime = course.time;
            registerCourseDate = course.date;
            numberOfStudentInCourse = await db.Student_Course.count({
                where: { courseId: courseId }
            })

            let studentCourseTimeExisted_ = await db.Course.findAll({
                attributes: ['time'],
                where: { date : registerCourseDate }
            })

            let studentCourseDateExisted_ = await db.Course.findAll({
                attributes: ['date'],
                where: {'$student_courses.studentId$': studentId},
                include: [{
                    model: db.Student_Course,
                }], 
            })

            studentCourseTimeExisted = studentCourseTimeExisted_.map((data) => data.dataValues.time);
            studentCourseDateExisted = studentCourseDateExisted_.map((data) => data.dataValues.date);
        }
        try {
            if(student) {
                resolve({
                    errCode: '1',
                    message: 'Student already exists in course'
                });
            } else if(!course || !existStudent) {
                resolve({
                    errCode: '2',
                    message: 'Course ID or Student ID is not exist'
                }); 
            } else if(numberOfStudentInCourse && courseQuantity && numberOfStudentInCourse >= courseQuantity) {
                resolve({
                    errCode: '4',
                    message: 'This course is full'
                }); 
            } else if(checkConflictCourseTime(studentCourseTimeExisted, studentCourseDateExisted, registerCourseTime, registerCourseDate) == true){
                resolve({
                    errCode: '5',
                    message: 'Students is conflicting course times'
                }); 
            } 
            else {
                await db.Student_Course.create({ 
                    courseId: courseId,
                    studentId: studentId
                })
                resolve({
                    errCode: '0',
                    message: 'Add student successfully'
                }); 
            }
        } catch (err) { 
            reject(err);
        }
    });
}
export { displayStudentOnCourse, addNewStudentToCourse, deleteStudentFromCourse, registerStudentToCourse }