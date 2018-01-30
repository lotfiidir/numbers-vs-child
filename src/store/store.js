export default {
  game: {
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
    initialization(mode, operandeA){
      var partie = this.getCurrentPartie();
      partie.mode = mode;
      partie.step = 1;
      partie.done = false;
      partie.tables = Array.from(new Array(10),(val, index) => index+1);
      partie.operandeA = operandeA;
      this.setCurrentPartie(partie);
    },
    init(mode, operandeA){
      var model = {
        "mode": "",
        "step": null,
        "responses": [],
        "stories": [],
        "operandeA": null,
        "operandeB": null,
        "result": null,
        "selected": null,
        "tables": [],
        "done": null
      };

      var partie = this.getCurrentPartie();
      console.log("PARTIE", partie == null);
      if(partie.step > 9 || partie.step == undefined || partie.mode != mode || partie.operandeA != operandeA){
        partie = model;
        partie.mode = mode;
        partie.step = 1;
        partie.done = false;
        partie.tables = Array.from(new Array(10),(val, index) => index+1);
        partie.operandeA = operandeA;
        this.setCurrentPartie(partie);
        this.update();
        return;
      }
      //this.update();
    },
    nextEtape(){
      this.step++;
      var partie = this.getCurrentPartie();
      partie.step++;
      this.setCurrentPartie(partie);
      this.update();
      //this.currentTime.push(this.datenow);
    },
    update(){
      /**
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
      this.table.splice(this.table.indexOf(this.operandeB), 1); */
      var partie = this.getCurrentPartie();
      partie.responses = [];
      partie.operandeB = partie.tables[Math.floor(Math.random() * partie.tables.length)];
      partie.result = this._operation(partie.operandeA, partie.operandeB);
      partie.responses.push(partie.result);
      partie.responses.push(partie.result - partie.operandeB);
      partie.responses.push(partie.result + partie.operandeB);
      let shuffled = partie.responses.sort(function () {
        return .5 - Math.random()
      });
      shuffled.slice(0, 3);
      partie.tables.splice(partie.tables.indexOf(partie.operandeB), 1);
      this.setCurrentPartie(partie);
    },
    setCurrentPartie(partie){
      localStorage.setItem('currentSerie', JSON.stringify(partie));
    },
    getCurrentPartie(){
      return JSON.parse(localStorage.getItem("currentSerie") || "{}");
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
    createChild(name){
      var child = {
        "pseudo": name, "apprentissages":[], "evaluations":[]
      };
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
        }
      }
    }
  }
}
