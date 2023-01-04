const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
const mogoURI="mongodb://127.0.0.1:27017/cloudnotebook"

const conectToMongo=()=>{
    mongoose.connect(mogoURI,()=>{
        console.log("conected to mongoose sucessfully")
    })
}
module.exports=conectToMongo;