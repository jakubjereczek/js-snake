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
        const x = Math.round((Math.floor(Math.random() * (boardy - move) / 10) * 10));
        const y = Math.round((Math.floor(Math.random() * (boardy - move) / 10) * 10));
        // Sprawdzam reszte z dzielenia, aby uzyskać punkt który jest odzwiercieleniem pozycji rozmiaru ruchu oraz wielkości elementów - 20 px.
        if (x % move !== 0 || y % move !== 0) {
            return this.generatePoint(boardx, boardy, move);
        }
        this.setCords(x, y);
    }
}

export default Apple;
