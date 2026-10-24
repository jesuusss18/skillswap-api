const button = document.getElementById("welcomeBtn");
const message = document.getElementById("message");
const filterButtons = document.querySelectorAll(".filter-btn");
const skillCards = document.querySelectorAll(".skill-card");
const calculateBtn = document.getElementById("calculateBtn");
const totalResult = document.getElementById("totalResult");

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

calculateBtn.addEventListener("click", function() {
    const rateInput = document.getElementById("rate").value;
    const hoursInput = document.getElementById("hours").value;

    if (rateInput === "" || hoursInput === "") {
        totalResult.textContent = "Please enter rate and hours.";
        return;
    }

    const rate = Number(rateInput);
    const hours = Number(hoursInput);

    if (!Number.isFinite(rate) || !Number.isFinite(hours)
        || rate < 0 || hours < 0) {
        totalResult.textContent = "Please enter valid positive numbers.";
        return;
    }

    const total = calculateTotalCosts(rate, hours);

    totalResult.textContent = "Total Cost: $" + total.toFixed(2);
});

// Find My Match
const matchBtn = document.getElementById("matchBtn");
const matchResults = document.getElementById("matchResults");

const availableSkills = [
    { title: "Python Tutoring", category: "Programming", price: 20 },
    { title: "Web Development", category: "Programming", price: 25 },
    { title: "Guitar Lessons", category: "Music", price: 15 },
    { title: "Resume Review", category: "Career", price: 0 }
];

matchBtn.addEventListener("click", function() {

    const category = document.getElementById("matchCategory").value;
    const priceInput = document.getElementById("maxPrice").value;

    if (priceInput === "") {
        matchResults.textContent = "Please enter your maximum budget.";
        return;
    }

    const maxPrice = Number(priceInput);

    if (!Number.isFinite(maxPrice) || maxPrice < 0) {
        matchResults.textContent = "Please enter a valid budget.";
        return;
    }

    const userNeeds = {
        category: category,
        maxPrice: maxPrice
    };

    // Call the function tested with Jest
    const matches = matchSkillsToUser(userNeeds, availableSkills);

    matchResults.innerHTML = "";

    if (matches.length === 0) {
        matchResults.textContent = "No matching skills found.";
        return;
    }

    matches.forEach(function(skill) {
        const card = document.createElement("div");
        card.className = "match-card";

        const title = document.createElement("h3");
        title.textContent = skill.title;

        const price = document.createElement("p");
        price.textContent = "Price: $" + skill.price + "/hour";

        card.appendChild(title);
        card.appendChild(price);

        matchResults.appendChild(card);
    });
});
