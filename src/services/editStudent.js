import db from '../models/index'

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
    console.log(data);
    return new Promise(async (resolve, reject) => {
        try {
            let student = await db.Student.findOne({ 
                where: { id: data.id }
            });
            if(student) {
                student.update(data);
                student.save();
                let allStudents = await db.Student.findAll();
                resolve(allStudents);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    })
}

export { getStudentById, updateStudent };