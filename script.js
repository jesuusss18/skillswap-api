const button = document.getElementById("welcomeBtn");
const message = document.getElementById("message");

button.addEventListener("click", function() {
    message.textContent = "Welcome! Let's start sharing skills!";
});

const skillDetails = {
    python: "Carlos teaches Python basics, loops, and functions.",
    spanish: "Maria offers Spanish lessons for beginners.",
    math: "David helps students with algebra and math problems.",
    web: "Sofia teaches HTML, CSS, and JavaScript."
};

// Get all View Details buttons
const detailButtons = document.querySelectorAll(".details-btn");

// Add click events
detailButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const skill = button.getAttribute("data-skill");

        alert(skillDetails[skill]);
    });
});
