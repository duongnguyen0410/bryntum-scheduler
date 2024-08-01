import { EventStore } from "@bryntum/schedulerpro";

const eventStore = new EventStore({
  autoLoad: true,
  autoCommit: true,
  readUrl: "http://localhost:8000/schedulers/events/",
  createUrl: "http://localhost:8000/schedulers/events/remote/create/",
  updateUrl: "http://localhost:8000/schedulers/events/remote/update/",
  deleteUrl: "http://localhost:8000/schedulers/events/remote/delete/",
  fields: [
    { name: "id", type: "string" },
    { name: "resourceId", type: "string" },
    { name: "startDate", type: "date" },
    { name: "endDate", type: "date" },
    { name: "name", type: "string" },
    { name: "duration", type: "number" },
    { name: "durationUnit", type: "string" },
    { name: "cls", type: "string" },
    { name: "exceptionDates", type: "array" },
    { name: "allDay", type: "boolean" },
  ],
});

export default eventStore;
