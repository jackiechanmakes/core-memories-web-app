import express from 'express'
import { getEvents, getEventsByDate, createEvent, deleteEvent, updateEvent, replaceEvent, getStats } from './database.js'

const app = express();
app.use(express.json());

app.get('/events', async (request, response) => {
  let events;
  let date = request.query.date;
  if (date === undefined) {
    events = await getEvents(process.env.TEST_IS_MOCK);
  } else {
    events = await getEventsByDate(date, process.env.TEST_IS_MOCK);
  }

  if (events.length > 0) {
    response.status(200).send(events);
  } else {
    response.status(404).send("Events logged corresponding to that date not found");
  }
});

app.delete('/events/:id', async (request, response) => {
  const id = parseInt(request.params.id);
  await deleteEvent(id, process.env.TEST_IS_MOCK);
  response.status(204).end();
});

app.post('/events', (request, response) => {
  const {date, title} = request.body;

  if (!title) {
    return response.status(400).json({
      error: 'Content missing'
    });
  }

  let event = createEvent(date, title, process.env.TEST_IS_MOCK);
  response.status(201).send(event);
});

app.put('/events/:id', async (request, response) => {
  let idParam = request.params.id;
  const {id, date, title} = request.body;
  let event = await replaceEvent(idParam, id, date, title, process.env.TEST_IS_MOCK);
  response.send(event);
});

app.patch('/events/:id', async (request, response) => {
  let id = parseInt(request.params.id);
  let title = request.body.title;
  let event = await updateEvent(title, id, process.env.TEST_IS_MOCK);
  response.send(event);
});

app.get('/stats', async (request, response) => {
  let stats = await getStats(process.env.TEST_IS_MOCK);
  response.send(stats);
});

export default app
