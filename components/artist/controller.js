const db = require("./model"); 

const getAllArtists = async (request, response) => {
  let artistList = await db.getArtists();
  //if there's nothing in the artist collection, initialize with some content then get the artist again
  if (!artistList.length) {
    await db.initializeArtists(); 
    artistList = await db.getArtists();
  }
  response.render("index", { artists: artistList });
  // response.json(artistList)
}

const getAllEvents = async (request, response) => {
  let eventList = await db.getEvents();
  // if there is not events, initialize some
  if(!eventList.length) {
    await db.initializeEvents();
    eventList = await db.getEvents();
  }
  response.render("event", { events: eventList })
}


const addEventInBulk = async(req, res) => {
  try {
    const eventArray = req.body;
    await db.addMultipleEvents(eventArray);
    res.status(201).json({message: "Events added successfully"});
  } catch (error) {
    res.status(500).json({error: "Failed to add", details: error.message})
  }
}

const addArtistInBulk = async(req, res) => {
  try {
    const artistsArray = req.body;
    await db.addMultipleArtists(artistsArray);
    res.status(201).json({message: "Artists added successfully!"});
  } catch (error) {
    res.status(500).json({error: "Failed to add", details: error.message })
  }
}

module.exports = {
  getAllArtists,
  getAllEvents,
  addEventInBulk,
  addArtistInBulk
  
}