import { MoneyToNumericFormat } from "../../scripts/utils/money.js";

console.log("test suite: currency numeric format")

if(MoneyToNumericFormat(10)==="10"){
    console.log("passed")
}

else {
    console.log("failed")
}


if(MoneyToNumericFormat(1000)==="1,000"){
    console.log("passed")
}

else{
    console.log("failed")
}


if(MoneyToNumericFormat(10000)==="10,000"){
    console.log("passed")
}

else{
    console.log("failed")
}


if(MoneyToNumericFormat(100000)==="1,00,000"){
    console.log("passed")
}

else{
    console.log("failed")
}
