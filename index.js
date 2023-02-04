const express = require('express');
const app = express();
app.use(express.json());

const genres = ["Pop", "Hip-Hop", "Rap", "Classical", "Rock", "Jazz", "Blues", "electronic"]

const songs = [
    {id: 3, name:"Dior", genre: "Rap", year: 2020, month: "February"},
    {id: 2, name:"Many Men", genre: "Hip-Hop", year: 2002, month: "May"},
    {id: 1, name:"Blank Space", genre: "Pop", year: 2014, month: "October"},
    {id: 4, name:"Divenire", genre: "Classical", year: 2006, month: "November"},
    {id: 5, name:"Smells like Teen Spirit", genre: "Rock", year: 1991, month: "September"},
    {id: 6, name:"What a wonderful world", genre: "Jazz", year: 1966, month: "July"},
    {id: 7, name:"Born under a sun", genre: "Blues", year: 1967, month: "June"},
    {id: 8, name:"Evacuate the dance floor", genre: "Electronic", year: 2006, month: "April"},

]

app.use(express.json())

function getMonth(month) {
    switch(month) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return "Invalid Month"
    }

}

// GET Request
app.get('/', (req, res) => {
    res.send('By Neshaan Reed')
})

app.get('/api/genres', (req, res)=>{
    res.send(genres);
})

app.get('/api/songs', (req, res)=>{
    res.send(songs);
})

app.get('/api/songs/:id', (req,res)=> {
    let song = songs.find(c=> c.id === parseInt(req.params.id))
    if (!song) {
        res.status(404).send('Song(s) with selected ID not found')
        return
    }
    res.send(song);
})

app.get('/api/songs/:year/:month', (req,res) => {
    let filtered = songs.filter((c) => c.year == req.params.year && c.month == req.params.month)
    if (filtered.length === 0) {
        res.status(404).send("Song(s) with selected date not found")
        return
    }
    res.send(filtered)
})

app.get('/api/genre/:genre', (req,res) => {
    let filtered = songs.filter((c) => c.genre == req.params.genre)
    if (filtered.length === 0) {
        res.status(404).send("Song(s) with selected genre not found")
        return
    }
    res.send(filtered)
})

// POST Requests
app.post('/api/songs', (req,res) => {
    let name = req.body.name
    let genre = req.body.genre
    let year = req.body.year
    let month = req.body.month

    if (!genre || !name)
    {
        res.status(404).send("Genre and name required")
        return
    }
    else if (name.length < 3)
    {
        res.status(404).send("Song name must be more than 3 characters")
        return
    }
    else if (!year || !month)
    {
        date = new Date()
        year = date.getFullYear()
        month = getMonth(date.getMonth())
    }

    let song = {
        id: songs.length +1,
        name: name,
        genre: genre,
        year: year,
        month: month
    }

    songs.push(song)

    res.send(song)
});

// PUT Requests
app.put('/api/songs/:id', (req,res)=>{
    let song = songs.find((c) => c.id === parseInt(req.params.id))
    if (!song) {
        res.status(404).send('Song not found')
        return
    }
    else if (!req.body.genre || !req.body.name)
    {
        res.status(404).send("Provide the song's genre and name")
    }
    else if (req.body.name.length < 3)
    {
        res.status(404).send('Song name must be more than 3 characters')
        return
    }
    else {
        song["name"] = req.body.name
        song["genre"] = req.body.genre;
        res.send(song)
    }
});

// Delete Requests
app.delete('/api/songs/:id', (req,res)=>{
    let song = songs.find(c => c.id === parseInt(req.params.id))
    if (!song)
    {
        res.status(404).send('Song not found')
        return
    }
    else
    {
        let index = songs.indexOf(song)
        songs.splice(index, index+1)
        res.send(song)

    }
});


app.listen(3000, () => {
    console.log("Listening on port 3000...")
})