function filterSkillsByCategory(skills, category) {
    if (category === 'ALL') {
        return skills;
    }
    return skills.filter(skill => skill.category === category);

}

function calculateTotalCosts(hourRate, hours) {
    return hourRate * hours;
}

module.exports = {
    filterSkillsByCategory,
    calculateTotalCosts
};