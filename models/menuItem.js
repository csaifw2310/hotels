const mongoose=require('mongoose');
const menuItemSchema= new mongoose.Schema({
name:{
    type: String,
    required: true
},
price:{
    type: Number,
    required: true
},
taste:{
    type: String,
    enum:['sweet','sour','spicy'],
    required: true
},
isDrink:{
    type: Boolean,
    default: false
},
ingredient:{
    type: [String],
    default:[]
},
num_sales:{
    type:Number,
    default:0
}

});

const menuItem = new mongoose.model( 'menuItem',menuItemSchema);
module.exports = menuItem;