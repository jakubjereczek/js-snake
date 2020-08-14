class Superpower {

    constructor() {
        // id 0 - speed, id 1 - slow
        this.typeList = ["speed", "slow", "3points"]
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
        console.log('WYGENEROWANA NOWA POZYCJE DLA SUPERPOWER');
        this.setCords(Math.round(Math.floor(Math.random() * (boardx - move) / 10) * 10), (Math.floor(Math.random() * (boardy - move) / 10) * 10));
        this.setType(typeId)
    }

}

export default Superpower;