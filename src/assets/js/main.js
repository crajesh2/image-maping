alert("OK")
(function() {
    var app = angular.module('ngImgMapDemo', ['ngImgMap']);  
    app.controller('DemoCtrl', function($scope, $http) {
        $scope.jsonUrl = 'imageselector.json';
        // ================= Must be configured =================                        
        // The most basic data format is as follows, description for the custom attributes            
        $http.get($scope.jsonUrl).success(function(data){
            //console.log(data);                 
        });            
        $scope.img = {
            "pic_url": "img.jpg",
            "maps": [
              {
                "coords": [
                  0,
                  336,
                  350,
                  430
                ],
                "description": "Notebook Box",
                "link_url": "notebook.png"
              },
              {
                "coords": [
                  255,
                  23,
                  688,
                  322
                ],
                "description": "Laptop",
                "link_url": "laptop.pnh"
              },
              {
                "coords": [
                  716,
                  4,
                  875,
                  371
                ],
                "description": "flowerjug",
                "link_url": "flowerjug.png"
              },
              {
                "coords": [
                  654,
                  368,
                  858,
                  421
                ],
                "description": "Mobile",
                "link_url": "mobile.png"
              }
            ]
          };
        
        // ================= Must be configured =================
        // Set method
        $scope.mapFns = {
            // Get the canvas size
            getCanSize: function() {
                return [950, 1000];
            },
            // Get the image size
            getImgSize: function(img) {
                return _getImgSize(img.pic_url) || [950, 500];
            }
        };

        // Get the picture width and height
        function _getImgSize(url) {
            var reg = new RegExp('(\\d+)x(\\d+)\.');
            result = reg.exec(url);
            if (result && result.length > 1) {
                return result.slice(1);
            } else {
                return false;
            }
        }

        // Add anchor
        $scope.addArea = function(img) {
            if (!img || !img.maps || !angular.isArray(img.maps)) {
                img = angular.isObject(img) ? img : {};
                img.maps = [];
            };
            var calculation = img.getCalculation(),
                lastImg = img.maps.slice(-1)[0],
                lastImgLeft = lastImg ? lastImg.coords[0] : 0,
                lastImgTop = lastImg ? lastImg.coords[1] : 0,
                newImgCoords = [lastImgLeft + 30, lastImgTop + 30, lastImgLeft + 100, lastImgTop + 100];               
            if (calculation) {
                img.maps.push({coords: calculation.checkCoords(newImgCoords) });
            } else {
                img.maps.push({coords: newImgCoords });                    
            }
        };

        // Save Json
        $scope.saveToPc = function (img) {                
            //$http.post($scope.jsonUrl, $scope.imgJson);                
            // var fso = new ActiveXObject("Scripting.FileSystemObject");
            // var s = fso.CreateTextFile("C:\\xampp\htdocs\imageselecter\imageselecter.txt", true);
            // s.WriteLine($scope.imgJson);
            // s.Close();     
            
            // this.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent($scope.imgJson);
            // this.download = 'C:\\xampp\htdocs\imageselecter\imageselecter.txt';
            
            if ('Blob' in window) {
                //var fileName = prompt('Please enter file name to save', 'Untitled.json');

                var fileName = "C:/xampp/htdocs/imageselecter/imageselecter.txt"
                //var fileName = new File(txtFile);
                if (fileName) {
                var textToWrite = $scope.imgJson.replace(/n/g, 'rn');
                var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });

                if ('msSaveOrOpenBlob' in navigator) {
                    navigator.msSaveOrOpenBlob(textFileAsBlob, fileName);
                } else {
                    var downloadLink = document.createElement('a');                    
                    downloadLink.download = fileName;
                    downloadLink.innerHTML = 'Download File';
                    
                    if ('webkitURL' in window) {
                        // Chrome allows the link to be clicked without actually adding it to the DOM.
                        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
                    } else {
                        // Firefox requires the link to be added to the DOM before it can be clicked.
                        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                        downloadLink.click(function(){
                            document.body.removeChild(event.target);
                        }); 
                        
                        downloadLink.style.display = 'none';
                        document.body.appendChild(downloadLink);
                    }
                    downloadLink.click();
                }
                }
            } else {
                alert('Your browser does not support the HTML5 Blob.');
            }
            
        };

        // =================== Optimize function ===================

        // Edit link, activate the corresponding constituency
        $scope.catchArea = function(area){area.isDraging = true;};

        // When you leave edit link, deactivate the corresponding selection
        $scope.releaseArea = function(area){
            if (area.hasOwnProperty('isDraging')) {
                delete area.isDraging
            };
        };

        // ================== imgJson ===================
        $scope.$watch('img', function(nVal, oVal){
            $scope.imgJson = angular.toJson(nVal, true);                
        }, true); 
    });

})();