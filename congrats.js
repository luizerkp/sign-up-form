// adds footer content to the page
const footer = document.querySelector('.footer');
const footerPara = document.createElement('p');
let date = new Date().getFullYear();
footerPara.textContent = `Copyright © ${date} Luis Tamarez All Rights Reserved`;
footer.appendChild(footerPara);

// window.onload = function() {
//     window.setTimeout(() => {
//         window.location.href = './login.html';
//       }, 5000);
// }