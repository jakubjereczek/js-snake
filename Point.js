class Point {

    constructor(points) {

        let _points = points;
        this.getPoints = function () {
            return _points;
        }
        this.getPointsText = function () {
            return "Liczba zdobytych puntków jest równa " + _points;
        }
        this.setPoints = function (value) {
            _points = value;
        }

        this.addOne = function () {
            _points++;
        }
        this.substractOne = function () {
            _points--;
        }

    }


}