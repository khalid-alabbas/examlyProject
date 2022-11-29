const explorePages = document.getElementById('explore-pages')
const departments = document.getElementsByClassName('cards-container-body courses')
const coursePage = document.getElementById
// addding for each cards listener
add_Sliders_Cards_Listeners(departments,renderCoursePage)




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
                case 'exam-page':
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
                                // eventFucntion(card.id)
                                console.log(card.id)
                        })
                }
        }
};
//@param: recieve an id of course 
//retu
function renderCoursePage(id) {
        // add an data base request to course here

        
}
