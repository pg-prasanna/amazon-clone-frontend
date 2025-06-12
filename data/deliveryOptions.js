import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

export const deliveryOptions=[{
    id:"1",
    deliveryDays:7,
    price:0
},
{
    id:"2",
    deliveryDays:3,
    price:49
},
{
    id:"3",
    deliveryDays:1,
    price:90
}

]


export function getDeliveryOption(deliveryOptionId){
let deliveryOption

deliveryOptions.forEach((option)=>{
   if(deliveryOptionId===option.id){
        deliveryOption=option
        
   }
})

return deliveryOption
}

// to avoid saturday and sunday delivery option

function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
  }


export function calculateDeliveryDate(deliveryOption){
    // const today=dayjs()
    //  const deliveryDate=today.add(deliveryOption.deliveryDays,'day')

    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();
  
    while (remainingDays > 0) {
      deliveryDate = deliveryDate.add(1, 'day');
      
  
      if (!isWeekend(deliveryDate)) {
        remainingDays--;
        // This is a shortcut for:
        // remainingDays = remainingDays - 1;
      }
    }
     const priceString=deliveryDate.format('dddd, MMM D')

     return priceString
}