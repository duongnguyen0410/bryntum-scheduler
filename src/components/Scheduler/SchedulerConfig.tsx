import { AssignmentStore, EventStore, ResourceStore } from "@bryntum/scheduler";
import { BryntumSchedulerProps } from "@bryntum/scheduler-react";
import { Model, SchedulerResourceModel } from "@bryntum/schedulerpro";
import { BryntumSchedulerProProps } from "@bryntum/schedulerpro-react";

const eventStore = new EventStore({
  data: [
    {
      id: 1,
      resourceId: "r1",
      name: "Meeting",
      startDate: "2024-03-21T09:00:00",
      endDate: "2024-03-21T11:00:00",
    },
    {
      id: 2,
      resourceId: "r2",
      name: "Conference",
      startDate: "2024-03-21T10:00:00",
      endDate: "2024-03-21T12:30:00",
    },
  ],
});

const resourceStore = new ResourceStore({
  data: [
    {
      id: "r1",
      name: "John Doe",
      expanded: true,
      children: [
        { id: "r1.1", name: "John Doe Jr." },
        { id: "r1.2", name: "aaaa" },
      ],
    },
    { id: "r2", name: "Jane Smith" },
  ],
});

const schedulerConfig: BryntumSchedulerProProps = {
  startDate: new Date(2024, 2, 21),
  endDate: new Date(2024, 2, 25),
  viewPreset: "hourAndDay",
  eventStyle: "border",
  barMargin: 10,
  columns: [
    {
      type: "tree",
      text: "Name",
      field: "name",
      width: 200,
    },
    {
      type: "percent",
      text: "Progress",
      width: 220,
      align: "center",
      editor: false,
    },
  ],
  stripeFeature: false,
  dependenciesFeature: true,
  treeFeature: true,

  project: {
    transport: {
      load: {
        url: "data/data.json",
      },
    },
  },
};

export { schedulerConfig };