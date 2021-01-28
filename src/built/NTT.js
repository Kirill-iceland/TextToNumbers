"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toText = void 0;
var _0to20KK = ["Núll", "Einn", "Tveir", "Þrír", "Fjórir", "Fimm", "Sex", "Sjö", "Átta", "Níu",
    "Tíu", "Ellevu", "Tólf", "Þrettán", "Fjórtán", "Fimmtán", "Sextán", "Sautján", "Átján", "Nítján"];
var _0to20HK = ["", "Eitt", "Tvö", "Þrjú", "Fjögur", "Fimm", "Sex", "Sjö", "Átta", "Níu",
    "Tíu", "Ellevu", "Tólf", "Þrettán", "Fjórtán", "Fimmtán", "Sextán", "Sautján", "Átján", "Nítján"];
var _0to20KVK = ["", "Ein", "Tvær", "Þrjár", "Fjórar", "Fimm", "Sex", "Sjö", "Átta", "Níu",
    "Tíu", "Ellevu", "Tólf", "Þrettán", "Fjórtán", "Fimmtán", "Sextán", "Sautján", "Átján", "Nítján"];
var _0to100 = ["", "Tíu", "Tugtugu", "Þrjátíu", "Fjörtíu", "Fimmtíu", "Sextíu", "Sjötíu", "Áttatíu", "Nítíu"];
var powof1000 = ["", "Mil", "Bil", "Tril", "Kvaðril", "Kvintil", "Sextil", "Septil", "Oktil", "Non"];
var powof10infoET = { two: "Hundrað", three: "Þúsund", six: "ljón", nine: "ljarður" };
var powof10infoFT = { two: "Hundruð", three: "Þúsund", six: "ljónir", nine: "ljarðir" };
function toText(Number) {
    Number = Number.toString();
    if (0 <= Number.search(/\./)) {
        console.error("Error: " + Number + " is not an Intager");
        return false;
    }
    var minus = "";
    if (parseInt(Number) < 0) {
        minus = "Mínus ";
    }
    Number = Number.replace(/[^0-9]/g, "");
    var result = [];
    var finalresult = [];
    var Pow = 1;
    var _Number;
    var done = false;
    var _0to20;
    while (!done) {
        if (Pow == 1) {
            _0to20 = _0to20KK;
        }
        else if (Pow == 2) {
            _0to20 = _0to20HK;
        }
        else if (Pow % 2) {
            _0to20 = _0to20KVK;
        }
        else {
            _0to20 = _0to20KK;
        }
        result = [];
        _Number = parseInt(Number.toString().slice(-4));
        if (Number == "0") {
            result.push(_0to20[0]);
        }
        else if (_Number % 100 <= 19 && _Number % 100 != 0) {
            result.push(_0to20[_Number % 100]);
        }
        else {
            if (_Number % 10 != 0) {
                result.push(_0to20[_Number % 10]);
            }
            result.push(_0to100[Math.floor(_Number % 100 / 10)]);
        }
        if (_Number % 1000 >= 100) {
            if (_Number % 1000 < 200) {
                result.push(_0to20HK[Math.floor(_Number % 1000 / 100)] + " " + powof10infoET.two);
            }
            else {
                result.push(_0to20HK[Math.floor(_Number % 1000 / 100)] + " " + powof10infoFT.two);
            }
        }
        if (Number.toString().slice(-6, -3) != "000" && Number.toString().slice(-6, -3) != "") {
            if (Pow == 1) {
                result.push(powof10infoET.three);
            }
            else if (Pow % 2) {
                if (Math.floor(_Number / 1000) == 1) {
                    result.push(powof1000[Math.floor(Pow / 2)] + powof10infoET.nine);
                }
                else {
                    result.push(powof1000[Math.floor(Pow / 2)] + powof10infoFT.nine);
                }
            }
            else {
                if (Math.floor(_Number / 1000) == 1) {
                    result.push(powof1000[Math.floor(Pow / 2)] + powof10infoET.six);
                }
                else {
                    result.push(powof1000[Math.floor(Pow / 2)] + powof10infoFT.six);
                }
            }
        }
        result = result.filter(function (Word) { return Word != ""; });
        Number = Number.slice(0, -3);
        if (Number == "") {
            done = true;
        }
        if (result.length > 1) {
            result[0] = "og " + result[0];
        }
        finalresult = finalresult.concat(result);
        Pow++;
        if (Pow > powof1000.length * 2 + 1) {
            console.error("Error: Number is to big or to small");
            return false;
        }
    }
    finalresult.reverse();
    return minus + finalresult.join(" ");
}
exports.toText = toText;
Number.prototype.toText = function () {
    return toText(this);
};
String.prototype.NumbertoText = function () {
    return toText(this);
};
