import mongoose from "mongoose"
const connectDb  = async()=>{

try {
   await  mongoose.connect('mongodb+srv://jayantam:IiZGWHBhANPfBFsX@chat.lvkh3.mongodb.net/?retryWrites=true&w=majority&appName=chat')
console.log('data base connection established')
} catch (error) {
  console.error(error)
  process.exit(1)  
}

}
export default connectDb;