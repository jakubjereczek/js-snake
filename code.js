import Game from './Game.js';

function selectMode(event) {
    let mobile = (Math.floor(Math.floor(screen.width) / 10) * 10) - 20;
    (mobile > 400) ? mobile = 400 : null;
    const target = event.target.classList;
    if (target.contains("mobile")) {
        new Game(1, 10, 20, mobile, mobile, "down", 10, "mobile");
    } else if (target.contains("desktop")) {
        new Game(1, 10, 20, 400, 400, "down", 10, "desktop");
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

