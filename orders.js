const ordersJSON=require('csvtojson')
ordersJSON()
.fromFile("./KS好湯2022.-2月團訂單整理 final.xlsx - 郵寄.csv")
.then((jsonObj)=>{
    console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */
})
