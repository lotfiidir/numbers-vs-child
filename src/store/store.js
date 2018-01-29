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
      //this.storage();
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
    },
    setCurrentChild(childPseudo){
      localStorage.setItem('currentChild', JSON.stringify(childPseudo));      
    },
    getCurrentChild(){
      var pseudo = JSON.parse(localStorage.getItem("currentChild" || ""));
      //console.log("CHILD PSEUDO", pseudo);
      return this.getChildren(pseudo);
    },
    fetchChildrens(){
      //localStorage.clear();
      var childrens = JSON.parse(localStorage.getItem("storeChildrens") || "[]");
      return childrens == null ? [] : childrens;
    },
    createChild(child){
      var childs = this.fetchChildrens();
      if(this.getChildren(child.pseudo) != null)
        return false;
      childs.push(child);
      localStorage.setItem('storeChildrens', JSON.stringify(childs));
      return true;
    },
    getChildren(pseudo){
      var childs = this.fetchChildrens();      
      for (var index = 0; index < childs.length; index++) {
        var element = childs[index];
        if(element.pseudo == pseudo)
          return element;
      }
    },
    updateChildren(child){
      var childs = this.fetchChildrens();      
      for (var index = 0; index < childs.length; index++) {
        var element = childs[index];
        if(element.pseudo == child.pseudo){
          childs[index] = child;
            localStorage.setItem('storeChildrens', JSON.stringify(childs));            
            console.log("UPDATE", element)
        }
      }
    }
  }
}
