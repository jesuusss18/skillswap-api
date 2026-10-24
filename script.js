const button = document.getElementById("welcomeBtn");
const message = document.getElementById("message");
const filterButtons = document.querySelectorAll(".filter-btn");
const skillCards = document.querySelectorAll(".skill-card");

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
// Get the categories from the HTML cards
const skills = Array.from(skillCards).map(card => {
    return {
        category: card.dataset.category,
        element: card
    };
});

// Add click events to filter buttons
filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const category = button.dataset.category;

        // Use our tested function
        const filteredSkills = filterSkillsByCategory(skills, category);

        // Hide all cards
        skillCards.forEach(function(card) {
            card.style.display = "none";
        });

        // Show matching cards
        filteredSkills.forEach(function(skill) {
            skill.element.style.display = "block";
        });

        // Highlight selected button
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
    });
});