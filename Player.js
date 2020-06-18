class Player {

    constructor(x, y) {
        this.chain = new Chain();
        this.x = x;
        this.y = y;
        this.cords = [

        ]
    }
    addCords(x, y) {
        let ruchGracza = {
            x: x,
            y: y
        }
        this.cords.push(ruchGracza);
    }

    checkColision() {
        let doUsuniecia = 0;

        for (let i = 0; i < this.chain.cords.length; i++) {
            if (this.x == this.chain.cords[i].x && this.y == this.chain.cords[i].y) {
                console.log('Koliacja');

                doUsuniecia = this.chain.cords.length - (this.chain.cords.length - i);
            }

        }
        return doUsuniecia;

    }

}