mokkidb.component("modalComponent", {
    templateUrl: 'templates/myModalContent.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: function () {
      var $ctrl = this;

      

      $ctrl.add = function () {
        $ctrl.close();
      };

      $ctrl.cancel = function () {
        $ctrl.dismiss({$value: 'cancel'});
      };
    }
});