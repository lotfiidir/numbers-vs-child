export default {
  apprentisage: {
    step: null,
    responses: [],
    numberA: null,
    numberB: null,
    result: null,
    arrayMulti: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    _operation: (numberA, numberB) => {
      return numberA * numberB;
    },
    done: false,
  },
  evaluation: {},
  currentNumber: null
}
