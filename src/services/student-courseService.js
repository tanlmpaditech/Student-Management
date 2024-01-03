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

let checkConflictCourseTime = (studentCourseTime, courseTimeRegisterSplit) => {
    let boolean = false;
    let time;
    studentCourseTime.forEach((item) => {
        let courseTimeExist = item.split(' ');
        console.log(courseTimeExist);
        if(courseTimeExist.includes(courseTimeRegisterSplit[1])) {
            boolean = true;
        }
        if(boolean === true) {
            time = courseTimeExist.filter((item) => 
                item.includes(courseTimeRegisterSplit[1])
            )
            for(let i = 0; i < time.length; i+=2) {
                let timeExisted = courseTimeExist[i].slice(0, -1).split('-');
                let timeRegister = courseTimeRegisterSplit[0].slice(0, -1).split('-');
                for(let j = 0; j < timeExisted.length; j+=2) {
                    
                    if(+timeRegister[0] >= +timeExisted[j] && +timeRegister[0] < +timeExisted[j+1]) {
                        boolean = true;
                    } else if(+timeRegister[1] > +timeExisted[j] && +timeRegister[1] <= +timeExisted[j+1]) {
                        boolean = true;
                    } 
                    else {
                        boolean = false;
                    }
                }
            }
        } else {
            boolean = false;
        }
    })
    return boolean;
}

let registerStudentToCourse = (courseId, studentId) => {
    let courseQuantity, registerCourseTime, numberOfStudentInCourse, courseTime, studentCourseTime, courseTimeRegisterSplit
    return new Promise(async(resolve, reject) => {
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
            numberOfStudentInCourse = await db.Student_Course.count({
                where: { courseId: courseId }
            })

            courseTime = await db.Course.findAll({
                attributes: ['time'],
                where: {'$student_courses.studentId$': studentId},
                include: [{
                    model: db.Student_Course,
                }], 
            })

            studentCourseTime = courseTime.map((data) => data.dataValues.time);
            courseTimeRegisterSplit = registerCourseTime.split(' ');
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
            } else if(numberOfStudentInCourse >= courseQuantity) {
                resolve({
                    errCode: '4',
                    message: 'This course is full'
                }); 
            } else if(checkConflictCourseTime(studentCourseTime, courseTimeRegisterSplit)){
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