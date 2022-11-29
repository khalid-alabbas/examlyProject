import "./ejs.js"
const explorePages = document.getElementById('explore-pages')
const departments = document.getElementsByClassName('cards-container-body courses')
const course_Page_Cards_Slider = document.getElementsByClassName('cards-container-body exam')
// addding for each cards listener
add_Sliders_Cards_Listeners(departments,renderCoursePage)

console.log(ejs.render('<%= people.join(", "); %>', {people: ['geddy', 'neil', 'alex']}))
// recieve string of explore page name
function changePage(page) {
        switch(page) {
                case 'explore-page':
                        translatePages(0);
                        break;
                case 'course-page':
                        translatePages(1)
                        break;
                case 'exams-page':
                        translatePages(2)
                        break;
                case 'take-exam-page':
                        translatePages(3)
                        break;
        }
}
// this will recieve the translate value in order to show the page
function translatePages(value) {
        [...explorePages.children].forEach((el) => {
                el.style.transform  = 'translateX(-'+(value) + '00%)'
        })
}

//@param:card sliders, call back fucntion to handle the event
//it will add an event listeners for each card in the slider
function add_Sliders_Cards_Listeners(card_Sliders, eventFucntion) {
                                        console.log(card_Sliders)
        for (const slider of card_Sliders) {
                for (const card of slider.children) {
                        card.addEventListener('click',() => {
                                renderCoursePage(card.id)
                                changePage('course-page')
                        })
                }
        }
};
//@param: recieve an id of course 
//retu
function renderCoursePage(id) {
        // add an data base request to course here
        // dommy objects
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
        
        
        if (quizzes != null) {
                quizzes.forEach((quiz) => {
                        course_Page_Cards_Slider[0].innerHTML += addCard(quiz.header, quiz.header, quiz.description)
                })
        }
        if (majors != null) {
                majors.forEach((major) => {
                        course_Page_Cards_Slider[1].innerHTML += addCard(major.header, major.header, major.description)
                })
        }

}


function addCard(card_id, card_header, card_description) {
        return `<div class="card-outer" id=${card_id}><div class="card-header"><h1>${card_header}</h1> </div><div class="card-description"> ${card_description} </div></div>`
}
