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
        
        // console.log(studentCourseTime);
        // console.log(registerCourseTime);
        // console.log(studentCourseTime.includes(registerCourseTime))

        let checkConflictCourseTime = () => {
            let boolean = false;
            let time;
            studentCourseTime.forEach((item) => {
                let courseTimeExist = item.split(' ');
                if(courseTimeExist.includes(courseTimeRegisterSplit[1])) {
                    boolean = true;
                }
                if(boolean === true) {
                    time = courseTimeExist.filter((item) => 
                        item.includes(courseTimeRegisterSplit[1])
                    )
                    // console.log(time);
                    for(let i = 0; i < time.length; i+=2) {
                        // console.log(courseTimeExist[i]);
                        let timeExisted = courseTimeExist[i].slice(0, -1).split('-');
                        let timeRegister = courseTimeRegisterSplit[0].slice(0, -1).split('-');
                        // console.log('r0: ', timeRegister[0], 'r1: ', timeRegister[1]);
                        // console.log('timeExisted: ', timeExisted);
                        // console.log(+timeRegister[0] >= +timeExisted[0])
                        // console.log(+timeRegister[0] < +timeExisted[1])
                        // console.log(+timeRegister[1] > +timeExisted[0]);
                        // console.log(+timeRegister[1] <= +timeExisted[1]);
                        for(let j = 0; j < timeExisted.length; j+=2) {
                            // console.log('timeExisted', j, timeExisted[j]);
                            // console.log('timeExisted', j+1, timeExisted[j+1]);
                            // if((timeRegister[0] >= timeExisted[j]) && (timeRegister[0] < timeExisted[j+1])) {
                            //     boolean = true;
                            //     // console.log(boolean);
                            // } else if((timeRegister[0] < timeExisted[j]) && (timeRegister[1] > timeExisted[j])) {
                            //     console.log(boolean);
                            //     boolean = true;
                            // } else {
                            //     boolean = false;
                            // }

                            // if(timeRegister[1] <= timeExisted[j] || timeRegister[0] >= timeExisted[j+1]) {
                            //     boolean = false
                            // } else {
                            //     boolean = true
                            // }
                            // 9-12 8-10
                            
                            if(+timeRegister[0] >= +timeExisted[j] && +timeRegister[0] < +timeExisted[j+1]) {
                                boolean = true;
                            } else if(+timeRegister[1] > +timeExisted[j] && +timeRegister[1] <= +timeExisted[j+1]) {
                                boolean = true;
                            } else {
                                boolean = false;
                            }
                        }
                    }
                } else {
                    boolean = false;
                }
                
            })
            // console.log(boolean);
            return boolean;
        }
        // console.log(checkConflictCourseTime());
        // checkConflictCourseTime();
        try {
            if(student) {
                resolve({
                    errCode: '1',
                    message: 'Student already exists in course'
                });
            } else if(!course) {
                resolve({
                    errCode: '2',
                    message: 'Course ID is not exist'
                }); 
            }
            else if(!existStudent)  {
                resolve({
                    errCode: '3',
                    message: 'Student ID is not exist'
                }); 
            } else if(numberOfStudentInCourse >= courseQuantity) {
                resolve({
                    errCode: '4',
                    message: 'This course is full'
                }); 
            } else if(checkConflictCourseTime()){
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