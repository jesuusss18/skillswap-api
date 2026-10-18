
const button = document.getElementById("welcomeBtn");
const message = document.getElementById("message");

button.addEventListener("click", function() {
    message.textContent = "Welcome! Let's start sharing skills!";
});
