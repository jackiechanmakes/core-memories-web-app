
import express from 'express'
import { getEvents, getEventsByDate, createEvent, deleteEvent, updateEvent, replaceEvent, getStats } from './database.js'

const app = express();
app.use(express.json());

app.get('/events', async (request, response) => {
  let events;
  let date = request.query.date;
  if (date === undefined) {
    events = await getEvents();
  } else {
    events = await getEventsByDate(date);
  }

  if (events.length > 0) {
    response.send(events);
  } else {
    response.status(404).send("Events logged corresponding to that date not found");
  }
});

app.delete('/events/:id', async (request, response) => {
  const id = parseInt(request.params.id);
  await deleteEvent(id);
  response.status(204).end();
});

app.post('/events', async (request, response) => {
  const {date, title} = request.body;

  if (!title) {
    return response.status(400).json({
      error: 'Content missing'
    });
  }

  let event = await createEvent(date, title);
  response.status(201).send(event);
});

app.put('/events/:id', async (request, response) => {
  let idParam = request.params.id;
  const {id, date, title} = request.body;
  let event = await replaceEvent(idParam, id, date, title);
  response.send(event);
});

app.patch('/events/:id', async (request, response) => {
  let id = parseInt(request.params.id);
  let title = request.body.title;
  let event = await updateEvent(title, id);
  response.send(event);
});

app.get('/stats', async (request, response) => {
  let stats = await getStats();
  response.send(stats);
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
