// adds footer content to the page
const footer = document.querySelector('.footer');
const footerPara = document.createElement('p');
let date = new Date().getFullYear();
footerPara.textContent = `Copyright © ${date} Luis Tamarez All Rights Reserved`;
footer.appendChild(footerPara);

const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#password-confirm');
const passwordFeedback = document.querySelector('#password-feedback');
const confirmPasswordFeedback = document.querySelector('#password-confirm-feedback');
const togglePassword = document.querySelectorAll('.togglePassword');

const minLength = document.querySelector('#min-length');
const specialChars= document.querySelector('#special-chars');
const number = document.querySelector('#number');
const upperCaseChar = document.querySelector('#uppercase-char');
const lowerCaseChar = document.querySelector('#lowercase-char');

// // password validation
// let validLength = false;
// let validSpecialChars = false;
// let validNumber = false;
// let validUpCaseChar = false;
// let validLowCaseChar = false;


// Email validation
let validEmail = false;

// phone number validation
let validPhoneNumber = false;

// name validation
let validFirstName = false;
let validLastName = false;


// toggle password visibility
togglePassword.forEach(event => {
        event.addEventListener('click', function () {
        // toggle the type attribute
        const passwordType = password.getAttribute('type') === 'password' ? 'text' : 'password';
        const confirmPasswordType = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';

        password.setAttribute('type', passwordType);
        confirmPassword.setAttribute('type', confirmPasswordType);

        for (let i = 0; i < togglePassword.length; i++) {
            if ( passwordType === 'text' || confirmPasswordType === 'text' ) {
                togglePassword[i].textContent = ' Hide';

            }
            else {
                togglePassword[i].textContent = ' Show';

            } 
            // toggle the eye slash icon 
            togglePassword[i].classList.toggle('fa-eye-slash');          
        }
  
        password.classList.toggle('fa-eye-slash');
        confirmPassword.classList.toggle('fa-eye-slash');
    });
});

password.addEventListener('click', () => {
    passwordFeedback.style.visibility = 'visible';
});

password.addEventListener('blur', () => {
    if (password.value.length === 0) {
        passwordFeedback.style.visibility = 'hidden';
    }
});

password.addEventListener('keyup', () => {
    validatePassword();
});

confirmPassword.addEventListener('keyup', () => {
    validateConfirmPassword();
});

confirmPassword.addEventListener('focus', () => {
    confirmPasswordFeedback.style.visibility = 'visible';
});

confirmPassword.addEventListener('blur', () => {
    if (confirmPassword.value.length === 0) {
        confirmPasswordFeedback.style.visibility = 'hidden';
    }
});

function validatePassword() {
    let validPasswordObjFunctions = {
        validLength: validateLength(),
        validSpecialChars: validateSpecialChars(),
        validNumber: validateNumber(),
        validUpperCaseChar: validateUpperCaseChar(),
        validLowerCaseChar: validateLowerCaseChar(),
    };

    let validPassword = Object.values(validPasswordObjFunctions).every(value => value === true);

    if (validPassword) {
        password.style.borderColor = 'green';
    } else {
        password.style.borderColor = 'red';
    }
}

function validateLength() {
  if (password.value.length < 8) {
    minLength.style.color = 'red';
    return false;
  } else {
    minLength.style.color = 'green';
    return true;
  }
}

function validateSpecialChars() {
  if (password.value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
    specialChars.style.color = 'green';
    return true;
  } else {
    specialChars.style.color = 'red';
    return false;
  }
}

function validateNumber() {
  if (password.value.match(/[0-9]/)) {
    number.style.color = 'green';
    return true;
  } else {
    number.style.color = 'red';
    return false;
  }
}

function validateUpperCaseChar() {
  if (password.value.match(/[A-Z]/)) {
    upperCaseChar.style.color = 'green';
    return true;
  } else {
    upperCaseChar.style.color = 'red';
    return false;
  }
}

function validateLowerCaseChar() {
  if (password.value.match(/[a-z]/)) {
    lowerCaseChar.style.color = 'green';
    return true;
  } else {
    lowerCaseChar.style.color = 'red';
    return false;
  }
}

function comparePasswords() {
  if (password.value === confirmPassword.value) {
    confirmPasswordFeedback.textContent = 'Passwords match';
    confirmPasswordFeedback.style.color = 'green';
    return true;
  } else {
    confirmPasswordFeedback.textContent = 'Passwords do not match';
    confirmPasswordFeedback.style.color = 'red';
    return false;
  }
}