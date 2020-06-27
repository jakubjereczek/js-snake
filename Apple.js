class Apple {

    constructor() {
        this.x = 0;
        this.y = 0;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setCords(x, y) {
        this.x = x;
        this.y = y;
    }

    generatePoint(boardx, boardy, move) {
        this.setCords(Math.round(Math.floor(Math.random() * (boardx - move) / 10) * 10), (Math.floor(Math.random() * (boardy - move) / 10) * 10));
    }
}

export default Apple;
