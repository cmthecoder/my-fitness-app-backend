import mongoose from "mongoose";

const Schema = mongoose.Schema


const workoutSchema = new Schema (
  {
    name: {type: String, require: true},
    weight: {type: Number, require: true},
    reps: {type: Number, require: true},
    exerciser:[{type: Schema.Types.ObjectId, ref: 'Profile'}]
  }, {timestamps: true}
)

const Workout = mongoose.model("Workout", workoutSchema)

export { Workout }