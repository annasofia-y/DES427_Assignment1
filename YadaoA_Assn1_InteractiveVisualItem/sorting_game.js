let bg;
// let y = 0;
let myFont;

let binAudio;
let bgAudio;
let muteButton;

let paperballImage;
let coffeebeansImage;
let redcupImage;

let recycleBinImage;
let compostBinImage;
let landfillBinImage;

let xPaperBall, yPaperBall, wPaperBall, hPaperBall; 
let xCoffeeBeans, yCoffeeBeans, wCoffeeBeans, hCoffeeBeans; 
let xRedCup, yRedCup, wRedCup, hRedCup;
let xRecycleBin, yRecycleBin, wRecycleBin, hRecycleBin; 
let xCompostBin, yCompostBin, wCompostBin, hCompostBin; 
let xLandfillBin, yLandfillBin, wLandfillBin, hLandfillBin;

let offsetXPaperBall, offsetYPaperBall;
let offsetXCoffeeBeans, offsetYCoffeeBeans;
let offsetXRedCup, offsetYRedCup;

let isMuted = false;

let draggingPaperBall = false;
let draggingCoffeeBeans = false;
let draggingRedCup = false;

let placedCoffeeBeansInBin = false;
let placedPaperBallInBin = false;
let placedRedCupInBin = false;

let resetButton;
/* let resetButtonImg;
let resetButtonHoverImg; */

function preload() {
    paperballImage = loadImage("crumpledpaper.png");
    coffeebeansImage = loadImage("coffeebeanbundle.png");
    redcupImage = loadImage("redsolocup.png");

    recycleBinImage = loadImage("recycleBin.png");
    compostBinImage = loadImage("compostBin.png");
    landfillBinImage = loadImage("landfillBin.png");

    binAudio = loadSound("crumpleSound.mp3");
    bgAudio = loadSound("birdAmbience.wav");
    mutedImg = loadImage("muted.png");
    unmutedImg = loadImage("unmuted.png");

    resetButtonImg = loadImage("resetButton.png");
    resetButtonHoverImg = loadImage("resetButtonHover.png");

    myFont = loadFont("Gabarito-VariableFont_wght.ttf");
}

function setup() {

    createCanvas(900, 750);

    let buttonSize = 50;
    let buttonX = 20;
    let buttonY = 20;
    
    let button = createButton("");
    button.position(buttonX, buttonY);
    button.size(buttonSize, buttonSize);
    button.style('background', 'none');
    button.style('border', 'none');
    button.style('cursor', 'pointer');  
    button.mousePressed(toggleMute);

    if (isMuted) {
        button.html('<img src="muted.png" width="50" height="50">');
    } else {
        button.html('<img src="unmuted.png" width="50" height="50">');
    }

    bgAudio.loop();
    bgAudio.setVolume(0.3);
    binAudio.setVolume(0.15);

    let resetButtonSizeW = 100;
    let resetButtonSizeH = 32;
    let resetButtonX = 755;
    let resetButtonY = 25;

    resetButton = createButton("");
    resetButton.position(resetButtonX, resetButtonY);
    resetButton.size(resetButtonSizeW, resetButtonSizeH);
    resetButton.style('background', 'none');
    resetButton.style('border', 'none');
    resetButton.style('cursor', 'pointer'); 
    resetButton.mousePressed(resetGame);

   /*  resetButton.mouseOver(changeResetButton);
    resetButton.mouseOut(resetButtonImage); */

    resetButton.html('<img src="resetButton.png" width="125" height "125">');

    
    bg = loadImage("bgImage.jpeg");

    xPaperBall = 120;
    yPaperBall = 150;
    wPaperBall = 100;
    hPaperBall = 100;

    xCoffeeBeans = 370;
    yCoffeeBeans = 150;
    wCoffeeBeans = 140;
    hCoffeeBeans = 100;

    xRedCup = 670;
    yRedCup = 150;
    wRedCup = 100;
    hRedCup = 120;

    xRecycleBin = 350;
    yRecycleBin = 375;
    wRecycleBin = 200;
    hRecycleBin = 350;

    xCompostBin = 75;
    yCompostBin = 375;
    wCompostBin = 200;
    hCompostBin = 335;

    xLandfillBin = 625;
    yLandfillBin = 375;
    wLandfillBin = 200;
    hLandfillBin = 350;

}

function toggleMute() {
    let button = select('button');
    isMuted = !isMuted;
    
    if (isMuted) {
        bgAudio.pause();
        button.html('<img src="muted.png" width="50" height="50">');
    } else {
        bgAudio.play();
        button.html('<img src="unmuted.png" width="50" height="50">');
    }  

}  


function draw() {
    background(bg);

    image(recycleBinImage, xRecycleBin, yRecycleBin, wRecycleBin, hRecycleBin);
    image(compostBinImage, xCompostBin, yCompostBin, wCompostBin, hCompostBin);
    image(landfillBinImage, xLandfillBin, yLandfillBin, wLandfillBin, hLandfillBin);

//draw objects if not placed in its appropriate bin
    if (!placedRedCupInBin) {
        image(redcupImage, xRedCup, yRedCup, wRedCup, hRedCup);
    }

    if (!placedCoffeeBeansInBin) {
        image(coffeebeansImage, xCoffeeBeans, yCoffeeBeans, wCoffeeBeans, hCoffeeBeans);
    }

    if (!placedPaperBallInBin) {
        image(paperballImage, xPaperBall, yPaperBall, wPaperBall, hPaperBall);
    }

//placed in bin?
    if (
        xCoffeeBeans > xCompostBin &&
        xCoffeeBeans + wCoffeeBeans < xCompostBin + wCompostBin &&
        yCoffeeBeans > yCompostBin &&
        yCoffeeBeans + hCoffeeBeans < yCompostBin + hCompostBin
    ) {
        placedCoffeeBeansInBin = true;
    }

    if (
        xPaperBall > xRecycleBin &&
        xPaperBall + wPaperBall < xRecycleBin + wRecycleBin &&
        yPaperBall > yRecycleBin &&
        yPaperBall + hPaperBall < yRecycleBin + hRecycleBin
    ) {
        placedPaperBallInBin = true;
        
    }

    if (
        xRedCup > xLandfillBin && 
        xRedCup + wRedCup < xLandfillBin + wLandfillBin &&
        yRedCup > yLandfillBin && 
        yRedCup + hRedCup < yLandfillBin + hLandfillBin
    ) {
        placedRedCupInBin = true;
    }

    let message = "";
    if (placedCoffeeBeansInBin && placedPaperBallInBin && placedRedCupInBin) {
        message = "All items were placed in the correct bins!";
    } else if (placedCoffeeBeansInBin) {
            message = "Coffee Beans - Correct";
    } else if (placedPaperBallInBin) {
        message = "Paper Ball - Correct";
    } else if (placedRedCupInBin) {
        message = "Red Cup - Correct";
    } 
    
    textFont(myFont);
    textSize(25);
    fill("black");
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(message, width/2, 100);

//instructions display
    let instructions = "Drag the trash to the appropriate bin.";
    textSize(25);
    textAlign(CENTER, CENTER);
    text(instructions, width/2, 35);
    fill("#433633");
}

function mousePressed() {
    if (
        mouseX > xCoffeeBeans &&
        mouseX < xCoffeeBeans + wCoffeeBeans &&
        mouseY > yCoffeeBeans &&
        mouseY < yCoffeeBeans + hCoffeeBeans
    ) {
        draggingCoffeeBeans = true;
        offsetXCoffeeBeans = xCoffeeBeans - mouseX;
        offsetYCoffeeBeans = yCoffeeBeans - mouseY;
    }

    // Check if the paper ball image is clicked
    if (
        mouseX > xPaperBall &&
        mouseX < xPaperBall + wPaperBall &&
        mouseY > yPaperBall &&
        mouseY < yPaperBall + hPaperBall
    ) {
        draggingPaperBall = true;
        offsetXPaperBall = xPaperBall - mouseX;
        offsetYPaperBall = yPaperBall - mouseY;
    } 
    if (
        mouseX > xRedCup &&
        mouseX < xRedCup + wRedCup &&
        mouseY > yRedCup &&
        mouseY < yRedCup + hRedCup
    ) {
        draggingRedCup = true;
        offsetXRedCup = xRedCup - mouseX;
        offsetYRedCup = yRedCup - mouseY;
    }
}

function mouseDragged() {
    // Move the objects if they are being dragged
    if (draggingCoffeeBeans) {
        xCoffeeBeans = mouseX + offsetXCoffeeBeans;
        yCoffeeBeans = mouseY + offsetYCoffeeBeans;
    }

    if (draggingPaperBall) {
        xPaperBall = mouseX + offsetXPaperBall;
        yPaperBall = mouseY + offsetYPaperBall;
    }

    if (draggingRedCup) {
        xRedCup = mouseX + offsetXRedCup;
        yRedCup = mouseY + offsetYRedCup;
    }
}

function mouseReleased() {
    draggingCoffeeBeans = false;
    draggingPaperBall = false;
    draggingRedCup = false;

    if (
        xCoffeeBeans > xCompostBin &&
        xCoffeeBeans + wCoffeeBeans < xCompostBin + wCompostBin &&
        yCoffeeBeans > yCompostBin &&
        yCoffeeBeans + hCoffeeBeans < yCompostBin + hCompostBin
    ) {
        placedCoffeeBeansInBin = true;
        binAudio.play();
    } else {
        placedCoffeeBeansInBin = false;
    }

    if (
        xPaperBall > xRecycleBin &&
        xPaperBall + wPaperBall < xRecycleBin + wRecycleBin &&
        yPaperBall > yRecycleBin &&
        yPaperBall + hPaperBall < yRecycleBin + hRecycleBin
    ) {
        placedPaperBallInBin = true;
        binAudio.play();
    } else {
        placedPaperBallInBin = false;
    }

    if (
        xRedCup > xLandfillBin && xRedCup + wRedCup < xLandfillBin + wLandfillBin &&
        yRedCup > yLandfillBin && yRedCup + hRedCup < yLandfillBin + hLandfillBin
    ) {
        placedRedCupInBin = true;
        binAudio.play();
    } else {
        placedRedCupInBin = false;
    }
}

/* function changeResetButton() {
    resetButton.html('<img src="resetButtonHover.png" width="125" height="125">');
}

function resetButtonImage() {
    resetButton.html('<img src="resetButton.png" width="125" height="125">');
} */

function resetGame() {
    placedCoffeeBeansInBin = false;
    placedPaperBallInBin = false;
    placedRedCupInBin = false;

    xCoffeeBeans = 370;
    yCoffeeBeans = 150;
    xPaperBall = 120;
    yPaperBall = 150;
    xRedCup = 670;
    yRedCup = 150;

    binAudio.stop();

    clear();

    background(bg);
    image(recycleBinImage, xRecycleBin, yRecycleBin, wRecycleBin, hRecycleBin);
    image(compostBinImage, xCompostBin, yCompostBin, wCompostBin, hCompostBin);
    image(landfillBinImage, xLandfillBin, yLandfillBin, wLandfillBin, hLandfillBin);
}
