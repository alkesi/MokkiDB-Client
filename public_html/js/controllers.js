mokkidb.controller("mokkidbCtrl", function($scope, $http, lajit, $uibModal, $route, $timeout, $rootScope){
    cbl.initDb(['mokkidb']).then();
    $scope.nimet = [];
    $rootScope.$on("Lajilisatty", function(event, data){
        $scope.lajit.push(data);
        $timeout(function(){$http.get("http://127.0.0.1:5984/mokkidb/_design/Lajit/_view/tbl-view")
            .then(function(res){
                $scope.rows2 = res.data.rows;
                
                for(row in $scope.rows2){
                    if($scope.rows2[row].id === $scope.selectedOption){
                        $scope.cols = angular.fromJson($scope.rows2[row].key.cols);
                    }
                }
                $scope.inputCols = Object.keys($scope.cols);
                
        });}, 100)
    });
    $http.get('http://127.0.0.1:5984/mokkidb/_design/Lajit/_view/id-view').then(function(d){
        $scope.lajit = [];
        for(row in d.data.rows){
            $scope.lajit.push(d.data.rows[row].id);
        }
        $scope.selectedOption = $scope.lajit[0];
        //console.log($scope.lajit)
    });
    
    
    $http.get("http://127.0.0.1:5984/mokkidb/_design/Lajit/_view/tbl-view")
            .then(function(res){
                $scope.rows2 = res.data.rows;
                
                for(row in $scope.rows2){
                    if($scope.rows2[row].id === $scope.selectedOption){
                        $scope.cols = angular.fromJson($scope.rows2[row].key.cols);
                    }
                }
                $scope.inputCols = Object.keys($scope.cols);
                
    });
    
    
        $http.get("http://127.0.0.1:5984/mokkidb/_design/testiView/_view/new-view?limit=20&reduce=false")
            .then(function(response){
                $scope.data = response.data;
                
                $scope.rows = response.data.rows;
                for(row in $scope.rows){
                    var temp=[];
                    temp.push($scope.data.rows[row].id);
                    for(cell=1;cell<$scope.data.rows[row].key.data.length; cell++){
                        temp.push($scope.data.rows[row].key.data[cell]);
                    }
                    
                    $scope.nimet.push(temp);
                }
                //console.log($scope.nimet);
                
                
    });
    
    
    $scope.lajiVaihto = function(){
        for(row in $scope.rows2){
            if($scope.rows2[row].id === $scope.selectedOption){
                $scope.cols = angular.fromJson($scope.rows2[row].key.cols);
            }
            
        }
        $scope.inputCols = Object.keys($scope.cols);
        
    };
    
    $scope.Update = function(event, id, index){
        if($scope.nimi !== ""){
            $scope.url = "http://127.0.0.1:5984/mokkidb/" + id;
            $http.get($scope.url).then(function(data){
                    $scope.data2 = data.data;
                    $scope.data2.data[index+2] = document.querySelector(".desc_"+index).value;
                    $http.put($scope.url, $scope.data2);
                });
            var update = true;
            var tempInput = [];
            for(x=0; x < Object.keys($scope.cols).length-2; x++){
                tempInput[x+2] = document.querySelector(".desc_"+x).value;
                if(tempInput[x+2] === "" ){
                    update = false;
                }
            }
            if(update){
                tempInput[0] = id;
                tempInput[1] = $scope.nimi;
                tempInput[Object.keys($scope.cols).length] = $scope.selectedOption;
                //console.log(tempInput);
                $scope.nimet.push(tempInput);
                document.querySelector(".name").value = "";
                $scope.data.total_rows++;
                $timeout(function(){for(x=0; x < Object.keys($scope.cols).length-2; x++){
                    document.querySelector(".desc_"+x).value = "";
                }}, 50);
                
            }
        }
        
        
    };
    
    
    $scope.NewElement = function(event, id){
        console.log(angular.element(event.target).val());
        if(angular.element(event.target).val() !== ""){
            $scope.element = document.getElementsByClassName(id)[0];
            $scope.nimi = this.element.querySelector(".name").value;
            $scope.url = "http://127.0.0.1:5984/mokkidb/" + id;
            $scope.sendData ={data:[]};
            $scope.sendData.data[0] = "jutut";
            $scope.sendData.data[1] = $scope.nimi;
            $scope.sendData.data[Object.keys($scope.cols).length] = $scope.selectedOption;
            
            $http.head($scope.url).then(function(response){
                $http.get($scope.url).then(function(data){
                    $scope.data2 = data.data;
                    console.log($scope.data2);
                    $scope.data2.data[1] = $scope.nimi;
                    $scope.data2.data[2] = $scope.kuvaus;

                    $http.put($scope.url, $scope.data2);
                });
            }, function(error){
                if(error.status === 404){
                    $http.put($scope.url, $scope.sendData);
                }
            });
        };
        };
        
    
    $scope.modalOpen = function(){
        $uibModal.open({
            animation:true, 
            templateUrl:'templates/myModalContent.html', 
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body', 
            controller:'ModalInstanceCtrl',
            controllerAs:'$ctrl'
        });
    };
    
    
    $scope.getType = function(index){
        //console.log(index);
        return $scope.cols[index][1];
        
    };
    
});


mokkidb.controller("ModalInstanceCtrl", function($uibModalInstance, $http, $rootScope){
    var $ctrl = this;
    $ctrl.slider = 1;
    
    $ctrl.name = [];
    $ctrl.desc = [];
    
    $ctrl.haeNumero = function(numero){
        return new Array(numero);        
    };
    

    $ctrl.add = function () {
        $uibModalInstance.close();
        $ctrl.sendData = {
            'cols':{},
            'type':'lajit'
        };
        $ctrl.sendData.cols[1] = ["id", 'text'];
        $ctrl.sendData.cols[2] = ["nimi", 'text'];
        for(it=0; it < $ctrl.name.length; it++){
            $ctrl.sendData.cols[it+3] = [$ctrl.name[it], $ctrl.desc[it]];
        }
        //console.log($ctrl.sendData);
            $ctrl.url = "http://127.0.0.1:5984/mokkidb/" + $ctrl.laji;
            $http.head($ctrl.url).then(function(response){
                console.log(response);
                alert("Laji jo olemassa!");

            }, function(error){
                if(error.status === 404){
                    $http.put($ctrl.url, $ctrl.sendData);
                }
            });
        $rootScope.$emit("Lajilisatty", $ctrl.laji);
    };

    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    $ctrl.checkValid =function(clas){
        var classname = "type_" + clas;
        var valids = ["text", "number"];
        var value = document.getElementsByClassName(classname)[0].value;
        var it=0;
        var bool = false;
        $ctrl.show = [];
        $ctrl.show[clas] = false;
        while(it<valids.length && bool !== true){
            if(value === valids[it]){
                bool=true;
                document.getElementsByClassName(classname)[0].parentNode.className = "form-group has-success";
            }
            it++;
        }
        if(bool === false){
            $ctrl.show[clas] = true;
            document.getElementsByClassName(classname)[0].parentNode.className = "form-group has-error";
        }
    };
});