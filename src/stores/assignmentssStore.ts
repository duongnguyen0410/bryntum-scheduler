import { AssignmentStore } from "@bryntum/schedulerpro";

const assignmentStore = new AssignmentStore({
  autoLoad: true,
  autoCommit: true,
  readUrl: "http://localhost:8000/schedulers/assignments/",
  createUrl: "http://localhost:8000/schedulers/assignments/remote/create/",
  updateUrl: "http://localhost:8000/schedulers/assignments/remote/update/",
  deleteUrl: "http://localhost:8000/schedulers/assignments/remote/delete/",
});

export default assignmentStore;
