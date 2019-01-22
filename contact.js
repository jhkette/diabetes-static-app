/* Joseph Ketterer
JKETTE01
Javascript
Tobi Brodie
*/
window.onload = start;
/* Function start loads all functions and variables that need to be present on page load */
function start() {
    var firstName = document.getElementById('first-name'); // variables for name hints
    var email = document.getElementById('email');
    nameHint(firstName, 'Enter your name'); // load name hints with relevant arguments.
    nameHint(email, 'Enter your email');
    switchToolTip(); // tooltip loaded

    /* On blur validate field. */
    /* document.querySelectorAll returns a nodeList, which allows you to use the forEach mothod. This is why I am using it here.
    getelementbyClassName returns a HTMLCollection object which is less useful in this particular instance  */
    fields = document.querySelectorAll('.input-text'); // selecting all the form field elements
    fields.forEach(function(element) { // for each element in fields node list..
        element.onblur = function() { // on blur ..
            var id = this.id;
            validateField(element, id); // validate field
        };
    });
    /* On focus clear error signs */
    fields.forEach(function(element) {
        element.onfocus = function() { // if an element in node list is 'focused' on
            var id = this.id;
            clearError(id); // clear error
            removeRedError(element); // remove red error background
        };
    });
    // call processForm function on submit - this evaluates the validity of all the fields on the form
    document.getElementById('userInfo').onsubmit = processForm;
}

/* The validate field function takes the form field and its id as parameters.
 The id gets used to assign the correct regular expression to the variable Re. Title gets validated seperately as it should only be 5 posssible values*/
function validateField(field, id) {
    var re = '';
    var defaultText = '';
    var valid = true;
    if (id == 'title') {
        if ((field.value == 'Mr') || (field.value == 'Mrs') || (field.value == 'Miss') || (field.value == 'Master') || (field.value == 'Ms')) {
            return valid;
        } else {
            document.getElementById(id + 'Error').innerHTML = 'Please select a title';
            valid = false;
            return valid;
        }
    } else {
        /*A switch case statement to assign a valie to 're' based on the id argument that is passsed in */
        switch (true) {
            case (id == 'first-name'):
                re = new RegExp(/^[a-z]{2,}$/i); // two or more letters
                defaultText = 'Your first name should be at least two charecters and only contain letters';
                removeNameFocus(); // There is an initial focus on the first field which I am removing
                break;

            case (id == 'second-name'):
                re = new RegExp(/^[a-z][a-z-]{1,}$/i); // Must start with a letter then a minimun of at least one other charecter which is a letter or '-';
                defaultText = 'Your second name should be at least two charecters and only contain letters or a hyphen';
                break;

            case (id == 'email'):
                /* regular expression: one or more letters or numbers or '_.-', followed by an @ sign. Then the email provider, which is letters,
                numbers, or selected punctuation. Then a dot. Then a domain name which is letters, may contain a dot. Between 2 and 6 chrecters long.
                Then end of string.
                Inspiration from https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149 */
                re = new RegExp(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/);
                defaultText = 'This is not a valid format for an email';
                break;

            case (id == 'health'):
                re = new RegExp(/^(ZHA)(\d{6})$/); // Must start with capital ZHA (this is it was presented in specifications) then 6 digits.
                defaultText = 'This should be the letters ZHA followed by six digits.';
                break;

            case (id == 'telephone'):
                re = new RegExp(/^\d{11}$/); // must be 11 digits no other charecters
                defaultText = 'This is not a valid telephone number. It should be eleven digits.';
                break;
        }
        /* I'm only validating the telephone field if there is an entry. If a user has focused on field but left it empty,  I am simply ignoring it, it is considered de facto valid.
        This is because it is not mandatory. However, if there is an entry and it is incorrect an incorrect an error will show.  */
        if (id == 'telephone') {
            if (field.value !== '') {
                if (re.test(field.value)) {
                    return valid;
                } else {
                    document.getElementById(id + 'Error').innerHTML = defaultText; // add error message to id+ error (this is the span element in contact.html)
                    /* Add red error background */
                    addRedError(field);
                    valid = false; // change valid to false
                    return valid;
                }
            }
        } else {
            if (re.test(field.value)) { // test value from field argument against regular expression
                return valid; // return valid
            } else {
                document.getElementById(id + 'Error').innerHTML = defaultText; // add error message to id+ error (this is the span element in contact.html)
                /* Add red error background */
                addRedError(field);
                valid = false; // change valid to false
                return valid;
            }
        }
    }
}

/*This function presents a name hint, removes it on focus, and re-adds hint on blur if field is left empty */
function nameHint(field, message) {

    field.value = message;
    field.style.color = "#aba9a9"; // add text and styling
    field.style.fontStyle = "italic";

    field.addEventListener('focus', function(event) {
        if (this.value == message) { // remove hint message on focus
            this.value = "";
            this.style.color = "#000";
            this.style.fontStyle = "normal";
        }
    });
    field.addEventListener('blur', function(event) {
        if (this.value === "") { // on blur we add default text again if the value is empty
            this.value = message;
            this.style.color = "#aba9a9";
            this.style.fontStyle = "italic";
        }
    });
}

/* This function loops through all form fields and uses the validateField function to check they are valid. If one returns valid, var valid is changed to false  */
function processForm() {
    event.preventDefault(); //Make sure form doesn't submit
    clearAllErrors();
    var valid = true;
    var fields = document.querySelectorAll('.input-text');
    fields.forEach(function(field) {
        if (validateField(field, field.id) == false) {
            valid = false;
        }
    });
    if (valid == true) {
        toggleModal();
    } else {
        document.getElementById('submitError').innerHTML = 'There are errors in the form';
    }
}

/* Clear error function which takes the parameter of the 'id' of the form field to add an error messsage beside the
form field. This works as the id of the error fields is the same as the form field but with an added 'Error' at the end */
function clearError(id) {
    document.getElementById(id + 'Error').innerHTML = "&nbsp;";
    document.getElementById('submitError').innerHTML = "&nbsp;";
}

/*Function to clear all errors. This is called on submit  */
function clearAllErrors() {
    var errors = document.querySelectorAll('Error');
    errors.forEach(function(error) {
        error.innerHTML = "&nbsp;";
    });
}

/* This removes the initial 'focus' class on the first name. Is called if the first name is valid
NOTE: certain browsers add default backgrounds to form fields (ie chrome), so browsers defaults have been changed in css  */
function removeNameFocus() {
    var firstNameField = document.getElementById('first-name');
    firstNameField.classList.remove('focus');
}

/* This adds a very pale red background to the form if there is an error in the form. It gets called in the validation functions . I feel
these help give feedback to the user  */
function addRedError(field) {
    field.classList.add('backgroundred');
}

/*This removes the red background if the form field is correct. It is called in the validation functions */
function removeRedError(field) {
    field.classList.remove('backgroundred');
}

/* Function to add tooltip. I'm changing the opacity on mouseout/mouseover. */
function switchToolTip() {
    document.getElementById('qmark').onmouseover = function() { // when user hovers over question mark...
        var toolTip = document.getElementById('ttip');
        toolTip.style.opacity = 1; // change the opacity of the tooltip to 1
    };
    document.getElementById('qmark').onmouseout = function() { // when the user moves away..
        var toolTip = document.getElementById('ttip');
        toolTip.style.opacity = 0; // change the tooltip opacity to 0
    };
}
