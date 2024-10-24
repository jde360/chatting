import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jmahato686:DjI8Cz9LknURE55q@astrovidhan.xigqz.mongodb.net/?retryWrites=true&w=majority&appName=astrovidhan"
    );
    console.log("data base connection established");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
export default connectDb;
