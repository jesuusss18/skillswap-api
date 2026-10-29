const button = document.getElementById("welcomeBtn");
const message = document.getElementById("message");
const filterButtons = document.querySelectorAll(".filter-btn");
const calculateBtn = document.getElementById("calculateBtn");
const totalResult = document.getElementById("totalResult");

button.addEventListener("click", function() {
    message.textContent = "Welcome! Let's start sharing skills!";
});

async function loadSkills() {
    try {
        const data = await fetchSkills();

        availableSkills = data;

        displaySkills(availableSkills);

        return availableSkills;

    } catch (error) {
        console.error("Error loading skills:", error);
        return [];
    }
}

function displaySkills(skills) {
    const container = document.querySelector(".skills-container");

    container.innerHTML = "";

    skills.forEach(function(skill) {
        const card = document.createElement("div");
        card.className = "skill-card";

        const title = document.createElement("h3");
        title.textContent = skill.title;

        const category = document.createElement("p");
        category.textContent = "Category: " + skill.category;

        const price = document.createElement("p");
        price.textContent = "Price: $" + skill.price + "/hour";

        const detailsButton = document.createElement("button");
        detailsButton.className = "details-btn";
        detailsButton.textContent = "View Details";

        detailsButton.addEventListener("click", function() {
            alert(skill.description || "No description available.");
        });

        card.appendChild(title);
        card.appendChild(category);
        card.appendChild(price);
        card.appendChild(detailsButton);

        container.appendChild(card);
    });
}

// Add click events to filter buttons

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const category = button.dataset.category;

        const filteredSkills = filterSkillsByCategory(
            availableSkills, category
        );

        displaySkills(filteredSkills);

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

let availableSkills = [];

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


const skillForm = document.getElementById("skillForm");
const formMessage = document.getElementById("formMessage");

skillForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const skillData = {
        title: document.getElementById("skillTitle").value,
        category: document.getElementById("skillCategory").value,
        price: Number(document.getElementById("skillPrice").value),
        description: document.getElementById("skillDescription").value
    };

    try {
        await createSkill(skillData);

        formMessage.textContent = "Skill created successfully!";

        skillForm.reset();

        await loadSkills();

    } catch (error) {
        formMessage.textContent = "Error creating skill.";
    }
});

loadSkills();