import calculateLevel from '../utils/functions/calculateLevel';

test('calculates current level info', () => {
  expect(calculateLevel(0, 600)).toStrictEqual({
    previousLevel: 0,
    currentLevel: 0,
    hasLeveledUp: false,
    currentLevelExperience: 0,
    currentLevelProgress: '0%',
  });
  expect(calculateLevel(600, 600)).toStrictEqual({
    previousLevel: 0,
    currentLevel: 0,
    hasLeveledUp: false,
    currentLevelExperience: 600,
    currentLevelProgress: '10%',
  });
  expect(calculateLevel(6000, 600)).toStrictEqual({
    previousLevel: 0,
    currentLevel: 1,
    hasLeveledUp: true,
    currentLevelExperience: 0,
    currentLevelProgress: '0%',
  });
  expect(calculateLevel(7200, 1200)).toStrictEqual({
    previousLevel: 1,
    currentLevel: 1,
    hasLeveledUp: false,
    currentLevelExperience: 1200,
    currentLevelProgress: '20%',
  });
  expect(calculateLevel(12000, 1800)).toStrictEqual({
    previousLevel: 1,
    currentLevel: 2,
    hasLeveledUp: true,
    currentLevelExperience: 0,
    currentLevelProgress: '0%',
  });
  expect(calculateLevel(12000, 0)).toStrictEqual({
    previousLevel: 2,
    currentLevel: 2,
    hasLeveledUp: false,
    currentLevelExperience: 0,
    currentLevelProgress: '0%',
  });
  expect(calculateLevel(12600, 600)).toStrictEqual({
    previousLevel: 2,
    currentLevel: 2,
    hasLeveledUp: false,
    currentLevelExperience: 600,
    currentLevelProgress: '10%',
  });
  expect(calculateLevel(18600, 1200)).toStrictEqual({
    previousLevel: 2,
    currentLevel: 3,
    hasLeveledUp: true,
    currentLevelExperience: 600,
    currentLevelProgress: '10%',
  });
});
