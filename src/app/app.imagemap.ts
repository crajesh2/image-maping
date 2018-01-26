import { Http } from '@angular/http';

export class imagemaparea {
    constructor(private http: Http) {
        
    }
    getJsonData(jsonURL) {
        return this.http.get(jsonURL);
    }    
   // Get the canvas size
    getCanSize() {
        return [950, 1000];
    }
    // Get the image size
    getImgSize(img: any) {
        return this._getImgSize(img.pic_url) || [950, 500];
    }
    _getImgSize(url) {
        let reg = new RegExp('(\\d+)x(\\d+)\.');
        let result = reg.exec(url);
        if (result && result.length > 1) {
            return result.slice(1);
        } else {
            return false;
        }
    }
    addArea(img: any) {
        if (!img || !img.maps) {
            //|| !angular.isArray(img.maps)
            //img = angular.isObject(img) ? img : {};
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


    // =================== Optimize function ===================

    // Edit link, activate the corresponding constituency
    catchArea(area) {
        area.isDraging = true;
    };

    // When you leave edit link, deactivate the corresponding selection
    releaseArea(area){
        if (area.hasOwnProperty('isDraging')) {
            delete area.isDraging
        };
    };  
    // ================== imgJson ===================
    // $watch('img', function(nVal, oVal){
    //     imgJson = JSON.stringify(nVal);                
    // }, true); 
}
