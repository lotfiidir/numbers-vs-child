export default {
  game: {
    _operation: (a, b) => {
      return a * b;
    },
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
        "done": false,
        "date": null
      };

      var serie = {
        "date": new Date(), "operations": []
      };
      var child = this.getCurrentChild();
      if(mode == "apprentissage")
        child.apprentissages.push(serie);
      else
        child.evaluations.push(serie);

      var partie = this.getCurrentPartie();
      if(partie.step > 9 || partie.step == undefined || partie.mode != mode || partie.operandeA != operandeA){
        partie = model;
        partie.mode = mode;
        partie.step = 1;
        partie.done = false;
        partie.date = serie.date;
        partie.tables = Array.from(new Array(10),(val, index) => index+1);
        partie.operandeA = operandeA;
        this.setCurrentPartie(partie);
        this.update();
        this.updateChildren(child);
        return;
      }
    },
    nextEtape(){
      var partie = this.getCurrentPartie();
      partie.step++;
      this.setCurrentPartie(partie);
      this.update();
      this.canDoEvaluation();
      //console.log("NEXT IS CLECKED", this.getCurrentPartie());
      //this.currentTime.push(this.datenow);
    },
    update(){
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
      return null;
    },
    updateChildren(child){
      var childs = this.fetchChildrens();
      for (var index = 0; index < childs.length; index++) {
        var element = childs[index];
        if(element.pseudo == child.pseudo){
          childs[index] = child;
          localStorage.setItem('storeChildrens', JSON.stringify(childs));
          //return;
        }
      }
    },
    setOperation(selection){
      var child = this.getCurrentChild();
      var currentPartie = this.getCurrentPartie();
      var operations = currentPartie.mode == "apprentissage" ? child.apprentissages : child.evaluations;
      for (var i  = 0; i < operations.length; i++) {
        var item = operations[i];
        if(item.date == currentPartie.date){
          item.operations.push(selection);
          //console.log("ITEM YES", item);
          operations[i] = item;
        }
      }
      if(currentPartie.mode == "apprentissage"){
        child.apprentissages = operations;
      } else{
        child.evaluations = operations;
      }
      this.updateChildren(child);
      //console.log("ADDING OP",this.getCurrentChild() )
    },
    getOperation(){
      var child = this.getCurrentChild();
      var currentPartie = this.getCurrentPartie();
      var operations = currentPartie.mode == "apprentissage" ? child.apprentissages : child.evaluations;
      for (var i  = 0; i < operations.length; i++) {
        var item = operations[i];
        if(item.date == currentPartie.date){
          //console.log("ITEM YES", item);
          return item;
        }
      }
    },
    canDoEvaluation(){
      var tables = Array.from(new Array(10),(val, index) => index+1);
      var avancements = this.getCurrentChild().apprentissages;
      var historics = [];
      for (var i = 0; i < avancements.length; i++) {
        var elt = avancements[i];
        if(elt.operations.length == 10){
          historics.push(elt.operations[0].operandeA);
        }
      }
      var res = Array.from(new Array(10),(val, index) => index+1);
      
      for (var j = 0; j < historics.length; j++) {
        var element = historics[j];
        if(res.includes(j)){
          res.splice(res.indexOf(j), 1);          
        }
      }
      return res.length == 0;
    }
  }
}
