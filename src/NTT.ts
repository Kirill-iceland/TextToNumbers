let _0to20KK:   string[] =  ["Núll", "Einn",   "Tveir",  "Þrír",    "Fjórir",   "Fimm",     "Sex",      "Sjö",     "Átta",    "Níu", 
                             "Tíu",  "Ellevu", "Tólf",   "Þrettán", "Fjórtán",  "Fimmtán",  "Sextán",   "Sautján", "Átján",   "Nítján"];

let _0to20HK:   string[] =  ["",    "Eitt",    "Tvö",    "Þrjú",    "Fjögur",   "Fimm",     "Sex",      "Sjö",     "Átta",    "Níu",
                             "Tíu",  "Ellevu", "Tólf",   "Þrettán", "Fjórtán",  "Fimmtán",  "Sextán",   "Sautján", "Átján",   "Nítján"];

let _0to20KVK:  string[] =  ["",    "Ein",     "Tvær",   "Þrjár",   "Fjórar",   "Fimm",     "Sex",      "Sjö",     "Átta",    "Níu",
                             "Tíu",  "Ellevu", "Tólf",   "Þrettán", "Fjórtán",  "Fimmtán",  "Sextán",   "Sautján", "Átján",   "Nítján"];


let _0to100:    string[] =  ["",     "Tíu",   "Tugtugu", "Þrjátíu", "Fjörtíu",  "Fimmtíu",  "Sextíu",   "Sjötíu",  "Áttatíu", "Nítíu"];

let powof1000:  string[] =  ["",     "Mil",   "Bil",     "Tril",    "Kvaðril",  "Kvintil",  "Sextil",   "Septil",  "Oktil",   "Non"];

let powof10infoET: {two: string, three: string, six: string, nine: string} = {two: "Hundrað", three: "Þúsund", six: "ljón",   nine: "ljarður"}
let powof10infoFT: {two: string, three: string, six: string, nine: string} = {two: "Hundruð", three: "Þúsund", six: "ljónir", nine: "ljarðir"}



export function toText(Number: number | string): String | Boolean{
    Number = Number.toString();

    if(0 <= Number.search(/\./)){
        console.error("Error: " + Number + " is not an Intager");
        return false
    }
    let minus: String = "";
    if(parseInt(Number) < 0){
        minus = "Mínus ";
    }

    Number = Number.replace(/[^0-9]/g, "");
    

    let result: String[] = [];
    let finalresult: String[] = [];
    let Pow: number = 1;
    let _Number: number;
    let done: Boolean = false;
    let _0to20: string[];
    while(!done){
        
        if(Pow == 1){
            _0to20 = _0to20KK;
        }else if(Pow == 2){
            _0to20 = _0to20HK;
        }else if(Pow % 2){
            _0to20 = _0to20KVK;
        }else{
            _0to20 = _0to20KK;
        }

        result = []
        _Number = parseInt(Number.toString().slice(-4))

        if(Number == "0"){
            result.push(_0to20[0]);
        }else if(_Number % 100 <= 19 && _Number % 100 != 0){
            result.push(_0to20[_Number % 100]);
        }else{
            if(_Number % 10 != 0){
                result.push(_0to20[_Number % 10]);
            }
            result.push(_0to100[Math.floor(_Number % 100 / 10)]);
        }

        if(_Number % 1000 >= 100){
            if(_Number % 1000 < 200){
                result.push(_0to20HK[Math.floor(_Number % 1000 / 100)] + " " + powof10infoET.two);
            }else{
                result.push(_0to20HK[Math.floor(_Number % 1000 / 100)] + " " + powof10infoFT.two);
            }
        }

        if(Number.toString().slice(-6, -3) != "000" && Number.toString().slice(-6, -3) != ""){
            if(Pow == 1){  
                result.push(powof10infoET.three);
            }else if(Pow % 2){
                if(Math.floor(_Number/1000) == 1){
                    result.push(powof1000[Math.floor(Pow / 2)] + powof10infoET.nine);
                }else{
                    result.push(powof1000[Math.floor(Pow / 2)] + powof10infoFT.nine);
                }
            }else{
                if(Math.floor(_Number/1000) == 1){
                    result.push(powof1000[Math.floor(Pow / 2)] + powof10infoET.six);
                }else{
                    result.push(powof1000[Math.floor(Pow / 2)] + powof10infoFT.six);
                }
            }
        }
        
        result = result.filter(Word => Word != "");
        Number = Number.slice(0, -3)
        if(Number == ""){
            done = true;
        }
        if(result.length > 1){
            result[0] = "og " + result[0];
        }

        finalresult = finalresult.concat(result)
        Pow++;

        if(Pow > powof1000.length * 2 + 1){
            console.error("Error: Number is to big or to small");
            return false
        }
    }
    
    finalresult.reverse();
    return minus + finalresult.join(" ")
}

Number.prototype.toText = function(){
    return toText(this);
}
String.prototype.NumbertoText = function(){
    return toText(this);
}