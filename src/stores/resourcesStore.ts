import { ResourceStore } from "@bryntum/schedulerpro";

const resourceStore = new ResourceStore({
  autoLoad: true,
  autoCommit: true,
  readUrl: "http://localhost:8000/schedulers/resources/",
});

export default resourceStore;
