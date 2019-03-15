"use strict";
exports.__esModule = true;
var count = 0;
function useSparingly() {
    count++;
    return count;
}
exports["default"] = useSparingly;
console.log(useSparingly());
