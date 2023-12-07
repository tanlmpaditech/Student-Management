import db from '../models/index';

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

            resolve('Student created successfully')
        } catch (err) { 
            reject(err);
        }
    });
}

export default createNewStudent;