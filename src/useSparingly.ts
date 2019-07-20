let count = 0;

export default function useSparingly():Number {
  count++;
  return count;
}

useSparingly();
console.log(`We've used useSparingly ${count} times`);
