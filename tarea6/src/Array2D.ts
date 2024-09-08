export class Array2D<T> {
    private data: T[][];
    private rowSize: number;
    private colSize: number;

    constructor(rows: number, cols: number, initialValue: T) {
        this.rowSize = rows;
        this.colSize = cols;
        this.data = Array(rows).fill(null).map(() => Array(cols).fill(initialValue));
    }

    public clear(value: T): void {
        for (let i = 0; i < this.rowSize; i++) {
            for (let j = 0; j < this.colSize; j++) {
                this.data[i][j] = value;
            }
        }
    }

    public getRowSize(): number {
        return this.rowSize;
    }

    public getColSize(): number {
        return this.colSize;
    }

    public setItem(row: number, col: number, value: T): void {
        if (row >= 0 && row < this.rowSize && col >= 0 && col < this.colSize) {
            this.data[row][col] = value;
        } else {
            throw new Error("Indices fuera de rango");
        }
    }

    public getItem(row: number, col: number): T {
        if (row >= 0 && row < this.rowSize && col >= 0 && col < this.colSize) {
            return this.data[row][col];
        } else {
            throw new Error("Indices fuera de rango");
        }
    }

    public toString(): string {
        return this.data.map(row => row.map(cell => cell ? '1' : '0').join('')).join('\n');
    }
}