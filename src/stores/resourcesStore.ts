import { ResourceStore } from "@bryntum/schedulerpro";

const resourceStore = new ResourceStore({
  autoLoad: true,
  autoCommit: true,
  readUrl: "http://localhost:8000/schedulers/resources/",
  updateUrl: "http://localhost:8000/schedulers/resources/remote/update/",
  deleteUrl: "http://localhost:8000/schedulers/resources/remote/delete/",
});

export default resourceStore;
