// Joseph Ketterer
window.onload = start;

function start() {
    var firstName = document.getElementById('first-name');
    var email = document.getElementById('email');

    nameHint(firstName, 'Enter your name');
    nameHint(email, 'Enter your email');
    switchToolTip(); // tooltip loaded

    /* document.querySelectorAll returns a NodeList, which allows you to use the forEach mothod. This is why I am using it here.
    getelementbyClassName returns a HTMLCollection object which is less useful in this particular instance  */
    fields = document.querySelectorAll('.input-text'); // selecting all the form field elements
    fields.forEach(function(element) { // for each element in fields node list..
        element.onblur = function() { // on blur ..
            var id = this.id;
            validateField(element, id); // validate field
        };
    });

    fields.forEach(function(element) {
        element.onfocus = function() {
            var id = this.id;
            clearError(id);
            removeRedError(element);
        };
    });
    // call processForm function on submit - this evaluates the validity of all the fields on the form
    document.getElementById('userInfo').onsubmit = processForm;
}

/*The validate field function takes the form field DOM element and its id as parameters. I'm adding
the field as a parameter to make it easy to remove/add red background [removeRedError(field)] which I present /remove to the user if there
is/is not an error. The id gets used to assign the correct regular expression to the variable Re. */
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

        if (id == 'first-name') {
            re = new RegExp(/^[A-Za-z]{2,}$/i);
            defaultText = 'This is not a valid first name';
        }
        if (id == 'second-name') {
            re = new RegExp(/^[a-z][a-z-]+$/i);
            defaultText = 'This is not a valid second name';
        }
        if (id == 'email') {
            /* regular expression: one or more letters or numbers or '_.-', followed by an @ sign. Then the email provider, which is letters,
            numbers, or selected punctuation. Then a dot. Then a domain name which is letters, may contain a dot. Between 2 and 6 chrecters long.
            Then end of string.
            Inspiration from https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149 */
            re = new RegExp(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/);
            defaultText = 'This is not a valid email';
        }
        if (id == 'health') {
            re = new RegExp(/^(ZHA)(\d{6})$/);
            defaultText = 'This is not a valid ZHA number';
        }
        if (id == 'telephone') {
            re = new RegExp(/^\d{11}$/);
            defaultText = 'This is not a valid telephone number';
        }
        if (id == 'first-name') {
            removeNameFocus();
        }
        var val = field.value;
        /* first name contain only letters and is at least two charecters long, case insensitive  */
        if (re.test(val)) { // test value against regular expression
            /* Remove initial focus on first name */

            /* Remove error background if it exists (maybe add if statement??) */
            return valid; // return valid
        } else {
            document.getElementById(id + 'Error').innerHTML = defaultText;
            /* Add red error background */
            addRedError(field);
            valid = false; // change valid to false
            return valid;
        }
    }
}

function nameHint(field, message) {

    field.value = message; // add default text and styling
    field.style.color = "#aba9a9";
    field.style.fontStyle = "italic";

    field.addEventListener('focus', function(event) {
        if (this.value == message) {
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


function processForm() {
    event.preventDefault();
    clearAllErrors();
    var valid = true;
    var fields = document.querySelectorAll('.input-text');
    fields.forEach(function(field) {
        var id = field.id;
        console.log(id);
        if (id !== 'telephone') {
            if (validateField(field, id) == false) {
                valid = false;
            }
        }
    });
    /* The telephone field is the only opetional field.
    Therefore telephone field needs to be dealt with slightly differently. If the field is not empty I am validating it.
    As, were this a real application you woudn't want invalid data entering a database. Therefore if there is an entry in the field it needs to be corrrect,
    otherwise the form will not submit.
    If the field is empty I am not validating the field. The form can still submit*/
    var telephone = document.getElementById('telephone');
    if (telephone.value !== "") {
        if (validateField(telephone, 'telephone') == false) {
            valid = false;
        }
    }
    if (telephone.value == "") {
        removeRedError(telephone); // if the value is an empty string it is not an error
    }
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


function clearAllErrors() {
    var errors = document.querySelectorAll('Error');
    errors.forEach(function(error) {
        error.innerHTML = "&nbsp;";
    });
}

/* This removes the initial 'focus' class on the first name. Is called if the first name is valid
NOTE: certain browsers add default backgrounds to form fields (ie chrome), so browsers defaults have been changed in css */
function removeNameFocus() {
    var firstNameField = document.getElementById('first-name');
    firstNameField.classList.remove('focus');
}

/* This adds a very pale red background to the form if there is an error in the form. It gets called in the validation functions . I feel
these help give feedback to the user  */
function addRedError(field) {
    field.classList.add('backgroundred');
}

/*This removes the red background if the form field is correct. It is called in the validation functions    */
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
