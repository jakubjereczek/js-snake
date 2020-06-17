const game = new Game(11, 10, 20, 400, 400, "down", 10);


// const character = document.querySelector("#character");
// const board = document.querySelector("#board");
// const score = document.querySelector(".score");

// let cords = [];

// let x, y, boardX, boardY;

// let move = 10;
// let point = 1;

// let whereGo = "down";

// const changePosition = (e) => {
//     const key = e.keyCode;

//     switch (key) {
//         case 37:
//             if (whereGo == "right") {
//                 break;
//             }
//             whereGo = "left"
//             break;
//         case 38:
//             if (whereGo == "down") {
//                 break;
//             }
//             whereGo = "up";
//             break;
//         case 39:
//             if (whereGo == "left") {
//                 break;
//             }
//             whereGo = "right";
//             break;
//         case 40:
//             if (whereGo == "up") {
//                 break;
//             }
//             whereGo = "down";
//             break;
//     }
// }

// let color = true;

// const movePosition = () => {
//     if (whereGo == "left") {
//         if (x < move) {
//             x = boardX;
//         }
//         x -= move;
//     } else if (whereGo == "up") {
//         if (y < move) {
//             y = boardY;
//         }
//         y -= move;
//     } else if (whereGo == "right") {
//         if (x > (boardX - (2 * move))) {
//             x = 0;
//         }
//         x += move;
//     } else if (whereGo == "down") {
//         if (y > (boardY - (2 * move))) {
//             y = 0;
//         }
//         y += move;
//     }
//     cords.push(x);
//     cords.push(y);

//     if (point > 0) {
//         const newChain = document.createElement("div");
//         newChain.classList.add("chain");
//         newChain.style.left = `${cords[(cords.length-4)]}px`;
//         newChain.style.top = `${cords[(cords.length-3)]}px`;
//         newChain.style.height = "10px";
//         newChain.style.width = "10px";

//         if (color) {
//             newChain.style.backgroundImage = `url("img/chain.png")`;
//             console.log('x');

//         } else {
//             newChain.style.backgroundImage = `url("img/chain2.png")`;
//             console.log('x2');
//         }
//         color = !color;

//         board.appendChild(newChain);

//         const chainItems = document.querySelectorAll(".chain");

//         checkColision();

//         if (chainItems.length > 1) {
//             if (chainItems.length > point) {
//                 let first = chainItems[0];
//                 first.remove();
//             }
//         }
//     }
//     character.style.left = `${x}px`;
//     character.style.top = `${y}px`;

//     if ((x >= xGen - move && x <= xGen + move) && (y >= yGen - move && y <= yGen + move)) {
//         console.log('zebrano');
//         deleteLastElement();
//     }
//     setTimeout(movePosition, 100);
// }

// let activeElement = false;
// let xGen, yGen;

// const generatePoint = () => {
//     deleteLastElement();

//     activeElement = true;

//     xGen = Math.round(Math.floor(Math.random() * (boardX - move) / 10) * 10);
//     yGen = Math.round(Math.floor(Math.random() * (boardY - move) / 10) * 10);

//     console.log("TEST: Wygenerowane koordonaty " + xGen + " " + yGen);

//     const chainItems = document.querySelectorAll(".chain");

//     for (let i = 0; i < chainItems.length; i++) {
//         if ((`${xGen}px` == chainItems[i].style.left) && (`${yGen}px` == chainItems[i].style.top)) {
//             activeElement = false;
//             console.log('Blokada generowania na postaci');
//             generatePoint();
//             return;
//         }
//     }
//     if ((x == xGen && y == yGen)) {
//         activeElement = false;
//         generatePoint();
//         console.log("Blisko postaci, generuje nowy.");
//         return;
//     }



//     const newElement = document.createElement("div");
//     newElement.classList.add("last");
//     newElement.style.height = "10px";
//     newElement.style.width = "10px";
//     newElement.style.left = `${xGen}px`;
//     newElement.style.top = `${yGen}px`;
//     newElement.style.position = "relative";

//     newElement.style.backgroundColor = "green";
//     board.appendChild(newElement);
// }

// const deleteLastElement = () => {
//     if (activeElement) {
//         point++;
//         const lastElement = document.querySelector(".last");
//         activeElement = false;
//         lastElement.remove();
//         generatePoint();
//         setScore(point);
//     }
// }

// const checkColision = () => {
//     const chainItems = document.querySelectorAll(".chain");

//     for (let i = 0; i < chainItems.length; i++) {
//         if ((`${x}px` == chainItems[i].style.left) && (`${y}px` == chainItems[i].style.top)) {
//             let how = chainItems.length - (chainItems.length - i);
//             console.log(how);
//             if (how > 0) {
//                 for (let j = 0; j < how; j++) {

//                     let first = chainItems[j];
//                     first.remove();
//                     point--;
//                     console.log('NASTĄPIŁA KOLIZJA');
//                 }
//                 setScore(point);
//             }
//         }
//     }
// }

// const setScore = (how) => {
//     let textScore = "wynik: " + how;
//     score.textContent = textScore;
// }

// const init = () => {
//     x = 0;
//     y = 0;
//     boardX = 400;
//     boardY = 400;

//     character.style.left = `${x}px`;
//     character.style.top = `${y}px`;
//     board.style.width = `${boardX}px`;
//     board.style.height = `${boardY}px`;
//     board.style.left = `${x}px`;
//     board.style.top = `${y}px`;

//     generatePoint();
//     movePosition();
//     setScore(point);
// }

// init();

// window.addEventListener('keydown', changePosition);