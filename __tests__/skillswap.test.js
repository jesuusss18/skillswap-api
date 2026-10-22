const {filterSkillsByCategory} = require('../skillswap-functions.js');

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
        const result = filterSkillsByCategory(skills, 'ALL');
        expect(result).toEqual([]);
    });

    });



});