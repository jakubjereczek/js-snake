class Game {

    constructor(score, x, y, boardx, boardy, wherego, move) {
        this.player = new Player(x, y);
        this.point = new Point(score);
        this.apple = new Apple();
        window.addEventListener('keydown', this.changePositon.bind(this));

        this.boardX = boardx;
        this.boardY = boardy;
        this.wherego = wherego;
        this.move = move;
        this.character = document.querySelector("#character");
        this.board = document.querySelector("#board");
        this.score = document.querySelector(".score");
        this.init();
    }

    generatePoint() {
        this.apple.generatePoint(this.boardX, this.boardY, this.move);

        if (this.player.chain.cords.length > 1) {
            for (let i = 0; i < this.player.chain.cords.length; i++) {
                if ((this.apple.getX() == this.player.chain.cords[i].x) &&
                    (this.apple.getY() == this.player.chain.cords[i].y)) {
                    console.log('Blokada generowania na postaci');
                    this.generatePoint();
                    return;
                }
            }
        }
        if ((this.player.x == this.apple.getX()) && (this.player.y == this.apple.getY())) {
            this.generatePoint();
            console.log("Blisko postaci, generuje nowy.");
            return;
        }
    }

    changePositon(event) {
        const number = event.keyCode;
        const wherego = this.wherego;

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

        if ((this.player.x == this.apple.getX()) && this.apple.getY() == (this.player.y)) {
            this.generatePoint();
            this.point.addOne();
            console.log('Zdobyto jablko!');

        }
        this.render();
        setTimeout(this.movePosition.bind(this), 200); // 0.2s
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
        newElement.style.height = "10px";
        newElement.style.width = "10px";
        newElement.style.left = `${this.apple.getX()}px`;
        newElement.style.top = `${this.apple.getY()}px`;
        newElement.style.position = "fixed";
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
            newChain.style.left = `${this.player.chain.cords[this.player.chain.cords.length-1].x}px`;
            newChain.style.top = `${this.player.chain.cords[this.player.chain.cords.length-1].y}px`;
            newChain.style.height = "10px";
            newChain.style.width = "10px";
            newChain.style.position = "fixed";

            this.player.chain.changeColor();
            if (this.player.chain.color) {
                newChain.style.backgroundImage = `url("img/chain.png")`;
            } else {
                newChain.style.backgroundImage = `url("img/chain2.png")`;
            }

            this.board.appendChild(newChain);
            this.score.textContent = this.point.getPointsText();
        }
    }

    init() {
        this.character.style.left = `${this.x}px`;
        this.character.style.top = `${this.y}px`;
        this.board.style.width = `${this.boardx}px`;
        this.board.style.height = `${this.boardY}px`;
        this.board.left = `${this.x}px`;
        this.board.top = `${this.y}px`;
        this.score.textContent = this.point.getPointsText();
        this.movePosition();
        this.generatePoint();
    }
}