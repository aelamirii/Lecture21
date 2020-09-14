(function () {
'use strict';

angular.module('ControllerAsApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.factory('ShoppingListFactory', ShoppingListFactory);


// List #1 -Controller
ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {
  var list1 = this;

  // Use factory to create a new shopping List service
  var shoppingList = ShoppingListFactory();

  list1.items = shoppingList.getItems();

  list1.ItemName = "";
  list1.ItemQuantity = "";

  list1.addItem = function () {
    shoppingList.addItems(list1.ItemName , list1.ItemQuantity );
  };

  list1.RemoveItem = function (indexItem) {
    shoppingList.RemoveItem(indexItem);
  };

};


// List #2 -Controller
ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {

  var list2 = this;

  // USe factory to create new Shopping list service

  var ShoppingList = ShoppingListFactory(3);

  list2.items = ShoppingList.getItems();

  list2.ItemName = "";
  list2.ItemQuantity = "";

  list2.addItem = function () {

    try {
      ShoppingList.addItems(list2.ItemName , list2.ItemQuantity );
    } catch (error) {
      list2.errorMessage = error.message;
    } finally {

    }

  }


}






function ShoppingListService(maxItem) {

  var service = this;

  var Items = [];

  service.addItems = function (itemName, itemQuantity) {

    if( (maxItem === undefined ) ||
        ( maxItem !== undefined && Items.length < maxItem )
        )
        {

          var item = {
            name: itemName,
            quantity: itemQuantity
          };

        Items.push(item)  ;
      }
      else {
        {
           throw new Error("Max Items (" +maxItem +") was reached");
        }
      }

  }

  service.getItems = function () {
    return Items;
  };

  service.RemoveItem = function (indexItem) {
    Items.splice(indexItem , 1 );
  };


};


function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };
  return factory;

}


})();
