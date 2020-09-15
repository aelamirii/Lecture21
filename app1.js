(function () {
'use strict';

angular.module('ControllerAsApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.factory('ShoppingListFactory', ShoppingListFactory);


// List 1 Controller
ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {

  var list1 = this;

  // Use factory to create a new shopping list service
  var shoppingList = ShoppingListFactory();

  list1.getItems = shoppingList.getItems();

  list1.ItemName = "";
  list1.ItemQuantity = "";


  list1.addItem = function () {
      shoppingList.addItem(list1.ItemName, list1.ItemQuantity);
  };

  list1.RemoveItem = function (indexItem) {
    shoppingList.RemoveItem(indexItem);
  };

};



// List 2 Controller
ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {

  var list2 = this;

  //usse factory to create a new shopping list Service
  var ShoppingFactory = ShoppingListFactory(3);

  list2.getItems = ShoppingFactory.getItems();

  list2.ItemName = "";
  list2.ItemQuantity = "";

  list2.addItem = function () {



    try {
      ShoppingFactory.addItem(list2.ItemName, list2.ItemQuantity );
    } catch (error) {
        list2.errorMessage = error.message;
    } finally {

    }


  };

};







function ShoppingListService(maxItems) {

  var service = this;

  var Items = [];

  service.addItem = function (itemName, itemQuantity) {
    console.log("Items.length :",Items.length);
    console.log("maxItems :",maxItems);
    if( ( maxItems === undefined) ||
        ( maxItems !== undefined && Items.length < maxItems)
    )
    {
      console.log("\t Items.length >>>:",Items.length);
      var item = {
        name: itemName,
        quantity: itemQuantity
      };

      Items.push(item);
    }
    else
      {
         // console.log("\t Items.length reacheddddddddddddddddddddd>>>:",Items.length);
        throw new Error("Max items (" + maxItems + ") was reached");
      }

  };


  service.getItems = function () {
    return Items;
  };

  service.RemoveItem = function (indexItem) {
    Items.splice(indexItem, 1);
  };

};


function ShoppingListFactory() {

  var factory = function (maxItems) {
    // console.log("maxxxxxxxxxxxx :",maxItems);

    return new ShoppingListService(maxItems);
  };
  return factory;
};



})();
