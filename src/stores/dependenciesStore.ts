import { DependencyStore } from "@bryntum/schedulerpro";

const dependencyStore = new DependencyStore({
  autoLoad: true,
  autoCommit: true,
  readUrl: "http://localhost:8000/schedulers/dependencies/",
  createUrl: "http://localhost:8000/schedulers/dependencies/remote/create/",
  updateUrl: "http://localhost:8000/schedulers/dependencies/remote/update/",
  deleteUrl: "http://localhost:8000/schedulers/dependencies/remote/delete/",
});

export default dependencyStore;
