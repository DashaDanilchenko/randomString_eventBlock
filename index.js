let num 
let lettersUppercase
let lettersLowercase

$(document).ready(function() {

    $("button").click(() => {
        let number = Number($("#text").val())
        $("#num").prop('checked')? num = '0123456789': num = ''
        $("#upper").prop('checked')? upper = 'QWERTYUIOPASDFGHJKLZXCVBNM': upper = ''
        $("#lower").prop('checked')? lower = 'qwertyuiopasdfghjklzxcvbnm': lower = ''
        const receivedString = str_gen(number, num, upper, lower)
        $('#result').text(receivedString)
    })

    function str_gen(n, a, b, c) {
        allStr = a + b + c;
        let str = '';
        for (let i = 0; i < n; i++) {
            let pos = Math.floor(Math.random() * allStr.length);
            str += allStr.substring(pos,pos+1);
        }
        return str;
    }
})