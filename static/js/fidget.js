let poppedColor = '';
let count = 0;
const colors = [
    'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure',
    'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue',
    'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse',
    'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson',
    'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGreen',
    'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid',
    'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray',
    'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray',
    'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia',
    'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray',
    'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed',
    'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush',
    'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan',
    'LightGoldenRodYellow', 'LightGray', 'LightGreen', 'LightPink', 'LightSalmon',
    'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSteelBlue', 'LightYellow',
    'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon',
    'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen',
    'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue',
    'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy',
    'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed',
    'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed',
    'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum',
    'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown',
    'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen',
    'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue',
    'SlateGray', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan',
    'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet',
    'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen' 
];
//red.style.setProperty('--animation-time', time +'s');
const stressBall = document.getElementById("stressBall");
const countElement = document.getElementById("count");
  
function changeAnimationTime() {
    stressBall.style.setProperty('--random-animation-time', (Math.random() * 0.1) +'s');
}
  
setInterval(changeAnimationTime, 1000);
function playPopSound() {
    const popSound = document.getElementById('popSound');
    popSound.currentTime = 0; // Reset the sound to the beginning
    popSound.play();
}

function playClickSound() {
    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0; // Reset the sound to the beginning
    clickSound.play();
}
function pop (item) {
    if (item.className == "popped") return;
    playPopSound();
    item.className = "popped"
    color = randomColor()
    item.style.background = "color-mix(in srgb, var(--gray-800) 20%, " + color + " 80%)";
    item.style.borderColor = color;
    count++;
    if (count > 1) countElement.innerHTML = count + " Clicks";
    else countElement.innerHTML = count + " Click";
    resetBubble(item);
}
function randomColor () {

    for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
    }
    return colors[Math.floor(Math.random() * colors.length)];
    
}
function resetBubble(item) {
    setTimeout( () => {
        item.className = "bubble";
        playClickSound();
        item.style.background= "linear-gradient(275deg, white, var(--bubble-color))";

    }, 1750);

}
let rotationSpeed = 5; // Initial rotation speed
let rotationDuration = 5000; // Initial rotation duration in milliseconds
let isSpinning = false;

function startSpinning(event) {
    if (!isSpinning) {
        isSpinning = true;
        spin();
        document.addEventListener('mousemove', handleMouseMove);
    }
}

function stopSpinning() {
    isSpinning = false;
    document.removeEventListener('mousemove', handleMouseMove);
}

function handleMouseMove(event) {
    if (isSpinning) {
        // Adjust rotation speed and duration based on mouse position
        const spinner = document.getElementById('spinner');
        const distance = Math.sqrt(
            Math.pow(event.clientX - spinner.offsetLeft - spinner.offsetWidth / 2, 2) +
            Math.pow(event.clientY - spinner.offsetTop - spinner.offsetHeight / 2, 2)
        );

        rotationSpeed = Math.max(1, 10 - distance / 50);
        rotationDuration = Math.max(1000, 5000 - distance * 10);
    }
}

function spin() {
    const spinner = document.querySelector('.spinner-container');
    const blades = document.querySelectorAll('.blade');

    // Clear previous animation on the spinner and blades
    spinner.style.animation = 'none';
    blades.forEach((blade, index) => {
        blade.style.animation = 'none';
    });

    // Apply new keyframe animations to each blade
    blades.forEach((blade, index) => {
        const bladeRotation = (index * 25) + 10; // Adjust the rotation of each blade
        blade.style.animation = `spin-blade ${rotationDuration / 5000}s cubic-bezier(0.1, 0.5, 0.4, 1) infinite`;
        blade.style.animationPlayState = 'running';
        blade.style.animationTimingFunction = 'cubic-bezier(0.1, 0.5, 0.4, 1)';
        blade.style.animationDuration = `${rotationDuration / 5000}s`;
        blade.style.transform = `rotate(${bladeRotation}deg)`;
    });

    // Apply new animation properties to the spinner
    spinner.style.animation = `spin ${rotationDuration / 1000}s cubic-bezier(0.1, 0.5, 0.4, 1) infinite`;
    spinner.style.animationPlayState = 'running';
    spinner.style.animationTimingFunction = 'cubic-bezier(0.1, 0.5, 0.4, 1)';
    spinner.style.animationDuration = `${rotationDuration / 5000}s`;

    // Gradually decrease rotation speed and duration
    rotationSpeed *= 0.9;
    rotationDuration *= 1.1;

    // Continue spinning if still active
    if (isSpinning) {
        requestAnimationFrame(spin);
    }
}

function createSand(event) {
    const sandContainer = document.getElementById('sandContainer');
    const sand = document.createElement('div');
    sand.classList.add('sand');

    const containerRect = sandContainer.getBoundingClientRect();

    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;

    sand.style.left = `${x}px`;
    sand.style.top = `${y}px`;

    sandContainer.appendChild(sand);

    // Remove sand after a short delay (simulating interaction)
    setTimeout(() => {
        sand.remove();
    }, 500);
}


let isSqueezed = false;

function squeezeBall() {
    const stressBall = document.getElementById('stressBall');
    isSqueezed = true;
    stressBall.style.animation = 'squeezeAndShake 0.5s infinite';
}

function releaseBall() {
    if (isSqueezed) {
        const stressBall = document.getElementById('stressBall');
        isSqueezed = false;
        stressBall.style.animation = 'none';
    }
}


function moveSlime(event) {
    const slimeContainer = document.getElementById('slimeContainer');
    const slime = document.querySelector('.slime');

    const containerRect = slimeContainer.getBoundingClientRect();

    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;

    const translateX = (x / containerRect.width) * 100;
    const translateY = (y / containerRect.height) * 100;

    slime.style.transform = `translate(${translateX}%, ${translateY}%)`;
}