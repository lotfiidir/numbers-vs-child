export default {
  apprentisage: {
    step: 1,
    responses: [],
    operandeA: null,
    operandeB: null,
    result: null,
    table: [],
    _operation: (a, b) => {
      return a * b
    },
    done: false,
    initialization(entry){
      this.done = false;
      this.step = 1;
      this.table = Array.from(new Array(10),(val, index) => index+1);
      this.operandeA = entry;
      this.update();
    },
    nextEtape(){
      this.step++;
      this.update();
      //this.currentTime.push(this.datenow);
    },
    update(){
      this.responses = [];
      this.operandeB = this.table[Math.floor(Math.random() * this.table.length)];
      this.result = this._operation(this.operandeA, this.operandeB);
      this.responses.push(this.result);
      this.responses.push(this.result - this.operandeB);
      this.responses.push(this.result + this.operandeB);
      let shuffled = this.responses.sort(function () {
        return .5 - Math.random()
      });
      shuffled.slice(0, 3);
      this.table.splice(this.table.indexOf(this.operandeB), 1);
    }
  },
  evaluation: {
    step: 1,
    responses: [],
    stories: [],
    operandeA: null,
    operandeB: null,
    result: null,
    selected: 1,
    table: [],
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    _operation: (a, b) => {
      return a * b;
    },
    done: false,
    currentTime:[],
    selectTable:() => {
      this.selected = Math.floor((Math.random() * 10) +1);
      return this.selected;
    },
    initialization(entry){
      this.done = false;
      this.step = 1;
      this.table = Array.from(new Array(10),(val, index) => index+1);
      this.operandeA = entry;
      this.update();
    },
    nextEtape(){
      this.step++;
      this.update();
      //this.currentTime.push(this.datenow);
    },
    update(){
      this.responses = [];
      this.operandeB = this.table[Math.floor(Math.random() * this.table.length)];
      this.result = this._operation(this.operandeA, this.operandeB);
      this.responses.push(this.result);
      this.responses.push(this.result - this.operandeB);
      this.responses.push(this.result + this.operandeB);
      let shuffled = this.responses.sort(function () {
        return .5 - Math.random()
      });
      shuffled.slice(0, 3);
      this.table.splice(this.table.indexOf(this.operandeB), 1);
    }
  },
  selectOperandeB(){

  }
}
