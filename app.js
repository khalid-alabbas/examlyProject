import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import { Department, Course, Exam, Question } from './models/Department.js'


// const courseRouter = require('routes/courseRoutes.js')
// because ES6 doesn't have __dirname
const __dirname = path.resolve()

// express app
const app = express();

//for testing
// const user = new User({username:'jamel aldin'}).save()


app.use(express.json());
app.use(express.urlencoded({extended: true}))


// mongoDB databese connection 
const dbURI = 'mongodb+srv://admin:admin123@cluster0.7ssfmdl.mongodb.net/?retryWrites=true&w=majority' 
mongoose.connect(dbURI).then((result) => app.listen(3000)).catch((err) => (console.log(err)))



// using ejs as a view engine
app.set('view engine', 'ejs')


// middleware of static files (public folder)
app.use(express.static('public'))



let departments = [{
        departmentName: 'Mathimatics',
        courses: [{
                header: 'math101',
                description: 'deriviatives'
                }, {
                header: 'math102',
                description: 'integraion formulas'
                }
                ]},
        
        {
        departmentName: 'Information and computer',
        courses: [{
                header: 'ics101',
                description: 'javascript'
                }, {
                header: 'ics102',
                description: 'c#'
                }
                ]
        }]
                

const dp = Department.find({ 'departmentName.courses': 'math102' }, (err, data) => {
        if (err) {
                console.log(err.message)
        } else {
                console.log(data)
        }
})

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
app.post('/courses/:course/add/:examType/exam/data', (req, res) => {
        console.log(req.body)//add those data to database

        
        res.redirect(`/courses/${req.params.course}`);

})        

//reciveing data of the added course, add the course to database then redirect the user to the explore page
app.post('/explore/add/:department/courses', (req, res) => {
        console.log(req.body)//add those data to database

        
        res.redirect(`/explore`);

})  

// handling the requests for 404 page
app.use((req, res) => {
        req.on('data', (data) => {
                console.log(data.toString())
        })
        res.render('404')
})
