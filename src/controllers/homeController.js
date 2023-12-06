import db from '../models/index';

let getHomePage = async (req, res) => {
    try{
        let data = await db.Student.findAll();
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    } catch(err) {
        console.log(err);
    }
}

// let getCRUD = async (req, res) => {
//     try{
//         return res.send('CRUD');
//     } catch(err) {
//         console.log(err);
//     }
// }

export default getHomePage;