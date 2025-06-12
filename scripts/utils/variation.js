export function renderVariationHtml(variationDetails){

    if(!variationDetails){
        return "";
    }

    let variationNames=Object.keys(variationDetails)
    console.log(variationNames)

    if(variationNames.lenght===0){
        return "" ;
    }

    let variationHtml=""

    variationNames.forEach((name)=>{
       const value=variationDetails[name]

       variationHtml+=`<div class="variation-info">${name}: ${value}</div>`

    })

    return `<div class="product-variations">${variationHtml}</div>`

    


}