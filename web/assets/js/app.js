let options = ['Pirmas', 'Antras', 'Trecias', 'Ketvirtas', 'Penktas', 'Sestas'];
let colorsOdd = ['#6C5E5E', '#FF5050', '#B75555'];
let colorsEven = ['#6C5E5E', '#FF5050', '#B75555', '#8C6F6F'];
let slices = options.length;
let sliceDeg = 360/slices;
let deg = 0;
let width = canvas.width;
let ctx = canvas.getContext('2d');
let center = width/2;
let spinDeg = 0;
let mouseClicks = 0;
let spinTime = 4;
let spinDegCalc = 955;
const deg2rad = (deg) => deg * Math.PI/180;
const canvasWheel = document.querySelector('#canvas');
const answerBox = document.querySelector('#answer-box');
const textPart = document.querySelector('#popupText');
const inputField = document.querySelector('#input-field');
const clickable = document.querySelector('.insideCircle');
const applyBtn = document.querySelector('#apply-btn');
let myTimeout;
let inputCount = 3;
let colorNumber = 0;


const drawSlice = (degg, color) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(center, center);
    ctx.arc(center, center, center, deg2rad(degg - 0.5), deg2rad(degg + sliceDeg + 0.5));
    ctx.fill();
}

const drawText = (deggg, text) => {
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(deg2rad(deggg));
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fff';
    ctx.font = 'Bold 40px avantBold';
    ctx.fillText(text, 130, 10);
    ctx.restore();
}

let drawWheel = (inpDeg) => {
    if(options.length % 2 === 0){
        for(let i = 0; i < slices; i++){
            if (colorNumber >= 4){
                colorNumber = 0;
                drawSlice(inpDeg, colorsEven[colorNumber]);
                drawText(inpDeg + sliceDeg/2, options[i]);
                inpDeg += sliceDeg;
                colorNumber++;
            }
            else{
                drawSlice(inpDeg, colorsEven[colorNumber]);
                drawText(inpDeg + sliceDeg/2, options[i]);
                inpDeg += sliceDeg;
                colorNumber++;
            }
        }
    }
    else{
        for(let i = 0; i < slices; i++){
            if (colorNumber >= 3){
                colorNumber = 0;
                drawSlice(inpDeg, colorsOdd[colorNumber]);
                drawText(inpDeg + sliceDeg/2, options[i]);
                inpDeg += sliceDeg;
                colorNumber++;
            }
            else{
                drawSlice(inpDeg, colorsOdd[colorNumber]);
                drawText(inpDeg + sliceDeg/2, options[i]);
                inpDeg += sliceDeg;
                colorNumber++;
            }
        }
    }
}
drawWheel(deg);

const drawInputs = () => {
    for(i = 1; i <= inputCount; i++){
        inputField.insertAdjacentHTML("beforeend", `<input id="input${i}">`)
    }
}



drawInputs();

const resultText = () => {
    let r = spinDeg % 360;
    r = Math.floor(r / sliceDeg);
    return options[r];
}

const randomR = () => {

    switch (Math.floor(Math.random() * Math.floor(7))) {
        case 0:
            spinTime *= 0.7;
            spinDegCalc *= 0.7;
            break;
        case 1:
            spinTime *= 0.8;
            spinDegCalc *= 0.8;
            break;
        case 2:
            spinTime *= 0.9;
            spinDegCalc *= 0.9;
            break;
        case 3:
            spinTime *= 1.0;
            spinDegCalc *= 1.0;
            break;
        case 4:
            spinTime *= 1.1;
            spinDegCalc *= 1.1;
            break;
        case 5:
            spinTime *= 1.2;
            spinDegCalc *= 1.2;
            break;
        case 6:
            spinTime *= 1.3;
            spinDegCalc *= 1.3;
            break;
    }
}


clickable.addEventListener("click", function() {
    clearTimeout(myTimeout);
    randomR();
    answerBox.style.display = 'none'

    spinDeg += spinDegCalc;
    let rr = resultText();
    textPart.innerHTML = rr;

    canvasWheel.style.transition = `all ${spinTime}s cubic-bezier(.17,.74,.29,1.00) 0s`;
    canvasWheel.style.transform = `rotate(-${spinDeg}deg)`;

    myTimeout = setTimeout(function() { answerBox.style.display = 'inline-block' }, spinTime*1000);

    spinDegCalc = 960;
    spinTime = 4;
});

answerBox.addEventListener("click", function() {
    clearTimeout(myTimeout);
    randomR();
    answerBox.style.display = 'none'

    spinDeg += spinDegCalc;
    let rr = resultText();
    textPart.innerHTML = rr;

    canvasWheel.style.transition = `all ${spinTime}s cubic-bezier(.17,.74,.29,1.00) 0s`;
    canvasWheel.style.transform = `rotate(-${spinDeg}deg)`;

    myTimeout = setTimeout(function() { answerBox.style.display = 'inline-block' }, spinTime*1000);

    spinDegCalc = 960;
    spinTime = 4;
});

$('#input-field').on('click, focus', 'input:last-child', function(){
    inputCount += 1;
    const input = `<input>`;
    $(input).attr({
        id: `input${inputCount}`,
    }).appendTo($(this).parent());
});

$('#apply-btn').on('click', function(){
    options = [];
    for(i = 0; i < inputCount; i++){
        if(document.getElementById(`input${i+1}`).value == '' || document.getElementById(`input${i+1}`).value === undefined){}
        else{
            options.push(document.getElementById(`input${i+1}`).value);
        }
    }
    slices = options.length;
    sliceDeg = 360/slices;
    drawWheel(deg);
});

$('#clr-btn').on('click', function() {
    $('#input-field').children().remove();
    inputCount = 5;
    drawInputs();
});
