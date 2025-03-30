const mongoose = require("mongoose");

const db = require("../../db") 

// Schema and model
const ReleaseSchema = new mongoose.Schema({
    name: {
      type: String, required: true,
    },
    tracks: {
      type: [String], required: true,
    },
    description: {
      type: String, required: true,
    }
})

// Schema and model
const ArtistSchema = new mongoose.Schema({
    name: {
      type: String, required: true,
    },
    biography: {
      type: String, required: true,
    },
    genre: {
      type: String, required: true,
    },
    releases: {
      type: [ReleaseSchema], required: true
    },
})

// Schema for event
const EventSchema = new mongoose.Schema({
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" }, // required: true only if an artist is needed
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, maxlength: 1000 },
  ticketLink: { type: String }
})

const Event = mongoose.model("Event", EventSchema);
const Artist = mongoose.model("Artist", ArtistSchema);

// Get all artist
async function getArtists() {
  await db.connect();
  return await Artist.find({}).sort({ name: "asc" });
}

async function getEvents(){
  await db.connect();
  return await Event.find({}).sort({ name: "asc" });
}

async function initializeEvents() {
  let eventList = [
    {
      artistId: "67c478a62b201a76293a989f", // actual id
      name: "Tyler, The Creator Live in Concert",
      date: new Date("2023-12-15T19:00:00Z"), // December 15, 2023, 7:00 PM UTC
      location: "Madison Square Garden, New York, NY",
      description: "Join Tyler, The Creator for an unforgettable night of music and energy at Madison Square Garden. Featuring hits from 'Igor' and 'Flower Boy.'",
      ticketLink: "https://ticketmaster.com/tyler-nyc"
    },
    {
      artistId: "67c478a62b201a76293a989c", // actual id
      name: "Coldplay: Music of the Spheres World Tour",
      date: new Date("2024-03-22T20:00:00Z"), // March 22, 2024, 8:00 PM UTC
      location: "Wembley Stadium, London, UK",
      description: "Experience Coldplay's spectacular Music of the Spheres World Tour at Wembley Stadium. A night of lights, music, and magic!",
      ticketLink: "https://ticketmaster.com/coldplay-london"
    }
  ]
  await Event.insertMany(eventList);
}

async function initializeArtists() {
  let artistList = [
    {
      name: "Coldplay",
      biography: "Coldplay is a British rock band formed in London in 1996. Known for their melodic pop-rock sound and anthemic hits, the band has become one of the best-selling music acts in the world. Their music often explores themes of love, hope, and introspection.",
      genre: "Pop Rock",
      releases: [
        {
          name: "Parachutes",
          tracks: ["Don't Panic", "Shiver", "Spies", "Sparks", "Yellow", "Trouble", "Parachutes", "High Speed", "We Never Change", "Everything's Not Lost"],
          description: "Parachutes is the debut studio album by Coldplay, released in 2000. It features the hit single 'Yellow,' which catapulted the band to international fame."
        },
        {
          name: "A Rush of Blood to the Head",
          tracks: ["Politik", "In My Place", "God Put a Smile upon Your Face", "The Scientist", "Clocks", "Daylight", "Green Eyes", "Warning Sign", "A Whisper", "A Rush of Blood to the Head", "Amsterdam"],
          description: "A Rush of Blood to the Head is the second studio album by Coldplay, released in 2002. It includes iconic tracks like 'Clocks' and 'The Scientist.'"
        }
      ]
    },
    {
      name: "Tyler, The Creator",
      biography: "Tyler Gregory Okonma, known professionally as Tyler, The Creator, is an American rapper, singer, songwriter, and producer. He is a founding member of the alternative hip-hop collective Odd Future and is known for his eclectic style, blending hip-hop, jazz, and neo-soul.",
      genre: "Hip-Hop",
      releases: [
        {
          name: "Igor",
          tracks: ["Igor's Theme", "Earfquake", "I Think", "Running Out of Time", "New Magic Wand", "A Boy Is a Gun", "Puppet", "What's Good", "Gone, Gone / Thank You", "I Don't Love You Anymore", "Are We Still Friends?"],
          description: "Igor is the fifth studio album by Tyler, The Creator, released in 2019. It won the Grammy Award for Best Rap Album and is praised for its innovative production and emotional depth."
        },
        {
          name: "Flower Boy",
          tracks: ["Foreword", "Where This Flower Blooms", "Sometimes...", "See You Again", "Who Dat Boy", "Pothole", "Garden Shed", "Boredom", "I Ain't Got Time!", "911 / Mr. Lonely", "Droppin' Seeds", "Glitter"],
          description: "Flower Boy is the fourth studio album by Tyler, The Creator, released in 2017. It marked a significant shift in his musical style, incorporating more introspection and vulnerability."
        }
      ]
    }
  ];
  await Artist.insertMany(artistList);
}

async function addArtist(){
  await db.connect();
  let newArtist = new Artist({
    name: artistName,
    biography: artistBio,
    genre: artistGenre,
    releases: artistReleases
  });
  await newArtist.save()
}

async function addMultipleArtists(artistsArray){
  await db.connect();
  await Artist.insertMany(artistsArray);
}

async function addMultipleEvents(eventArray) {
  await db.connect();
  await Event.insertMany(eventArray);
}

async function deleteArtistByName(artistName){
  await db.connect();
   //deleteOne will delete the first document which matches the query/filter
   let result = await Artist.deleteOne({ name: artistName });
}

module.exports = {
  getArtists,
  initializeArtists,
  addArtist,
  addMultipleArtists,
  deleteArtistByName,
  getEvents,
  initializeEvents,
  addMultipleEvents
}