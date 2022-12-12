
/// testing 
import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import User from './models/User.js'
//import department from './models/department.js'
import Courses from './models/Course.js'
import mysql from 'mysql'

// const courseRouter = require('routes/courseRoutes.js')
// because ES6 doesn't have __dirname
const __dirname = path.resolve()

// express app
const app = express();

const connection = mysql.createPool({
        host : "localhost",
        user :"root",
        password : "Db123@123"
    })
    
    connection.getConnection(function(err){
        if(err)
        {
            console.log(err);
        }
        else{
            console.log('connected mysql');
        }
    });
    
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
// app.use(express.json());
app.use(express.urlencoded({extended: true}))


// mongoDB databese connection 
const dbURI = 'mongodb+srv://khalid:t1234@examlydb.nyagend.mongodb.net/examly?retryWrites=true&w=majority' 
mongoose.connect(dbURI).then((result) => app.listen(3000)).catch((err) => (console.log(err)))



// using ejs as a view engine
app.set('view engine', 'ejs')


// middleware of static files (public folder)
app.use(express.static('public'))



//const department = new department({
        //        department:'Mathimatics'
        //        ,courseHeader: 'math101'
        //        ,courseDescription:'deriviatives' 
        //        
        //}).save()

let departments = [{
        department: 'Mathimatics',
        courses: [{
                header: 'math101',
                description: 'deriviatives'
                }, {
                header: 'math102',
                description: 'integraion formulas'
                }
                ]},
        
        {
        department: 'Information and computer',
        courses: [{
                header: 'ics101',
                description: 'javascript'
                }, {
                header: 'ics102',
                description: 'c#'
                }
                ]}]

app.get('/explore', (req, res) => {
        // get database request for departemnts like the dummy objects above for rendering the explore page
        res.render('main', { user: 'admin', departments: departments, page:'explore'})
})


        let quizzes = [{
                header: 'quiz1-wasfi-183',
                description: 'this cover all chapter 1'
        },{
                header: 'quiz2-alherz-201',
                description: 'this cover all chapter 3'
                }]
        
        let majors = [{
                header: 'major1-wasfi-183',
                description: 'this cover all chapter 1'
        },{
                header: 'major2-alherz-201',
                description: 'this cover all chapter 3'
        }]
                
        let midterms = [{
                header: 'midterm1-wasfi-183',
                description: 'this cover all chapter 1'
        },{
                header: 'midterm2-alherz-201',
                description: 'this cover all chapter 3'
                }]

app.get('/courses/:course', (req, res) => {
        // request to database to get the course as shown above (you can take the course name by req.params.course)
        console.log(req.params.course)
        res.render('main', {courseName:req.params.id,user: 'admin', quizzes: quizzes , page:'course', majors:majors , midterms: midterms})
})


let questions = [{
        question: 'what is mana mana?',
        answers: ['apple', 'orange', 'banana']
}, {
        question: 'What does the man mean?',
        answers: ['i hate toefl', 'orange', 'banana']
        },
        {
        question: 'is ant chicken or fish?',
        answers: ['both', 'chicken', 'fish']
        },
        {
        question: 'some fox said: all the foxes are liers. should we believe him?',
        answers: ['yes', 'no']
        }
]
app.get('/courses/:course/exams/:exam', (req, res) => {
        //request for exam questions data as above (you can take the course name and exam name by req.params.course , req.params.exam)
        console.log(req.params.course)//for testing
        console.log(req.params.exam)
        res.render('main', { examName: req.params.exam, user: 'admin', questions: questions, page: 'exam' })

})


app.post('/courses/:course/exams/:exam/reviewExam', (req, res) => {

        //recieve an exam req.params.exam return the correct answers of that exam
        //recived ansewrs:
        let recivedAnsewrs = Object.values(req.body)//its just an array of answers
        console.log(recivedAnsewrs)

        //dummy correct answers object (in real database get the questions of exam as the object above and the correct answers)
        let correctAnswers = ['apple', 'i hate toefl', 'chicken', 'no']
        res.render('main', {user: 'admin',recivedAnsewrs:recivedAnsewrs ,questions: questions, correctAnswers: correctAnswers, page:'review'})


})


app.get('/courses/:course/add/:examType/exam', (req, res) => {
        // reciving course and examType(could be Quizzes or Midterms or Majors)
        //send the form for adding the exam (no database query required here!!)
        res.render('main', {user:'admin',examType:req.params.examType, page:'addexam'})
})

//reciveing data of the added exam, add the exam to database then redirect the user to the course page
app.post('/courses/:course/add/:examType/exam/data', async(req, res) => {
        console.log('test');
        console.log(req.body)//add those data to database
        res.redirect(`/courses/${req.params.course}`);
})

//reciveing data of the added course, add the course to database then redirect the user to the explore page
app.post('/explore/add/:department/courses',async (req, res) => {
        //console.log(req.body)//add those data to database
        const depName= req.params.department
        console.log(depName);
        connection.query(`select departmentID from examlydb.department where replace(departmentName,' ','') = '${depName}'`, function(err,results,fields){
                if(err)
                console.log(err);
                else
                console.log("DONE");
                const depID=JSON.parse(JSON.stringify(results))
                const courseName = req.body.ID;
                const description= req.body.description;
                console.log(req.body);
                console.log(courseName,description,depID);
                const departmentID = depID[0].departmentID
               // console.log(departmentID);

                connection.query('INSERT INTO examlydb.course (`courseName`,`department_departmentID`,`description`) VALUES(?,?,?)',[courseName,departmentID,description],(err,res)=>{
                if(err)
                console.log(err);
                else
                console.log("DONE");
        })
                if(err){
                        console.log(err);
                }
        })



        res.redirect(`/explore`);

})

// handling the requests for 404 page
app.use((req, res) => {
        req.on('data', (data) => {
                console.log(data.toString())
        })
        res.render('404')
})
