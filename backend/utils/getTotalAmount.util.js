export default function(items, menuItems){
    let totalAmount = items.reduce((accumulator,currentValue)=>{
        const menuItem = menuItems.find(item => 
            item._id.toString() === currentValue.menuItem
        );
        return accumulator + (currentValue.quantity * menuItem.price);
    },0)
    return totalAmount;
}