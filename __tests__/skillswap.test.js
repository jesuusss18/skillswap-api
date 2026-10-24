const {filterSkillsByCategory,calculateTotalCosts, matchSkillsToUser} = require('../skillswap-functions.js');

    
const skills = [
    { title: 'Python Tutoring', category: 'Programming', price: 20 },
    { title: 'Guitar Lessons', category: 'Music', price: 15 },
    { title: 'Resume Review', category: 'Career', price: 0 },
    { title: 'Web Development', category: 'Programming', price: 25 }
];

describe('filterSkillsByCategory', () => {    
    test('filters skills by category',() => {
        const result = filterSkillsByCategory(skills, 'Programming');
        expect(result).toEqual([
            { title: 'Python Tutoring', category: 'Programming', price: 20 },
            { title: 'Web Development', category: 'Programming', price: 25 }
        ]);
    });
    test('handles ALL category',() => {
        const result = filterSkillsByCategory(skills, 'ALL');
        expect(result).toEqual(skills);
    });
    test('returns an empty array when no matches',() => {
        const result = filterSkillsByCategory(skills,"Science");
        expect(result).toEqual([]);
    });
});

describe('calculateTotalCosts', () => {
    
    test('correct value',() => {
        const result = calculateTotalCosts(15, 2);
        expect(result).toBe(30);
    });
    test('handles free sessions',() => {
        const result = calculateTotalCosts(0, 2);
        expect(result).toBe(0);
    });
    test('decimal hours',() => {
        const result = calculateTotalCosts(15, 2.5);
        expect(result).toBe(37.5);
    });
    test('handles zero hours',() => {
        const result = calculateTotalCosts(15, 0);
        expect(result).toBe(0);
    });
});

describe('matchSkillsToUser', () => {
    test('match by category and price',() => {
        const userNeeds = {
            category : "Programming",
            maxPrice : 30
        }

        const result = matchSkillsToUser(userNeeds, skills)
        expect(result).toEqual([{ title: 'Python Tutoring', category: 'Programming', price: 20 }, { title: 'Web Development', category: 'Programming', price: 25 }])
    });
    test('filters by max price',() => {
        const userNeeds = {
            category : "Programming",
            maxPrice : 20
        }

        const result = matchSkillsToUser(userNeeds, skills)
        expect(result).toEqual([{ title: 'Python Tutoring', category: 'Programming', price: 20 }])
    });
    test('returns empty array for no matches',() => {
        const userNeeds = {
            category : "Science",
            maxPrice : 20
        }

        const result = matchSkillsToUser(userNeeds, skills)
        expect(result).toEqual([])
    });
    test('include free skills',() => {
        const userNeeds = {
            category : "Career",
            maxPrice : 0
        }

        const result = matchSkillsToUser(userNeeds, skills)
        expect(result).toEqual([{ title: 'Resume Review', category: 'Career', price: 0 }])
    });
});
