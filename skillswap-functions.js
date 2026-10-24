function filterSkillsByCategory(skills, category) {
    if (category === 'ALL') {
        return skills;
    }
    return skills.filter(skill => skill.category === category);

}

function calculateTotalCosts(hourRate, hours) {
    return hourRate * hours;
}

function matchSkillsToUser(userNeeds, skills) {
    return skills.filter(skill =>
        skill.category === userNeeds.category &&
        skill.price <= userNeeds.maxPrice
    );
}

module.exports = {
    filterSkillsByCategory,
    calculateTotalCosts,
    matchSkillsToUser
};