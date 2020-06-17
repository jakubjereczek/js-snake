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
        //console.log('');
    }
    deleteLast() {
        this.cords.splice(this.cords[0], 1);
        //  console.log('Usunieto chain');
    }
    changeColor() {
        this.color = !this.color;
    }
}