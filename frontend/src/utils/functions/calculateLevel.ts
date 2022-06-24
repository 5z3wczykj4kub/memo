const calculateLevel = (currentExperience: number, earnedExperience = 0) => {
  const previousExperience =
    currentExperience - earnedExperience > 0
      ? currentExperience - earnedExperience
      : 0;
  const currentLevel = Math.floor(currentExperience / 6000);
  const previousLevel = Math.floor(previousExperience / 6000);
  /**
   * FIXME:
   * Don't send +600 from backend when
   * the experience limit is already reached.
   */
  const hasLeveledUp = previousLevel + 1 === currentLevel;
  const currentLevelExperience = currentExperience % 6000;
  const currentLevelProgress = `${(currentLevelExperience / 6000) * 100}%`;
  return {
    previousLevel,
    currentLevel,
    hasLeveledUp,
    currentLevelExperience,
    currentLevelProgress,
  };
};

export default calculateLevel;
