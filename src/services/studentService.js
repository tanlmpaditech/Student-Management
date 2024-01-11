
import db from '../models/index'

const displayStudent = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const students = await db.Student.findAll({raw: true});
            resolve(students); 
        } catch (error) {
            reject(error);
        }
    });
}

const getStudentById = (studentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const student = await db.Student.findOne({
                where: { id: studentId },
                raw: true
            })
            if(student) {
                resolve(student);
            }
            resolve([]);
              
        } catch (error) {
            reject(error);
        }
    })
}

const updateStudent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id) {
                resolve({
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
                resolve({
                    errCode: '0',
                    message: 'Student updated successfully'
                })
            }
            resolve({
                errCode: '1',
                message: 'Student not found'
            });
            
        } catch (error) {
            reject(error);
        }
    })
}

const createNewStudent = async (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Student.create({
                studentId: data.studentId,
                fullName: data.fullName,
                email: data.email,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
            })
            resolve({
                errCode: '0',
                message: 'Student created successfully'
            });
        } catch (err) { 
            reject(err);
        }
    });
}

const deleteStudent = (studentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const student = await db.Student.findOne({
                where: { id: studentId }
            })
            if (student) {
                await student.destroy();
                resolve({
                    errCode: 0,
                    message: 'Student deleted successfully'
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


export { displayStudent, getStudentById, updateStudent, deleteStudent, createNewStudent };