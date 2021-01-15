function parseAge(age) {
    if (!_.isString(age)) throw new Error("스트링이 아님");
    var a;
    console.log("Attempting to parse an age");
    a = parseInt(age, 10);
    if (_.isNaN(a)) {
        console.log(["could not parse age :", age].join(' '));
        a = 0;
    }
    return a;
}
var ddd = parseAge("&*#^%$");
console.log(ddd);