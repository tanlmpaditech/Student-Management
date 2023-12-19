
import db from '../models/index'

let displayStudent = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let students = await db.Student.findAll({raw: true});
            resolve(students); 
        } catch (error) {
            reject(error);
        }
    });
}

let getStudentById = (studentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let student = await db.Student.findOne({
                where: { id: studentId },
                raw: true
            })
            if(student) {
                resolve(student);
            } else {
                resolve([]);
            }   
        } catch (error) {
            reject(error);
        }
    })
}

let updateStudent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id) {
                resolve({
                    errCode: 2,
                    message: 'Missing id parameter',
                })
            }
            let student = await db.Student.findOne({ 
                where: { id: data.id }
            });
            if(student) {
                student.update(data);
                student.save();
                resolve({
                    errCode: '0',
                    message: 'Student updated successfully'
                })
            } else {
                resolve({
                    errCode: '1',
                    message: 'Student not found'
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let createNewStudent = async (data) => {
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

let deleteStudent = (studentId) => {
console.log(studentId)
    return new Promise(async (resolve, reject) => {
        try {
            let student = await db.Student.findOne({
                where: { id: studentId }
            })
            // console.log(student);
            if (student) {
                await student.destroy();
                resolve({
                    errCode: 0,
                    message: 'Student deleted successfully'
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


export { displayStudent, getStudentById, updateStudent, deleteStudent, createNewStudent };