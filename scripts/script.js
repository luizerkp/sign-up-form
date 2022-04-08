// adds footer content to the page
const footer = document.querySelector('.footer');
const footerPara_1 = document.createElement('p');
const footerPara_2 = document.createElement('p');
const a = document.createElement('a');
a.href = "https://github.com/luizerkp";
const githubLogo = document.createElement('img');
githubLogo.src="imgs/GitHubMarkSmall.png"
a.appendChild(githubLogo)
a.setAttribute('id', 'github-log');
const date = new Date().getFullYear();
footerPara_1.textContent = `Copyright © ${date} Luis Tamarez`
footerPara_2.textContent = "All Rights Reserved";
footer.appendChild(footerPara_1);
footer.appendChild(a);
footer.appendChild(footerPara_2)


const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const emailFeedback = document.querySelector('#email-feedback');
const phoneNumber = document.querySelector('#phone-number');
const phoneNumberFeedback = document.querySelector('#phone-number-feedback');


const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#password-confirm');
const passwordFeedback = document.querySelector('#password-feedback');
const confirmPasswordFeedback = document.querySelector('#password-confirm-feedback');
const togglePassword = document.querySelectorAll('.togglePassword');
const inputs = document.querySelectorAll('input');

const minLength = document.querySelector('#min-length');
const specialChars= document.querySelector('#special-chars');
const number = document.querySelector('#number');
const upperCaseChar = document.querySelector('#uppercase-char');
const lowerCaseChar = document.querySelector('#lowercase-char');

const phoneValidationRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{8,14}$/g;
const emailValidationRegex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

const signupForm = document.querySelector('#signup-form');

let errorObj = {
  'first-name': false,
  'last-name': false,
  'email': false,
  'password': false,
  'password-confirm': false,
};

inputs.forEach(input => {
  input.addEventListener('focus', () => {    
    input.classList.remove('error');
    input.classList.remove('valid');
    input.classList.add('input-focus');

  });

  input.addEventListener('blur', () => {
      if (input.value.length === 0) {
        input.classList.remove('input-focus');
      }
      else if (input.id === 'first-name' || input.id === 'last-name'){
        return;
      }
      else {
        input.classList.remove('input-focus');
        errorStatus(input.id);
        if (input.id === 'password') {
          let currentStatus = checkPasswordStatus();
          if (currentStatus === false) {
            errorStatus('password-confirm');
          }
        }
      }
    });
});

// toggle password visibility
togglePassword.forEach(event => {
        event.addEventListener('mousedown', function (event) {
        event.preventDefault();
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
    });
});

password.addEventListener('focus', () => {
    passwordFeedback.style.visibility = 'visible';
  
});

password.addEventListener('blur', () => {
    if (password.value.length === 0) {
        passwordFeedback.style.visibility = 'hidden';
    } 
});

signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let currentError = Object.values(errorObj).some(value => value === true);
    if (currentError === true) {
      alert('Please fix the errors in the form');
      return;
    } else {
      window.location.href = './confirmation.html';
    }

      
});

password.addEventListener('keyup', () => {
    validatePassword();
    if (confirmPassword.value.length > 0) {
      let currentStatus = checkPasswordStatus();
      if (currentStatus === false) {
        errorStatus('password-confirm');
      }        
    }
});

phoneNumber.addEventListener('keyup', () => {
    if (phoneNumber.value.length === 0) {
        phoneNumberFeedback.textContent = '';
    } else {
        validatePhoneNumber();
    }
  });

email.addEventListener('keyup', () => {
    if (email.value.length === 0) {
        emailFeedback.textContent = '';
    } else {
        validateEmail();
    }
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


function errorStatus(eventId) {
  let noError = null;
  switch (eventId) {
      case 'email':
          noError= validateEmail();
          break;
      case 'phone-number':
          noError= validatePhoneNumber();
          break;
      case 'first-name':
          noError= validateName();
          break;
      case 'last-name':
          noError= validateName();
          break;
      case 'password':
          noError= validatePassword();
          break;
      case 'password-confirm':
          noError= validateConfirmPassword();
          break;
      default:
          break;
  }

  const input = document.querySelector('#' + eventId);

  if (noError=== false) {
    input.classList.add('error');
    input.classList.remove('valid');
    errorObj[eventId] = true;
  }
  else if (noError=== true) {
    input.classList.add('valid');
    input.classList.remove('error');
    errorObj[eventId] = false;
  }
}

function checkPasswordStatus() {
  const active = confirmPassword.getAttribute('class');
  let match = validateConfirmPassword();
  let results = true;
  if (active === 'error' && match === true) {
    results = false;
  }
  else if (active === 'valid' && match === false) {
    results = false;
  }
  return results;
}

function validatePassword() {
  
  if (password.value.length === 0) {
    minLength.style.color = 'inherit';
    specialChars.style.color = 'inherit';
    number.style.color = 'inherit';
    upperCaseChar.style.color = 'inherit';
    lowerCaseChar.style.color = 'inherit';
    return null;
  }

  let validPasswordObjFunctions = {
      validLength: validateLength(),
      validSpecialChars: validateSpecialChars(),
      validNumber: validateNumber(),
      validUpperCaseChar: validateUpperCaseChar(),
      validLowerCaseChar: validateLowerCaseChar(),
  };

  let validPassword = Object.values(validPasswordObjFunctions).every(value => value === true);
  return validPassword;
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

function validateConfirmPassword() {
  let validConfirmPassword = null;
  if (password.value.length === 0 && confirmPassword.value.length === 0) {
    confirmPasswordFeedback.textContent = '';
    return null;
  }

  if (password.value === confirmPassword.value) {
    confirmPasswordFeedback.textContent = 'Passwords match';
    confirmPasswordFeedback.style.color = 'green';
    validConfirmPassword = true;
  } else {
    confirmPasswordFeedback.textContent = 'Passwords do not match';
    confirmPasswordFeedback.style.color = 'red';
    validConfirmPassword = false;
  }
  
  return validConfirmPassword;
}

function validatePhoneNumber() {
  if (phoneNumber.value.length === 0) {
    return null;
  }
  
  let validPhoneNumber = phoneNumber.value.match(phoneValidationRegex);

  if (!validPhoneNumber) {
    phoneNumberFeedback.textContent = 'Please enter a valid phone number';
    phoneNumberFeedback.style.color = 'red';
    return false;
  } else {
    phoneNumberFeedback.textContent = 'Phone number is valid';
    phoneNumberFeedback.style.color = 'green';
    return true;
  }
}

function validateEmail() {
  if (email.value.length === 0) {
    return null;
  }

  let validEmail = email.value.match(emailValidationRegex);

  if (!validEmail) {
    emailFeedback.textContent = 'Please enter a valid email address';
    emailFeedback.style.color = 'red';
    return false;
  } else {
    emailFeedback.textContent = 'Email address is valid';
    emailFeedback.style.color = 'green';
    return true;
  }
}