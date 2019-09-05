import dontUseMeTooOften from './someCrazyImplementation';

console.log(dontUseMeTooOften());
console.log(dontUseMeTooOften());
console.log(dontUseMeTooOften());
console.log(dontUseMeTooOften());

// the current rule is configured for only four calls,
// the fifth call of this function will trigger a tslint error
console.log(dontUseMeTooOften());