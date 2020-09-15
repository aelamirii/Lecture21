(function () {
'use strict';

angular.module('ControllerAsApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.factory('ShoppingListFactory', ShoppingListFactory);


// List 1 controller
ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {

  var list1 = this;

  var shoppingList = ShoppingListFactory();

  list1.getItems = shoppingList.getItems();

  list1.ItemName = "";
  list1.ItemQuantity = "";

  list1.addItem = function () {
    shoppingList.addItem(list1.ItemName , list1.ItemQuantity);
  };

  list1.RemoveItem = function (indexItem) {
    shoppingList.RemoveItem(indexItem);
  };

};



//  List 2 Controller
ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {

  var list2 = this;

  var shoppingList = ShoppingListFactory(3);

  list2.getItems = shoppingList.getItems();

  list2.ItemName = "";
  list2.ItemQuantity = "";


  list2.addItem = function () {
    try {
      shoppingList.addItem(list2.ItemName, list2.ItemQuantity);
    } catch (e) {
      list2.errorMessage = e.message;
    } finally {

    }
  };


  list2.RemoveItem = function (indexItem) {
    shoppingList.RemoveItem(indexItem);
    list2.errorMessage = "";
  };

}








function ShoppingListService(maxItems) {

  var service = this;

  var Items = [];


  service.addItem = function (itemName, itemQuantity)
  {

    if( ( maxItems === undefined) ||
        ( maxItems !== undefined && Items.length < maxItems )
    )
    {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };
      Items.push(item);
    }
    else {
      throw new Error("Max Items ("+maxItems +" ) was reached");
    }

  };

  service.getItems = function () {
    return Items;
  };

  service.RemoveItem = function (indexItem) {
    Items.splice( indexItem , 1);
  };


};


function ShoppingListFactory() {

  var factory = function (maxItems) {
    console.log("Testtt");
    return new ShoppingListService(maxItems);
  };
  return factory;
};



})();
