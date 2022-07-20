const express = require("express");
const app = express();

app.use(express.json());

//array api
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

//root address return "pa eso"
app.get("/", (req, res) => {
  res.send("Pa eso?");
});

// getting all notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

//getting an specific note
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

// deleting an specific note
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

// getting the max id number from the array
const generateMaxId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((item) => item.id)) : 0;
  return maxId + 1;
};

// adding a note
app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "Content Missing",
    });
  }

  const note = {
    id: generateMaxId(),
    content: body.content,
    important: body.important || false,
    date: new Date(),
  };

  notes = notes.concat(note);
  res.json(notes);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
