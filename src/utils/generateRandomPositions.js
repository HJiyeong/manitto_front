export const generateRandomPositions = (count) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    positions.push({
      top: `calc(50% + ${Math.random() * 50 - 40}%)`, // 50% 기준으로 위아래 -20% ~ +20% 퍼지게
      left: `calc(50% + ${Math.random() * 50 - 40}%)`, // 50% 기준으로 좌우 -20% ~ +20% 퍼지게
    });
  }
  return positions;
};