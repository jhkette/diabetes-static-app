/* Function to add a modal popup. It is called if the form is completed correctly
some inspiration taken from here https://sabe.io/tutorials/how-to-create-modal-popup-box */
function toggleModal() {
    var modal = document.querySelector(".modal"); // assign modal class div to vairable
    modal.classList.add("show-modal"); // add class (this changes opacity in css)
    var closeButton = document.querySelector(".close-button"); // assign close button to variable

    closeButton.addEventListener("click", removeModal); // on click call removeModal
    window.addEventListener("click", windowClick); // on click call windowOnClick

    function windowClick(event) {
        /* if the target of the event equals modal, remove modal. The target property gets the element on which the
        event originally occurred, as opposed to the currentTarget property, which always refers to the element whose
        event listener triggered the event.  */
        if (event.target === modal) {
            removeModal();
        }
    }
    /* remove show modal class - this is called on the close button and a click outside window  */
    function removeModal(e) {
        var modal = document.querySelector(".modal");
        modal.classList.remove("show-modal");
    }
}

/* This is a function to add a simple effect to the home page */
/* I introduce the form with a flexbox list of diabetes factors. A click on a list item enlarges
it by toggling a class with 'flex grow'. The page needs to be loaded before the function is called */
window.addEventListener('load', openListItems);

function openListItems() {
    // select all contentitems.This is now a node list of list items
    var contentitems = document.querySelectorAll('.contentitems');
    var links = document.querySelectorAll('.summary');

    // function that toggles classList 'open'. This changes flexgrow property in css
    function toggleOpen(e) {
        this.classList.toggle('open');
    }
    /*addEventListener to EACH list item. Call toggleopen function on click  */
    contentitems.forEach(function(contentitem) {
        contentitem.addEventListener('click', toggleOpen);

    });
}
