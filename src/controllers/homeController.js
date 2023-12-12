// import db from '../models/index'
import createNewStudent from '../services/createStudent';
import displayStudent from '../services/displayStudent';
import  { getStudentById, updateStudent, dropStudent } from '../services/editStudent';

// let getHomePage = async (req, res) => {
//     try{
//         let data = await db.Student.findAll();
//         return res.render("homepage.ejs", {
//             data: JSON.stringify(data)
//         })
//     } catch(err) {
//         console.log(err);
//     }
// }

let getHomePage = async (req, res) => {
    return res.render("homepage.ejs");
}

let createStudent = async (req, res) => {
    try{
        return res.render('createStudent.ejs');
    } catch(err) {
        console.log(err);
    }
}

let postStudent = async (req, res) => {
    let message = await createNewStudent(req.body);
    console.log(message);
    return res.redirect('/');
}

let getAllStudents = async (req, res) => {
    let data = await displayStudent();
    // console.log('--------------------------------');
    // console.log(data);
    // console.log('--------------------------------');
    // return res.render('displayStudent.ejs', {
    //     dataTable: data
    // });
    console.log("data:", data);
    return data;
}   

let editStudent = async (req, res) => {
    let studentId = req.query.id;
    if(studentId) {
        let data = await getStudentById(studentId);
        res.render('editStudent.ejs', {
            student: data
        });
    } else {
        res.send('Student not found');
    }
}

let putStudentEdited = async (req, res) => {
    let data = req.body;
    if(data) {
        await updateStudent(data);
    }
    return res.redirect('/students');
}

let deleteStudent = async (req, res) => {
    let id = req.query.id;
    if(id) {
        await dropStudent(id);
    } else {
        return res.send('Student not found');
    }
    return res.redirect('/students');
}

export { getHomePage, createStudent, postStudent, getAllStudents, editStudent, putStudentEdited , deleteStudent };