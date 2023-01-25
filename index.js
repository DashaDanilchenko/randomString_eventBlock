const num = '0123456789'
const lettersUppercase = 'QWERTYUIOPASDFGHJKLZXCVBNM'
const lettersLowercase = 'qwertyuiopasdfghjklzxcvbnm'

console.log(pass_gen(6, num))
console.log(pass_gen(12, num, lettersUppercase))
console.log(pass_gen(32, num, lettersUppercase, lettersLowercase))
function pass_gen(len, a, b, c) {
    chrs = a+b+c;
    var str = '';
    for (var i = 0; i < len; i++) {
        var pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos,pos+1);
    }
    return str;
}