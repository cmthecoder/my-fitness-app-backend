import { Workout } from "../models/workout.js";
import { Profile } from "../models/profile.js";

const create = async (req, res) => {
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
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const workouts = await Workout.find({})
    .populate('exerciser')
    .sort({createdAt: 'desc'})
    res.status(200).json(workouts)
  } catch (err) {
    res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('exerciser')
    res.status(200).json(workout)
  } catch (err) {
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).populate('exerciser')
    res.status(200).json(workout)
  } catch (error) {
    res.status(500).json(err)
  }
}

const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.workouts.remove({ _id: req.params.id})
    await profile.save()
    res.status(200).json(workout)
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteWorkout as delete
}