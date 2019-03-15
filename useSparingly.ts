let count = 0;

export default function useSparingly():Number {
  count++;
  return count;
}

console.log(useSparingly());