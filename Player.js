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

                console.log('DO USUNIECIA ELEMTOW: ' + doUsuniecia);
                // for (let i = 0; i < doUsuniecia; i++) {
                //     this.chain.cords.splice(0, 1);
                //     console.log("Wielkosc tablicy po usunieciu lancucha: " + this.chain.cords.length);
                // }
                // console.log("Do usunięcia " + doUsuniecia);
                // if (doUsuniecia > 0) {
                //     for (let j = 0; j < doUsuniecia; j++) {
                //         let xy = this.chain.cords[j];
                //         let pos = this.chain.cords.indexOf(xy);
                //         this.chain.cords.splice(pos, 1);
                //         // ucina
                //         console.log('KOLIZCJA Z' + pos);
                //     }
                // }
            }

        }
        return doUsuniecia;

    }
    selectPosition(number) {
        console.log('zmiena stronay');
        if (number == 37) {
            return "left";
        } else if (number == 38) {
            return "up";
        } else if (number == 39) {
            return "right";
        } else if (number == 40) {
            return "down";
        } else {
            return;
        }

    }
}