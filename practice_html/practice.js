var letters = [1, 2, 'b', 4];

function naiveNth(a, index) {
    return a[index];
}

function isIndexed(data) {
    return _.isArray(data) || _.isString(data);
}

function nth(a, index) {
    if (!_.isNumber(index)) fail("Expected a number as the index");
    if (!isIndexed(a)) fail("Not supported on non-indexed type");
    if ((index < 0) || (index > a.length - 1)) fail("index value is out of bounds");

    return a[index];
}
console.log(nth(letters, 2));