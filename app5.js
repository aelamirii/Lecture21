(function () {
'use strict';

angular.module('ControllerAsApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.factory('ShoppingListFactory', ShoppingListFactory);


// Shopping List 1 with undefined Items count
ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {

  var list1 = this;

  var ShoppingList = ShoppingListFactory();

  list1.ItemName = "";
  list1.ItemQuantity = "";

  list1.addItem = function () {

    try {
      ShoppingList.addItem(list1.ItemName, list1.ItemQuantity );
    } catch (e) {
      list1.errorMessage = e.message;
    } finally {

    }
  };

  list1.getItems = ShoppingList.getItems();

  list1.RemoveItem = function (indexItem) {
    ShoppingList.RemoveItem(indexItem);
  };

};


// Shopping List 2 with limited Items count
ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {

  var list2 = this;

  var ShoppingList = ShoppingListFactory(3);

  list2.ItemName = "";
  list2.ItemQuantity = "";

  list2.addItem = function () {

    try {
      ShoppingList.addItem(list2.ItemName, list2.ItemQuantity );
    } catch (e) {
      list2.errorMessage = e.message;
    } finally {

    }

  };

  list2.getItems = ShoppingList.getItems();

  list2.RemoveItem = function (indexItem) {
    ShoppingList.RemoveItem(indexItem);
  };

};



function ShoppingListService(maxItems) {

  var service = this;

  var Items = [];

  service.addItem = function (itemName, itemQuantity) {

    if( (maxItems === undefined) ||
        ( maxItems !== undefined && Items.length < maxItems)
    )
    {

      var item = {
        name: itemName,
        quantity: itemQuantity
      };

      Items.push(item);

    }
    else {
      throw new Error ("Max Items ("+ maxItems +") was reached");
    }

  };


  service.getItems = function () {
    return Items;
  };

  service.RemoveItem = function (indexItem) {
    Items.splice( indexItem , 1 );
  };

};


function ShoppingListFactory() {

  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
};





})();
