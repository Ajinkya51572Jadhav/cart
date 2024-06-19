

export const displayCurrency = (number)=>{
   const formatter = new Intl.NumberFormat("en-In",{
    style: "currency",
    currency:"INR",
    minimumFractionDigits:2, 
   });
     return formatter.format(number);
};

