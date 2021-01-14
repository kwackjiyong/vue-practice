function highlow(x, y) {
    if (x < y) return -1;
    if (y < x) return 1;
    return 0
}


var array_result = [2, 3, 12, -43, -4, 44, 432].sort(highlow);

console.log(array_result);