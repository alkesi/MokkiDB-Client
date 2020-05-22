var mokkidb = angular.module("mokkidbApp", ['ui.bootstrap', 'ngRoute']);

mokkidb.filter('myFilter', function(){
    return function(items, selectedtype){
        
        var filtered = [];
        for(item in items){
            var itemLength = items[item].length-1
            //console.log(items[item][itemLength]);
            var type = items[item][itemLength];
            if(type === selectedtype){
                filtered.push(items[item])
            }
            
        }
        return filtered;
        
    };
    
});