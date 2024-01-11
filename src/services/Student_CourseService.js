import db from '../models/index'

const displayStudentOnCourse = async (courseId) => {
    try {
        const students = await db.Student.findAll({
            include: [{
                model: db.Student_Course,
                where: {
                    courseId: courseId.courseId,
                }
            }]
        }, );
        return students;
    } catch (error) {
        throw new Error(error);
    }
}

const addNewStudentToCourse = async (courseId, studentId) => {
    try {
        await db.Student_Course.create({ courseId: courseId, studentId: studentId })
        return ({
            errCode: '0',
            message: 'Add student successfully'
        });
    } catch (err) { 
        throw new Error(err);
    }
}

const deleteStudentFromCourse = async (courseId, studentId) => {
    try {
        const student = await db.Student_Course.findOne({
            where: { studentId: studentId, courseId: courseId }
        })
        if (student) {
            await student.destroy();
            return ({
                errCode: 0,
                message: 'Remove student successfully'
            });
        }
        return ({
            errCode: 1,
            message: 'Student not found'
        })
        
    } catch (error) {
        throw new Error(error)
    }
}

const checkConflictCourseTime = (studentCourseTimeExisted, studentCourseDateExisted, courseTimeRegister, courseDateRegister) => {
    if(!studentCourseDateExisted.includes(courseDateRegister)) {
        return false;
    }
    const timeRegister = courseTimeRegister.slice(0, -1).split('-');
    const timeExisted = studentCourseTimeExisted.map((item) => {
        return item.slice(0, -1).split('-');
    })
    return timeExisted.some((item) => {
        if(+timeRegister[0] >= +item[0] && +timeRegister[0] < +item[1]) {
            return true;
        }
        if (+timeRegister[1] > +item[0] && +timeRegister[1] <= +item[1]) {
            return true;
        }
        return false;
    })
}


const registerStudentToCourse = async (courseId, studentId) => {
    const student = await db.Student_Course.findOne({
        where: { studentId: studentId , courseId: courseId }
    })
    
    if(student) {
        return ({
            errCode: '1',
            message: 'Student already existed in course'
        });
    }

    const course = await db.Course.findOne({
        where: { id: courseId }
    })

    const existStudent = await db.Student.findOne({
        where: { id: studentId }
    })

    if(!course || !existStudent) {
        return ({
            errCode: '2',
            message: 'Course ID or Student ID is not existed'
        });
    }
    const courseQuantity = course.quantity;

    const numberOfStudentInCourse = await db.Student_Course.count({
        where: { courseId: courseId }
    })

    if(+numberOfStudentInCourse >= +courseQuantity) {
        return ({
            errCode: '3',
            message: 'This course is full'
        });
    }      

    const registerCourseTime = course.time;
    const registerCourseDate = course.date;
    const studentCourseTimeExisted_ = await db.Course.findAll({
        attributes: ['time'],
        where: { date : registerCourseDate, '$student_courses.studentId$': studentId },
        include: [{
            model: db.Student_Course,
        }], 
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
    if(checkConflictCourseTime(studentCourseTimeExisted, studentCourseDateExisted, registerCourseTime, registerCourseDate) == true) {
        return ({
            errCode: '4',
            message: 'Students is conflicting course times'
        })
    }
    try {
        await db.Student_Course.create({ 
            courseId: courseId,
            studentId: studentId
        })
        return ({
            errCode: '0',
            message: 'Add student successfully'
        });
    } catch (error) {
        throw new Error(error);
    }

}
export { displayStudentOnCourse, addNewStudentToCourse, deleteStudentFromCourse, registerStudentToCourse }