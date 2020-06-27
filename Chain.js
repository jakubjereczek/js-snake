class Chain {

    constructor() {
        this.cords = [

        ]
        this.color = true;
    }
    addCords(x, y) {
        let polozenie = {
            x: x,
            y: y
        }
        this.cords.push(polozenie);
    }
    deleteLast() {
        this.cords.splice(this.cords[0], 1);
    }
    changeColor() {
        this.color = !this.color;
    }
}

export default Chain;
