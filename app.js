
/// testing 
import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
// import { Department, Course, Exam, Question } from './models/Department.js'
import User from './models/User.js'
import { department } from './models/department.js'
import Courses from './models/Course.js'
import mysql from 'mysql'
//bringing users from userRoutes:
// import users from './routes/userRoutes.js'

// const courseRouter = require('routes/courseRoutes.js')
// because ES6 doesn't have __dirname
const __dirname = path.resolve()

// express app
const app = express();

// const connection = mysql.createPool({
//         host : "localhost",
//         user :"root",
//         password : "Db123@123"
//     })

//     connection.getConnection(function(err){
//         if(err)
//         {
//             console.log(err);
//         }
//         else{
//             console.log('connected mysql');
//         }
//     });

//tring for signin/up popup 
import bodyParser from 'body-parser'
import { copyFileSync } from 'fs'



//for testing (//tring for signin/up popup ):
// app.use(bodyParser.json())
// app.use(express.static('public'))
// app.use(bodyParser.urlencoded({
//         extended: true
// }))
// app.get('/explore', (req,res) =>{
//         res.set({
//                 "Allow-access-Allow-Origin": '*' 
//         })
// }).listen(3000);
// console.log('listning in port 3000');




//for testing
//const user = new User({
//        firstname:'jamel'
//        ,lastname: 'aldin'
//        ,email:'jamel@gmail.com' 
//        ,password:'jamel aldin' 
//}).save()

// const user = new User({
//         firstname:'khalid2',
//         lastname:'alabbas2',
//         email:'test@gmail.com2',
//         password:'12342',
//         favCourses:[
//                 {
//                 userId:'test@gmail.com2'
//                 ,courseId:'1'
//                 }
//         ]
//         ,results:[
//                 {
//                 userId:'test@gmail.com2'
//                 ,exam:'MATH101'
//                 ,score:'4/10'
//                 }
//         ]
// }).save();

// const res = User.findOne({
//         'favCourses.userId':'test@gmail.com2'
// })
// console.log('resulst: ', res);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))




// mongoDB databese connection 
mongoose.set('strictQuery', true);
const dbURI = 'mongodb+srv://khalid:t1234@examlydb.nyagend.mongodb.net/examly?retryWrites=true&w=majority'
mongoose.connect(dbURI).then((result) => app.listen(3000)).catch((err) => (console.log(err)))



// using ejs as a view engine
app.set('view engine', 'ejs')


// middleware of static files (public folder)
app.use(express.static('public'))

// const Newdepartments = new department({
//         departmentName:'mgt',
//             courses:[
//                 {
//                 header:'mgt210',
//                 description:'Description for math 101'
//                 ,quizzes:[{
//                         header:'quiz1',
//                         description:'this test',
//                         questions : [{
//                                         question: 'test Q',
//                                         answers: ['a','b']
//                         }]
//                                 ,correct_Answers:['a']
//                     },{
//                         header:'quiz2',
//                         description:'this test2',
//                         questions : [{
//                                         question: 'test Q',
//                                         answers: ['a','b']
//                         }]
//                                 ,correct_Answers:['a']
//                     }]
//                     ,majors:[{
//                         header: 'major1--193',
//                         description: 'this cover all chapter 1'
//                         ,
//                         questions : [{
//                                         question: 'test Q',
//                                         answers: ['a','b']
//                         }]
//                                 ,correct_Answers:['a']
//                     },{
//                         header: 'major2--192',
//                         description: 'this cover all chapter 2'
//                         ,
//                         questions : [{
//                                         question: 'test Q',
//                                         answers: ['a','b']
//                         }]
//                                 ,correct_Answers:['a']
//                     }
//                 ]
//                     ,midterms:[{
//                         header: 'midterm1-202',
//                         description: 'this cover all chapter 1'
//                         ,
//                         questions : [{
//                                         question: 'test Q',
//                                         answers: ['a','b']
//                         }]
//                                 ,correct_Answers:['a']
//                     },{
//                         header: 'midterm1-202',
//                         description: 'this cover all chapter 1'
//                         ,
//                         questions : [{
//                                         question: 'test Q',
//                                         answers: ['a','b']
//                         }]
//                                 ,correct_Answers:['a']
//                     }]
//         }
// ]
//         }).save()

//########### to ADD new Department ##############
// const departments = new department({
//         department:'Physics'}).save()

// let user = ({
//         firstname: 'naif',
//         lastname:'allu',
//         email:'alza3@gmail.com',
//         password:'Nn112233',
// })
// user.save((err)=>{
//         if(!err){
//                 console.log('its reserved')
//                 console.log(user)
//         }
// })
//bring user routes: Error so i did by import
// const users = require('./routes/userRoutes.js')  
// app.use('/users', users)





// let departments = [{
//         department: 'Mathimatics',
//         courses: [{
//                 header: 'math101',
//                 description: 'deriviatives'
//                 }, {
//                 header: 'math102',
//                 description: 'integraion formulas'
//                 }
//                 ]},

//         {
//         department: 'Information and computer',
//         courses: [{
//                 header: 'ics101',
//                 description: 'javascript'
//                 }, {
//                 header: 'ics102',
//                 description: 'c#'
//                 }
//                 ]}]


app.get('/explore', async (req, res) => {
        // get database request for departemnts like the dummy objects above for rendering the explore page

        // ############### is done but need help to find where does it go.
        var departments;
        await department.find({ department }).then((results) => {
                //res.send(results)
                // console.log(results.departmentName);
                departments = results;
                // console.log(results);

        }).catch((err) => {
                console.log(err);
        })
        res.render('main', { user: 'admin', departments: departments, page: 'explore' })

        // connection.query(`select departmentID, departmentName,courseName,description from examlydb.department join examlydb.course ON department.departmentID=course.department_departmentID`, function(err,results,fields){
        //         if(err)
        //         console.log(err);
        //         else
        //         console.log("DONE")
        //         //console.log(results);
        //         const depID=JSON.parse(JSON.stringify(results))
        //         // console.log(depID);
        //         })
        // let departments = [{
        //         department: 'Mathimatics',
        //         courses: [{
        //                 header: 'math101',
        //                 description: 'deriviatives'
        //                 }
        //                 ]}]
})


// let quizzes = [{
//         header: 'quiz1-183',
//         description: 'this cover all chapter 1'
// },{
//         header: 'quiz2-201',
//         description: 'this cover all chapter 3'
//         }]

// let majors = [{
//         header: 'major1-183',
//         description: 'this cover all chapter 1'
// },{
//         header: 'major2-201',
//         description: 'this cover all chapter 3'
// }]

// let midterms = [{
//         header: 'midterm1-183',
//         description: 'this cover all chapter 1'
// },{
//         header: 'midterm2-201',
//         description: 'this cover all chapter 3'
//         }]

app.get('/courses/:course', async (req, res) => {
        var quizzes;
        var majors;
        var midterms;
        await department.findOne({ "courses.header": `${req.params.course}` }).then((results) => {
                quizzes = results.courses[0].quizzes;
                // console.log(results.courses[0]);
                majors = results.courses[0].majors;
                midterms = results.courses[0].midterms;

        }).catch((err) => {
                console.log(err);
        })
        res.render('main', { courseName: req.params.id, user: 'admin', quizzes: quizzes, page: 'course', majors: majors, midterms: midterms })
        //console.log(quizzes);
        // request to database to get the course as shown above (you can take the course name by req.params.course)
})


// let questions = [{
//         question: 'what is mana mana?',
//         answers: ['apple', 'orange', 'banana']
// }, {
//         question: 'What does the man mean?',
//         answers: ['i hate toefl', 'orange', 'banana']
//         },
//         {
//         question: 'is ant chicken or fish?',
//         answers: ['both', 'chicken', 'fish']
//         },
//         {
//         question: 'some fox said: all the foxes are liers. should we believe him?',
//         answers: ['yes', 'no']
//         }
// ]
app.get('/courses/:course/exams/:exam', async (req, res) => {
        //request for exam questions data as above (you can take the course name and exam name by req.params.course , req.params.exam)
        // console.log(req.params.course)//for testing
        // console.log(req.params.exam)
        let questions = [];
        await department.findOne({ "courses.header": req.params.course }).then((results) => {

                console.log('"/courses/:course/exams/:exam"');
                //const courseName= req.params.course
                const courses = results.courses;
                const examType = req.params.exam;
                const courseName = req.params.course;
                const examTypeMatch = examType.toLowerCase;
                //const courses = results.courses;

                for (let i = 0; i < courses.length; i++) {                // loop through array of objects
                        if (courses[i].header == `${courseName.toString()}`) {               // check if header matches the evaluation condition

                                if (examTypeMatch == 'quizzes') {
                                        const quizzes = courses[i].quizzes;
                                        for (let j = 0; j < quizzes.length; j++) {        // loop through array of objects
                                                if (quizzes[j].header == `${examType.toString()}`) {      // compare quiz name to get this puzzle solution

                                                        //console.log(quizzes[j].questions); 
                                                        questions = quizzes[j].questions                                  // {"quizName":"test2"} is the output after checking this condition
                                                }
                                        }
                                } else if (examTypeMatch == 'majors') {
                                        const majors = courses[i].majors;
                                        for (let j = 0; j < majors.length; j++) {        // loop through array of objects
                                                if (majors[j].header == `${examType.toString()}`) {      // compare quiz name to get this puzzle solution

                                                        //console.log(quizzes[j].questions); 
                                                        questions = majors[j].questions;                               // {"quizName":"test2"} is the output after checking this condition
                                                }
                                        }
                                } else {
                                        const midterms = courses[i].midterms;
                                        for (let j = 0; j < midterms.length; j++) {        // loop through array of objects
                                                if (midterms[j].header == `${examType.toString()}`) {      // compare quiz name to get this puzzle solution

                                                        //console.log(quizzes[j].questions); 
                                                        questions = midterms[j].questions                                  // {"quizName":"test2"} is the output after checking this condition
                                                }
                                        }
                                }
                                // save the object's quizzes in constant variable
                                //console.log(quizzes[i]);
                        }
                }


        }).catch((err) => {
                console.log(err);
        })
        console.log(questions);
        res.render('main', { examName: req.params.exam, user: 'admin', questions: questions, page: 'exam' })

})


app.post('/courses/:course/exams/:exam/reviewExam', (req, res) => {

        //recieve an exam req.params.exam return the correct answers of that exam
        //recived ansewrs:
        let recivedAnsewrs = Object.values(req.body)//its just an array of answers
        console.log(recivedAnsewrs)

        //dummy correct answers object (in real database get the questions of exam as the object above and the correct answers)
        let correctAnswers = ['apple', 'i hate toefl', 'chicken', 'no']
        res.render('main', { user: 'admin', recivedAnsewrs: recivedAnsewrs, questions: questions, correctAnswers: correctAnswers, page: 'review' })


})


app.get('/courses/:course/add/:examType/exam', (req, res) => {
        // reciving course and examType(could be Quizzes or Midterms or Majors)
        //send the form for adding the exam (no database query required here!!)
        res.render('main', { user: 'admin', examType: req.params.examType, page: 'addexam' })
})

//reciveing data of the added exam, add the exam to database then redirect the user to the course page
app.post('/courses/:course/add/:examType/exam/data', async (req, res) => {
        console.log('data');
        console.log(req.body)
        const header = req.body.examName
        const description = req.body.examDes
        const questions = req.body.questions
        const correct_Answers = req.body.correct_Answers
        const courseheader = req.params.course
        const quizheader = req.params.examType.toLowerCase()

        // const update=await department.updateOne({departmentName:departmentName},{$push: {courses:{header: req.body.ID, description: description}}})
        console.log(req.params.course, req.params.examType.toLowerCase());
        console.log(req.body)//add those data to database

        if (quizheader == 'quizzes') {
                const update = await department.updateOne({ "courses.header": courseheader }, { $push: { "courses.$.quizzes": { header: header, description: description, questions: questions, correct_Answers: correct_Answers } } })
        }
        if (quizheader == 'majors') {
                const update = await department.updateOne({ "courses.header": courseheader }, { $push: { "courses.$.majors": { header: header, description: description, questions: questions, correct_Answers: correct_Answers } } })
        } else {
                const update = await department.updateOne({ "courses.header": courseheader }, { $push: { "courses.$.midterms": { header: header, description: description, questions: questions, correct_Answers: correct_Answers } } })
        }
        res.redirect(`/courses/${req.params.course}`);
})

//reciveing data of the added course, add the course to database then redirect the user to the explore page
app.post('/explore/add/:department/courses', async (req, res) => {

        const departmentName = req.params.department;
        const { ID, description } = req.body;
        // console.log(ID,description, departmentName);
        const update = await department.updateOne({ departmentName: departmentName }, { $push: { courses: { header: req.body.ID, description: description } } })



        res.redirect(`/explore`);

})

// handling the requests for 404 page
app.use((req, res) => {
        req.on('data', (data) => {
                console.log(data.toString())
        })
        res.render('404')
})



//tring for signin/up popup
// mongoose.Connection.once('open', ()=> console.log('connected to Db'))
// app.post('/signup',(req,res)=>{
//    var firstname = req.body.firstname;
//    var lastname = req.body.lastname;
//    var email = req.body.email;
//    var password = req.body.password;

//    var user = {
//         "firstname": firstname,
//         "lastname": lastname,
//         "email": email,
//         "password": password,
//         }

//    db.collection('users').insertOne(user, (err,collection)=>{
//         if(err){
//                 console,log(err);
//         }
//         console.log("Record insert seccussfully!");
//    });
   //redirect to seccuful-popup : i don't think we need it bcz i done it in signin-up-poppup file
//    return res.redirect('signin-up-popup.ejs')
// })