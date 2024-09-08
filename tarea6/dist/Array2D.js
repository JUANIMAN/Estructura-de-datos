export class Array2D {
    constructor(rows, cols, initialValue) {
        this.rowSize = rows;
        this.colSize = cols;
        this.data = Array(rows).fill(null).map(() => Array(cols).fill(initialValue));
    }
    clear(value) {
        for (let i = 0; i < this.rowSize; i++) {
            for (let j = 0; j < this.colSize; j++) {
                this.data[i][j] = value;
            }
        }
    }
    getRowSize() {
        return this.rowSize;
    }
    getColSize() {
        return this.colSize;
    }
    setItem(row, col, value) {
        if (row >= 0 && row < this.rowSize && col >= 0 && col < this.colSize) {
            this.data[row][col] = value;
        }
        else {
            throw new Error("Indices fuera de rango");
        }
    }
    getItem(row, col) {
        if (row >= 0 && row < this.rowSize && col >= 0 && col < this.colSize) {
            return this.data[row][col];
        }
        else {
            throw new Error("Indices fuera de rango");
        }
    }
    toString() {
        return this.data.map(row => row.map(cell => cell ? '1' : '0').join('')).join('\n');
    }
}
