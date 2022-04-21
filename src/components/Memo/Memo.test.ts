import React from 'react';

describe('memo', () => {
  test('checks if there are any numbers within the range of [0, 30] divisible by {2, 3, 5}', () => {
    const maxNumber = 30;
    const divisors = [2, 3, 5];
    const divisibles = new Set<number>();

    for (let i = 0; i <= maxNumber; i++) {
      if (divisors.every((divisor) => i % divisor === 0)) divisibles.add(i);
    }

    // console.log('divisibles', divisibles);

    expect(divisibles.size).toBeGreaterThan(0);
  });
});
