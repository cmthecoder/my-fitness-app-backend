import { Workout } from "../models/workout.js";
import { Profile } from "../models/profile.js";

const create = async (req, res) => {
  console.log('HEYEYEY', req.user.profile)
  try {
    req.body.exerciser = req.user.profile
    const workout = await Workout.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      {$push: { workouts: workout}},
      {new: true}
    )
    workout.exerciser = profile
    res.status(201).json(workout)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


export {
  create,
}