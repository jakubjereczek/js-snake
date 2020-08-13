import Superpower from './Superpower.js';
import Apple from './Apple.js';
import Point from './Point.js';
import Player from './Player.js';

class Game {

    constructor(score, x, y, boardx, boardy, wherego, move, type) {
        this.player = new Player(x, y);
        this.point = new Point(score);
        this.apple = new Apple();
        this.superpower = new Superpower();
        window.addEventListener('keydown', this.changePositon.bind(this))
        this.boardX = boardx;
        this.boardY = boardy;
        this.wherego = wherego;
        this.move = move;
        this.type = type;
        this.character = document.querySelector("#character");
        this.board = document.querySelector("#board");
        this.score = document.querySelector(".score");
        this.time = "100"
        this.startedTimeout = false;
        this.init();
    }

    generateAppleOrSuperPower(type) {
        const checkColisionWithChains = (element, type) => {
            if (this.player.chain.cords.length > 1) {
                for (let i = 0; i < this.player.chain.cords.length; i++) {
                    if ((element.getX() == this.player.chain.cords[i].x) &&
                        (element.getY() == this.player.chain.cords[i].y)) {
                        console.log('Blokada generowania na postaci');
                        this.generateAppleOrSuperPower(type);
                        return;
                    }
                }
            }
        }
        const checkCollisionWithPlayerAndAppleOrSuperPower = (element, type) => {
            if (type === "apple") {
                if ((this.player.x == element.getX()) && (this.player.y == element.getY()) || ((element.getX() == this.superpower.getX()) && (element.getY() == this.superpower.getY()))) {
                    this.generateAppleOrSuperPower("apple");
                    console.log("Blisko postaci lub supermocy");
                    return;
                }
            } else if (type === "superpower") {
                if ((this.player.x == element.getX()) && (this.player.y == element.getY()) || ((element.getX() == this.apple.getX()) && (element.getY() == this.apple.getY()))) {
                    this.generateAppleOrSuperPower("superpower");
                    console.log("Blisko postaci lub supermocy");
                    return;
                }
            }
        }
        if (type === "apple") {
            this.apple.generatePoint(this.boardX, this.boardY, this.move);
            checkColisionWithChains(this.apple, "apple");
            checkCollisionWithPlayerAndAppleOrSuperPower(this.apple, "apple");
        } else if (type === "superpower") {
            const lenghtOfSuperpowerList = this.superpower.typeList.length;
            const random = Math.floor(Math.random() * lenghtOfSuperpowerList);
            this.superpower.generatePoint(this.boardX, this.boardY, this.move, random);
            checkColisionWithChains(this.superpower, "superpower");
            checkCollisionWithPlayerAndAppleOrSuperPower(this.superpower, "superpower");
        }
    }

    rescheduleSuperPower(option) {
        if (option === "collect") {
            if (document.querySelector(".superpower")) {
                document.querySelector(".superpower").remove();
            }
            // Tutaj nastepuję ustalenie "supermocy".
            if (this.superpower.activeType === this.superpower.typeList[0]) {
                this.time = this.time / 2;
            } else if (this.superpower.activeType === this.superpower.typeList[1]) {
                this.time = this.time * 2;
            }
            setTimeout(() => {
                // Efekt trwa 20 sekund i po tym czasie się kończy oraz generuję nowy. Zmiana na false powoduję wygenerowanie nowego elementu.
                this.superpower.changeStatus(false);
                this.time = "200";
            }, this.superpower.time * 2 * 1000)
        } else if (option === "change") {
            if (document.querySelector(".superpower")) {
                document.querySelector(".superpower").remove();
                this.generateAppleOrSuperPower("superpower");
                // generate new cords 
                setTimeout(() => {
                    this.superpower.changeStatus(false);
                    this.startedTimeout = false;
                    // step to generate element on board
                }, this.superpower.time * 1000)
            }
        }
    }

    mobileButtonsInit() {
        if (this.type === "mobile") {
            document.querySelector(".left").addEventListener("click", () => {
                if (this.wherego != "right") this.wherego = "left";
            })
            document.querySelector(".up").addEventListener("click", () => {
                if (this.wherego != "down") this.wherego = "up";
            })
            document.querySelector(".right").addEventListener("click", () => {
                if (this.wherego != "left") this.wherego = "right";
            })
            document.querySelector(".down").addEventListener("click", () => {
                if (this.wherego != "up") this.wherego = "down";
            })
        }
    }

    changePositon(event) {
        const number = event.keyCode;
        const wherego = this.wherego;
        console.log('ruch');
        if (this.type === "desktop") {
            if ((number == 37) && (wherego != "right")) {
                this.wherego = "left";
            } else if ((number == 38) && (wherego != "down")) {
                this.wherego = "up";
            } else if ((number == 39) && (wherego != "left")) {
                this.wherego = "right";
            } else if ((number == 40) && (wherego != "up")) {
                this.wherego = "down";
            } else {
                return;
            }
        }

    }

    movePosition() {
        if (this.wherego == "left") {
            if (this.player.x < this.move) {
                this.player.x = this.boardX;
            }
            this.player.x -= this.move;
        } else if (this.wherego == "up") {
            if (this.player.y < this.move) {
                this.player.y = this.boardY;
            }
            this.player.y -= this.move;
        } else if (this.wherego == "right") {
            if (this.player.x > (this.boardX - (2 * this.move))) {
                this.player.x = -10;
            }
            this.player.x += this.move;
        } else if (this.wherego == "down") {
            if (this.player.y > (this.boardY - (2 * this.move))) {
                this.player.y = -10;
            }
            this.player.y += this.move;
        }
        const x = this.player.x;
        const y = this.player.y;
        if (this.player.cords.length > 0) {
            if (this.point.getPoints() > 0 && (this.player.chain.length != this.player.cords.length)) {
                this.player.chain.addCords(this.player.cords[this.player.cords.length - 1].x, this.player.cords[this.player.cords.length - 1].y);
            }
        }
        this.player.addCords(x, y);
        // Zmiana puntkow, ktora spowoduje potem usuniecie nadmiaru landucha w render
        for (let i = 0; i < this.player.checkColision(); i++) {
            this.point.substractOne();
        }
        if ((this.player.x == this.apple.getX()) && this.apple.getY() == this.player.y) {
            this.generateAppleOrSuperPower("apple");
            this.point.addOne();
            console.log('Zdobyto jablko!');
        }
        // add superpower effect
        if ((this.player.x == this.superpower.getX()) && this.superpower.getY() == this.player.y) {
            console.log('Zebrano superpower');
            this.rescheduleSuperPower("collect");
        }

        this.render();
        setTimeout(this.movePosition.bind(this), this.time); // 0.2s
    }

    render() {
        this.character.style.left = `${this.player.x}px`;
        this.character.style.top = `${this.player.y}px`;
        const lastElement = document.querySelector(".apple");
        if (lastElement) {
            lastElement.remove();
        }
        const newElement = document.createElement("div");
        newElement.classList.add("apple");
        newElement.style.left = `${this.apple.getX()}px`;
        newElement.style.top = `${this.apple.getY()}px`;
        newElement.style.backgroundColor = "green";
        this.board.appendChild(newElement);
        const chainsElements = document.querySelectorAll("div .chain");
        if ((chainsElements.length >= this.player.chain.cords.length) || (chainsElements.length >= this.point.getPoints())) {
            let liczbaElementowDoUsuniecia = chainsElements.length - this.point.getPoints() + 1;
            for (let i = 0; i < liczbaElementowDoUsuniecia; i++) {
                chainsElements[i].remove();
            }
        }
        for (let i = 0; this.player.chain.cords.length > this.point.getPoints(); i++) {
            this.player.chain.deleteLast();
        }
        if ((this.player.chain.cords.length > 0) && (this.point.getPoints() > 0)) {
            const newChain = document.createElement("div");
            newChain.classList.add("chain");
            newChain.style.left = `${this.player.chain.cords[this.player.chain.cords.length - 1].x}px`;
            newChain.style.top = `${this.player.chain.cords[this.player.chain.cords.length - 1].y}px`;
            this.player.chain.changeColor();
            if (this.player.chain.color) {
                newChain.style.backgroundImage = `url("img/chain.png")`;
            } else {
                newChain.style.backgroundImage = `url("img/chain2.png")`;
            }
            this.board.appendChild(newChain);
            this.score.textContent = this.point.getPointsText();
        }
        if (!this.superpower.exists) {
            console.log('GENEROWANIE NOWEGO ELEMENTU');
            const newElement = document.createElement("div");
            console.log(this.superpower.getType());
            newElement.classList = "superpower " + this.superpower.getType();
            newElement.style.left = `${this.superpower.getX()}px`;
            newElement.style.top = `${this.superpower.getY()}px`;
            let color = ""
            if (this.superpower.getType() === this.superpower.typeList[0]) {
                color = "blue";
            } else if (this.superpower.getType() === this.superpower.typeList[1]) {
                color = "yellow";
            }
            newElement.style.backgroundColor = color;
            this.board.appendChild(newElement);
            this.superpower.changeStatus(true);
        }
        if (this.superpower.exists && !this.startedTimeout) {
            this.startedTimeout = true;
            setTimeout(() => {
                this.rescheduleSuperPower("change");
                // Usunięcie elementu po 10 sekundach wyświetlania, po 10 sekundach wygenerowanie na nowo
            }, this.superpower.time * 1000)

        }
    }

    init() {
        this.character.style.left = `${this.x}px`;
        this.character.style.top = `${this.y}px`;
        this.board.style.width = `${this.boardX}px`;
        this.board.style.height = `${this.boardY}px`;
        console.log(this.boardX, this.boardY);
        this.board.left = `${this.x}px`;
        this.board.top = `${this.y}px`;
        this.score.textContent = this.point.getPointsText();
        this.mobileButtonsInit();
        (this.type === "mobile") ? document.querySelector(".mobile.buttons").classList.remove("hide") : null;
        this.generateAppleOrSuperPower("apple");
        this.generateAppleOrSuperPower("superpower");
        this.movePosition();
    }
}

export default Game;