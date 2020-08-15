class Superpower {

    constructor() {
        // id 0 - speed, id 1 - slow
        this.typeList = ["speed", "slow", "points3"]
        this.activeType = ""
        this.time = 10;
        this.exists = false;
        this.x = 0;
        this.y = 0;
    }

    setType(typeId) {
        if (typeof typeId === "number" && typeId < this.typeList.length) {
            this.activeType = this.typeList[typeId];
        } else {
            return;
        }
    }
    getType() {
        return this.activeType;
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

    changeStatus(value) {
        this.exists = value
    }

    generatePoint(boardx, boardy, move, typeId) {
        const x = Math.round((Math.floor(Math.random() * (boardy - move) / 10) * 10));
        const y = Math.round((Math.floor(Math.random() * (boardy - move) / 10) * 10));
        if (x % move !== 0 || y % move !== 0) {
            return this.generatePoint(boardx, boardy, move, typeId);
        }
        this.setCords(x, y);
        console.log('WYGENEROWANA NOWA POZYCJE DLA SUPERPOWER');
        this.setType(typeId)
    }

}

export default Superpower;