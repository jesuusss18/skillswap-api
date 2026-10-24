const {filterSkillsByCategory,calculateTotalCosts} = require('../skillswap-functions.js');

describe('filterSkillsByCategory', () => {
    const skills = [
        { title: 'Python Tutoring', category: 'Programming', price: 20 },
        { title: 'Guitar Lessons', category: 'Music', price: 15 },
        { title: 'Resume Review', category: 'Career', price: 0 },
        { title: 'Web Development', category: 'Programming', price: 25 }
        ];
    
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
 


