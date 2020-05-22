mokkidb.directive("mySlider", function(){
    return{
        link:function(scope,element,attr, ctrl){
            element.css({
                position:'relative',
                border:'1px solid black',
                width:'50%',
                height:'10px',
                borderRadius:'5px',
                margin:'10px',
            });
        }
    };
});


mokkidb.directive("mySliderSlider", ['$document', function($document, $parse){
    return{
        require:'ngModel',
        link:function(scope,element,attr, ctrl){
            var startX = 23, x = 23, moveX = 23, val=1;
            ctrl.$setViewValue(val);
            ctrl.$render();
            element.css({
                float:'left',
                position:'absolute',
                border:'2px solid black',
                width:'10%',
                height:'20px',
                borderRadius:'5px',
                backgroundColor:'lightgray',
                top:'-5px',
                left:'23px'
            });
            
            element.on('mousedown', function(event) {
            // Prevent default dragging of selected content
                event.preventDefault();
                console.log(x);
                startX = event.pageX - x;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
          });
          
          function mousemove(event) {
              
            
            moveX = event.pageX - startX;
            if(moveX > x+28 && x < 260){
                x = x+28;
                val+=1;
            }
            else if(moveX < x-28 && x>-5){
                x = x-28;
                val-=1;
            }
            if(x>260){
                x=260;
            }
            else if(x<-5){
             x=-5;
            }
            
            ctrl.$setViewValue(val);
            ctrl.$render();
            
            element.css({
              
              left:  x + 'px'
            });
          }
          
          function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
          }
        }
    };
}]);


mokkidb.directive("mySliderValue", function(){
    return{
        link:function(scope,element,attr){
            element.css({
                position:'relative',
                height:'20px',
                width:'20px',
                top:'-20px',
                left:'5px'
            });
        }
    };
});

mokkidb.directive("infoMark", function(){
    return{
        link:function(scope,element,attr){
            element.css({
                position:'relative',
                float:'left',
                width:'20px',
                height:'20px',
                border:'1px solid #42a1f4',
                borderRadius:'10px',
                textAlign:'center',
                background:'#42a1f4',
                color:'white',
                marginRight:'5px',
                left:'0px',
                animationName:'infoanim',
                animationDuration: '1s',
                animationIterationCount: '10'
            });
        }
    };
});

mokkidb.directive("typeahead", ["$timeout", function($timeout){
    return {
        transclude:true,
        replace:true,
        scope: {
            search: "&",
            select: "&",
            items: "=",
            term: "="
        },
        controller: ["$scope", function($scope) {
            
            $scope.hide = false;

            this.activate = function(item) {
                $scope.active = item;
            };
        }]
    };
}]);

mokkidb.directive("typeahead-item", function(){
    return {
        require:'^typeahead',
        link: function(scope, element, attrs, controller) {
            
            var item = scope.$eval(attrs.typeaheadItem);

            scope.$watch(function() { return controller.isActive(item); }, function(active) {
                if (active) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });

            element.bind('mouseenter', function(e) {
                scope.$apply(function() { controller.activate(item); });
            });

            element.bind('click', function(e) {
                scope.$apply(function() { controller.select(item); });
            });
        }
    };
});