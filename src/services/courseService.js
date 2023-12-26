import db from '../models/index'

let displayCourse = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let courses = await db.Course.findAll({raw: true});
            resolve(courses); 
        } catch (error) {
            reject(error);
        }
    });
}

let createNewCourse = async (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Course.create({
                courseId: data.courseId,
                courseName: data.courseName,
                teacherName: data.teacherName,
                time: data.time,
            })
            resolve({
                errCode: '0',
                message: 'Course created successfully'
            });
        } catch (err) { 
            reject(err);
        }
    });
}

let deleteCourse = (courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let course = await db.Course.findOne({
                where: { id: courseId }
            })
            if (course) {
                await course.destroy();
                resolve({
                    errCode: 0,
                    message: 'Course deleted successfully'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'Course not found'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateCourse = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id) {
                resolve({
                    errCode: 2,
                    message: 'Missing id parameter',
                })
            }
            let course = await db.Course.findOne({ 
                where: { id: data.id }
            });
            if(course) {
                course.update(data);
                course.save();
                resolve({
                    errCode: '0',
                    message: 'Course updated successfully'
                })
            } else {
                resolve({
                    errCode: '1',
                    message: 'Course not found'
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}


export { displayCourse, createNewCourse, deleteCourse, updateCourse }