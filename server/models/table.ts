import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must provide name"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  data: {
    type: Array,
    required: [true, "You must provide data array, might be empty"],
  },
  // age: {
  //   type: Number,
  //   required: [true, "age is required"],
  // },
});

export default mongoose.model("Table", TableSchema);
