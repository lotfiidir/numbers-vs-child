export default {
  apprentisage: {
    step: 1,
    responses: [],
    numberA: null,
    numberB: null,
    result: null,
    arrayMulti: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    _operation: (numberA, numberB) => {
      return numberA * numberB;
    },
    done: false,
    isCorrect: false,
    isNotCorrect: false,
    currentTime:[],
  },
  evaluation: {}
}
