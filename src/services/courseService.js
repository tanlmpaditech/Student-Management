import db from '../models/index'

const displayCourse = async () => {
    try {
        const courses = await db.Course.findAll({raw: true});
        return (courses); 
    } catch (error) {
        throw new Error (error);
    }
}

const createNewCourse = async (data) => {
    try {
        await db.Course.create({
            courseId: data.courseId,
            courseName: data.courseName,
            teacherName: data.teacherName,
            time: data.time,
        })
        return ({
            errCode: '0',
            message: 'Course created successfully'
        });
    } catch (err) { 
        throw new Error (err);
    }
}

const deleteCourse = async (courseId) => {
    try {
        const course = await db.Course.findOne({
            where: { id: courseId }
        })
        if (course) {
            await course.destroy();
            return ({
                errCode: 0,
                message: 'Course deleted successfully'
            });
        }
        return ({
            errCode: 1,
            message: 'Course not found'
        })
        
    } catch (error) {
        throw new Error (error)
    }
}

const updateCourse = async (data) => {
    try {
        if(!data.id) {
            return ({
                errCode: 2,
                message: 'Missing id parameter',
            })
        }
        const course = await db.Course.findOne({ 
            where: { id: data.id }
        });
        if(course) {
            course.update(data);
            course.save();
            return ({
                errCode: '0',
                message: 'Course updated successfully'
            })
        }
        return ({
            errCode: '1',
            message: 'Course not found'
        });
        
    } catch (error) {
        throw new Error (error);
    }
}


export { displayCourse, createNewCourse, deleteCourse, updateCourse }