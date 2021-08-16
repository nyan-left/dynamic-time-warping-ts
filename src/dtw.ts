// Project: https://github.com/GordonLesti/dynamic-time-warping

export default class DynamicTimeWarping<T> {
  distance : number;
  matrix: number[][];
  path: Array<[number, number]>;
  constructor(
    private ser1: ReadonlyArray<T>,
    private ser2: ReadonlyArray<T>,
    private distFunc: (a: T, b: T) => number,
  ) {
    this.distance = null;
    this.matrix = null;
    this.path = null;
  }

  getDistance() : number {
    if (this.distance !== null) {
      return this.distance;
    }
    this.matrix = [];
    for (let i = 0; i < this.ser1.length; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.ser2.length; j++) {
        let cost = Infinity;
        if (i > 0) {
          cost = Math.min(cost, this.matrix[i - 1][j]);
          if (j > 0) {
            cost = Math.min(cost, this.matrix[i - 1][j - 1]);
            cost = Math.min(cost, this.matrix[i][j - 1]);
          }
        } else {
          if (j > 0) {
            cost = Math.min(cost, this.matrix[i][j - 1]);
          } else {
            cost = 0;
          }
        }
        this.matrix[i][j] = cost + this.distFunc(this.ser1[i], this.ser2[j]);
      }
    }
    this.distance = this.matrix[this.ser1.length - 1][this.ser2.length - 1];
    return this.distance;
  }

  getPath() : Array<[number, number]> {
    if (this.path !== null) {
      return this.path;
    }
    if (this.matrix === null) {
      this.getDistance();
    }
    let i = this.ser1.length - 1;
    let j = this.ser2.length - 1;
    this.path = [[i, j]];
    while (i > 0 || j > 0) {
      if (i > 0) {
        if (j > 0) {
          if (this.matrix[i - 1][j] < this.matrix[i - 1][j - 1]) {
            if (this.matrix[i - 1][j] < this.matrix[i][j - 1]) {
              this.path.push([i - 1, j]);
              i--;
            } else {
              this.path.push([i, j - 1]);
              j--;
            }
          } else {
            if (this.matrix[i - 1][j - 1] < this.matrix[i][j - 1]) {
              this.path.push([i - 1, j - 1]);
              i--;
              j--;
            } else {
              this.path.push([i, j - 1]);
              j--;
            }
          }
        } else {
          this.path.push([i - 1, j]);
          i--;
        }
      } else {
        this.path.push([i, j - 1]);
        j--;
      }
    }
    this.path = this.path.reverse();
    return this.path;
  }
}
