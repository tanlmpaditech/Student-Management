import db from "../models/index";

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

export default displayStudent;