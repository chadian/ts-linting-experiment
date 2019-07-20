import useSparingly from './useSparingly';

console.log(useSparingly());
console.log(useSparingly());
console.log(useSparingly());
console.log(useSparingly());

// the current rule is configured for only four calls, the fifth call
// of this function will trigger a tslint error
console.log(useSparingly());
