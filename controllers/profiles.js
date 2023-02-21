import { Profile } from '../models/profile.js'
// import { Workout } from '../models/workouts.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${req.user.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

function showMyWorkouts(req, res) {
  Profile.find({}).then((profiles) => {
    Profile.findById(req.params.id)
    .then((profile) => {
      Workout.find({ exerciser: profile._id})
      .then((workouts) => {
        res.status(200).json(workouts)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

export {
  index,
  addPhoto,
  showMyWorkouts,
}
