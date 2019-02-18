let word = "No pain no gain";
word = word.toUpperCase();

let word_len = word.length;
let mishit = 0;

// let yes_sound = new Audio("sounds/yes.wav");
// let no_sound = new Audio("sounds/no.wav");

let hidden_word = "";

for (i = 0; i < word_len; i++)
{
    if (word.charAt(i) === " ") hidden_word = hidden_word + " ";
    else hidden_word = hidden_word + "-";
}

function show_word()
{

    document.getElementById("board").innerHTML = hidden_word;
}

window.onload = start;


let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


function start() {

    let div_content = "";

    for (i = 0; i < 26; i++)
    {

        let element = "let" + i;
        div_content = div_content + '<div class="letter" onclick="check(' + i + ')" id="' + element + '">' + alphabet[i] + '</div>';
        if ((i + 1) % 7 === 0) div_content = div_content + '<div style="clear: both;"></div>'
    }

    document.getElementById("alphabet").innerHTML = div_content;


    show_word();
}

//podmiana litery
String.prototype.setMark = function(place, mark)
{
    if (place > this.length - 1) return this.toString();
    else return this.substr(0, place) + mark + this.substr(place + 1);
}


function check(number)
{

    let hit = false; // not hit

    for (i = 0; i < word_len; i++)
    {
        if (word.charAt(i) === alphabet[number])
        {
            hidden_word = hidden_word.setMark(i, alphabet[number]);
            hit = true; // if hit
        }
    }
    // letter hit - color green
    if (hit === true)
    {
        new Audio("sounds/yes.wav").play();
        let element = "let" + number;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";

        show_word()
    }
    // letter not hit - color red
    else
    {
        new Audio("sounds/no.wav").play();
        let element = "let" + number;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");

        // mishit number
        mishit ++;
        let image = "static/img/s" + mishit + ".jpg";
        document.getElementById("gallows").innerHTML = '<img src="'+ image +'" alt=""/>';
    }

    // WIN
    if (word === hidden_word)
    {
        document.getElementById("alphabet").innerHTML =
            '<span id="win-text">YOU WIN!</span> Correct password!<br/>' + word +
            '<br/> <br/><span class="reset" onclick="location.reload()">AGAIN?</span>';
    }

    //DEFEAT
    if (mishit >= 9)
    {
        document.getElementById("alphabet").innerHTML =
            '<span id="loss-text">YOU LOST!<br/></span> Correct password is:<br/>' + word +
            '<br/><br/><span class="reset" onclick="location.reload()">AGAIN?</span>';
    }

}