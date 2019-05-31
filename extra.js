/* Joseph Ketterer
JKETTE01
Javascript
Tobi Brodie */

/* This section is not part of the requirements. They are just some extra simple functions to add to functionality or make the
site look presentationally more interesting. One loads the popup if the user has regeistered successfully, one enlarges the list of diabetes factors that
appear on the home page, the other draws circles, to create a background image effect.  */

/* Function to add a modal popup. Inspiration taken from here https://sabe.io/tutorials/how-to-create-modal-popup-box */
function toggleModal() {
    var modal = document.querySelector(".modal"); // assign modal class div to vairable
    modal.classList.add("show-modal"); // add class (this changes opacity in css)
    var closeButton = document.querySelector(".close-button"); // assign close button to variable

    closeButton.addEventListener("click", removeModal); // on click call removeModal
    window.addEventListener("click", windowClick); // on click call windowOnClick

    function windowClick(event) {
        if (event.target === modal) {
            removeModal();
        }
    }
    function removeModal(e) { // remove show modal class - this is called on the close button and a click outside window
        var modal = document.querySelector(".modal");
        modal.classList.remove("show-modal");
    }
}

/* I introduce the form with a flexbox list of diabetes factors. A click on a list item enlarges
it by toggling a class with 'flex grow'. The page needs to be loaded before the function is called */
function openListItems() {
    // select all contentitems.This is now a node list of list items
    var contentitems = document.querySelectorAll('.contentitems');
    function toggleOpen(e) {  // function that toggles classList 'open'. This changes flexgrow property in css
        this.classList.toggle('open');
    }
    contentitems.forEach(function(contentitem) { /// addEventListener to EACH list item.
        contentitem.addEventListener('click', toggleOpen);
    });
}

/* Function that draws random circles - it is called after page load
Idea for circles came from the coding train https://www.youtube.com/watch?v=XATr_jdh-44 */
function drawCircles() {
    var circleNumber = 8; // number of circles
    var container = document.getElementById('home-container'); // get container
    var screenWidth = container.offsetWidth;
    var screenHeight = container.offsetHeight;  // get container width
    console.log(screenHeight);
    for (var i = 0; i < circleNumber; i++) { // create 8 circles
        var newCircle = document.createElement("div");
        newCircle.setAttribute("class", "circle");
        var diameter = Math.random () * 275;
        var x = Math.random() * (700 - diameter); // so it doesn't overflow onto next container.
        var y = Math.random() * screenWidth;
        newCircle.style.width = diameter + 'px'; //random diameter
        newCircle.style.height = diameter + 'px';
        newCircle.style.left = y + "px"; //random position
        newCircle.style.top = x + "px";
        container.appendChild(newCircle);
    }
}
