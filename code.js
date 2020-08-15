import Game from './Game.js';

const move = 20;
let mobile = "";

function selectMode(event) {
    const target = event.target.classList;
    mobile = (Math.floor(Math.floor(screen.width) / 10) * 10) - 20;
    if (mobile % move !== 0) {
        mobile -= 10;
    }
    if (mobile > 400) mobile = 400
    if (target.contains("mobile")) {
        new Game(1, 0, 20, mobile, mobile, "down", move, "mobile");
    } else if (target.contains("desktop")) {
        new Game(1, 0, 20, 400, 400, "down", move, "desktop");
    }
    document.querySelector(".loader").classList.add("hide");
}

const loader = () => {
    const buttons = document.querySelectorAll(".version");
    console.log(buttons);
    buttons.forEach(button => {
        button.addEventListener("click", selectMode);
    })

}
loader()

