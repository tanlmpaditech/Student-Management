
import db from '../models/index'

const displayStudent = async () => {
    try {
        const students = await db.Student.findAll({raw: true});
        return students; 
    } catch (error) {
        throw new Error (error);
    }
}

const getStudentById = async (studentId) => {
    try {
        const student = await db.Student.findOne({
            where: { id: studentId },
            raw: true
        })
        if(student) {
            return student;
        }
        return ([]);
            
    } catch (error) {
        throw new Error (error);
    }
}

const updateStudent = async (data) => {
    try {
        if(!data.id) {
            return ({
                errCode: 2,
                message: 'Missing id parameter',
            })
        }
        const student = await db.Student.findOne({ 
            where: { id: data.id }
        });
        if(student) {
            student.update(data);
            student.save();
            return ({
                errCode: '0',
                message: 'Student updated successfully'
            })
        }
        return ({
            errCode: '1',
            message: 'Student not found'
        });
        
    } catch (error) {
        throw new Error (error);
    }
}

const createNewStudent = async (data) => {
    try {
        await db.Student.create({
            studentId: data.studentId,
            fullName: data.fullName,
            email: data.email,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
        })
        return ({
            errCode: '0',
            message: 'Student created successfully'
        });
    } catch (err) { 
        throw new Error (err);
    }
}

const deleteStudent = async (studentId) => {
    try {
        const student = await db.Student.findOne({
            where: { id: studentId }
        })
        if (student) {
            await student.destroy();
            return ({
                errCode: 0,
                message: 'Student deleted successfully'
            });
        }
        return ({
            errCode: 1,
            message: 'Student not found'
        })
        
    } catch (error) {
        throw new Error (error)
    }
}


export { displayStudent, getStudentById, updateStudent, deleteStudent, createNewStudent };