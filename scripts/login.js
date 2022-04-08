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
let date = new Date().getFullYear();
footerPara_1.textContent = `Copyright © ${date} Luis Tamarez`
footerPara_2.textContent = "All Rights Reserved";
footer.appendChild(footerPara_1);
footer.appendChild(a);
footer.appendChild(footerPara_2)


const togglePassword = document.querySelector('.togglePassword');
const password = document.querySelector('#password');
const passwordFeedback = document.querySelector('#password-feedback');
const email = document.querySelector('#email');
const emailFeedback = document.querySelector('#email-feedback');
const inputs = document.querySelectorAll('input');
const loginForm = document.querySelector('#login-form');

const phoneValidationRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{8,14}$/g;
const emailValidationRegex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

let errorObj = {
  'email': false,
  'password': false,
};

// toggle password visibility
togglePassword.addEventListener('mousedown', function (event) {
  event.preventDefault();

  // toggle the type attribute
  const passwordType = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', passwordType);

  if ( passwordType === 'text') {
      togglePassword.textContent = ' Hide';
  }
  else {
      togglePassword.textContent = ' Show';
  } 

  // toggle the eye slash icon 
  togglePassword.classList.toggle('fa-eye-slash');          
});

inputs.forEach(input => {
  input.addEventListener('focus', () => {    
    input.classList.remove('error');
    input.classList.remove('valid');
    input.classList.add('input-focus');
  });

  input.addEventListener('blur', () => {
    input.classList.remove('input-focus');
  
    switch (input.id) {
      case 'email':
        validateEmail();
        break;
      case 'password':
        validatePassword();
        break;
        default:
          break;
    }
  });
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let currentError = Object.values(errorObj).some(value => value === true);
  if (currentError === true) {
    alert('Please fix the errors in the form');
    return;
  } else {
    window.location.href = './login-msg.html';
  }   
});

function validateEmail() {
  if (email.value.length === 0) {
    emailFeedback.textContent = '';
    email.classList.remove('valid');
    email.classList.remove('error');
    return null;
  }

  let validEmail = email.value.match(emailValidationRegex);

  if (!validEmail) {
    emailFeedback.textContent = 'Invalid Email';
    emailFeedback.style.color = 'red';
    email.classList.remove('valid');
    email.classList.add('error');
    errorObj['email'] = true;
  } else {
    emailFeedback.textContent = ''; 
    email.classList.add('valid');
    errorObj['email'] = false;
  }
}

function validatePassword() {
  if (password.value.length === 0) {
    passwordFeedback.textContent = '';
    password.classList.remove('valid');
    password.classList.remove('error');
    return null;
  }

  let validPasswordObj = {
    validLength: validateLength(),
    validSpecialChars: validateSpecialChars(),
    validNumber: validateNumber(),
    validUpperCaseChar: validateUpperCaseChar(),
    validLowerCaseChar: validateLowerCaseChar(),
  };

  let validPassword = Object.values(validPasswordObj).every(value => value === true);

  if (validPassword) {
    password.classList.add('valid');
    passwordFeedback.textContent = '';
    errorObj['password'] = false;
  } else {
    password.classList.remove('valid');
    password.classList.add('error');
    passwordFeedback.textContent = 'Invalid Password';
    passwordFeedback.style.color = 'red';
    errorObj['password'] = true;
  }
}

function validateLength() {
  if (password.value.length < 8) {
    return false;
  } else {
    return true;
  }
}

function validateSpecialChars() {
  if (password.value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
    return true;
  } else {
    return false;
  }
}

function validateNumber() {
  if (password.value.match(/[0-9]/)) {
    return true;
  } else {
    return false;
  }
}

function validateUpperCaseChar() {
  if (password.value.match(/[A-Z]/)) {
    return true;
  } else {
    return false;
  }
}

function validateLowerCaseChar() {
  if (password.value.match(/[a-z]/)) {
    return true;
  } else {
    return false;
  }
}