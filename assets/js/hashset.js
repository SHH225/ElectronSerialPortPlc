
/*
// Open-source (BSD) Javascript implementation of HashSets.
// BSD Licensed  - https://github.com/searchturbine/js-rapidly-searchable-hashset/blob/master/LICENSE
*/


function hashSet() {
  this._values = {};
  this.values = function() {
    var output = new Array;
    var counter = 0;
    for (i in this._values) {
      output[counter++] = i;
    }
    return output;
  };
  this.contains = function(key) {
    return this._values.hasOwnProperty(key);
  };
  this.add = function(key) {
    this._values[key] = true;
  };
  this.remove = function(key) {
    delete this._values[key];
  };
  this.clear = function() {
    this._values = {};
  };
  this.count = function() {
    var counter = 0;
    for (var key in object) {
      counter++;
    }
    return counter;
  };
  this.copyToArray = function(array) {
    if (!(array instanceof Array)) {
      array = [];
    }
    for (i in this._values) {
      array.push(i);
    }
    return array;
  };
  this.exceptWith = function(other_hashset) {
    if (!(array instanceof hashset)) {
      throw "ExceptWith expects parameter 1 to be a hashset";
    }
    for (i in other_hashset._values) {
      this.remove(i);
    }
    return this;
  };
  this.isSubsetOf = function(other_hashset) {
    if (!(array instanceof hashset)) {
      throw "IsSubsetOf expects parameter 1 to be a hashset";
    }
    for (i in this._values) {
      if (!other_hashset.contains(i)) {
        return false;
      }
    }
    return true;
  };
  this.unionWith = function(other_hashset) {
    if (!(array instanceof hashset)) {
      throw "UnionWith expects parameter 1 to be a hashset";
    }
    for (i in other_hashset._values) {
      this.add(i);
    }
    return this;
  };
  this.enumerate = function(fn) {
    if (typeof fn !== "function") {
      throw "enumerate expects parameter 1 to be a function";
    }
    for (i in this._values) {
      fn(i);
    }
  };
}
;