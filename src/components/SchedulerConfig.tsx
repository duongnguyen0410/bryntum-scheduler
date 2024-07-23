import { AssignmentStore, EventStore, ResourceStore } from "@bryntum/scheduler";
import { BryntumSchedulerProps } from "@bryntum/scheduler-react";

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
    { id: "r1", name: "John Doe" },
    { id: "r2", name: "Jane Smith" },
  ],
});

const schedulerConfig: BryntumSchedulerProps = {
  startDate: new Date(2024, 2, 21),
  endDate: new Date(2024, 2, 25),
  eventStore: eventStore,
  resourceStore: resourceStore,
  viewPreset: "hourAndDay",
  eventStyle: "border",
  timeRangesFeature: true,
  barMargin: 10,
  columns: [
    {
      type: "resourceInfo",
      text: "Name",
      field: "name",
      width: 200,
      showImage: false,
    },
  ],
  stripeFeature: true,
  dependenciesFeature: true,
};

export { schedulerConfig };
