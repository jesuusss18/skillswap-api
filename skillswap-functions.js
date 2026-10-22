function filterSkillsByCategory(skills, category) {
    if (category === 'ALL') {
        return skills;
    }
    return skills.filter(skill => skill.category === category);

}

module.exports = {
    filterSkillsByCategory
};