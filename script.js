let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`header nav a[href*='${id}']`).classList.add('active');
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email :${email.value}<br> Phone Number : ${phone.value}<br> Message :${message.value}`;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "raghav0623.tech@gmail.com",
        Password: "23DC3257A0F252709A2B8E57B04DF228C4B0",
        To: 'raghav0623.tech@gmail.com',
        From: 'raghav0623.tech@gmail.com',
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Success!",
                    text: "Mail sent successfully!",
                    icon: "success"
                });
            }
        }
    );
}
function checkInputs() {
    const items = document.querySelectorAll(".item");

    items.forEach(item => {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if(items[1].value !=""){
            checklEmail();
        }

        items[1].addEventListener("keyup",()=>{
            checklEmail();
        })

        item.addEventListener("keyup", () => {
            if (item.value !== "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    });
}

function checklEmail() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const errorTxtEmail=document.querySelector(".error-txt.email");


    if(!email.value.match(emailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if(email.value !=""){
            errorTxtEmail.innerText = "Enter a valid Email address";
        }
        else{
            errorTxtEmail.innerText = "Email Address can't be blank";
        }

    }
    else{
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }

}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
    

    if(!fullName.classList.contains("error")&& !email.classList.contains("error")&& !phone.classList.contains("error")&& !message.classList.contains("error")){
        sendEmail();    }
});