import express from 'express'
import path from 'path'

// because ES6 doesn't have __dirname
const __dirname = path.resolve()

// express app
const app = express();

// mongoDB databese connection 
const dbURI = ''// we need the link of MongoDB here  

// using ejs as a view engine
app.set('view engine', 'ejs')

// open a port for requests
app.listen(3000);

// middleware of static files (public folder)
app.use(express.static('public'))

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
console.log(departments.length)
// route login
app.get('/main', (req, res) => {
        res.render('main',{user:'quest'})
})

app.get('/student', (req, res) => {
        res.render('main', { user: 'student', departments: departments })
})

app.get('/admin', (req, res) => {
        res.render('main',{user:'admin'})
})
// handling the requests 
app.use((req, res) => {
        req.on('data', (data) => {
                console.log(data.toString())
        })
        res.render('404')
})
