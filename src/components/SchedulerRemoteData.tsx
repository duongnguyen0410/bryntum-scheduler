"use client";

import {
  BryntumScheduler,
  BryntumSchedulerBaseProps,
} from "@bryntum/scheduler-react";
import { AssignmentStore, DependencyStore, EventStore, ResourceStore } from "@bryntum/schedulerpro";
import { BryntumSchedulerPro, BryntumSchedulerProBaseProps } from "@bryntum/schedulerpro-react";

const resourceStore = new ResourceStore({
  autoLoad: true,
  autoCommit: true,
  readUrl: "http://localhost:8000/schedulers/resources/",
  updateUrl: "http://localhost:8000/schedulers/resources/remote/update/",
  deleteUrl: "http://localhost:8000/schedulers/resources/remote/delete/",
});

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

const assignmentStore = new AssignmentStore({
  autoLoad: true,
  autoCommit: true,
  readUrl: "http://localhost:8000/schedulers/assignments/",
  createUrl: "http://localhost:8000/schedulers/assignments/remote/create/",
  updateUrl: "http://localhost:8000/schedulers/assignments/remote/update/",
  deleteUrl: "http://localhost:8000/schedulers/assignments/remote/delete/",
});

const dependenciesStore = new DependencyStore({
  autoLoad: true,
  autoCommit: true,
  readUrl: "http://localhost:8000/schedulers/dependencies/",
  createUrl: "http://localhost:8000/schedulers/dependencies/remote/create/",
})

const SchedulerRemoteData: React.FC = () => {
  const schedulerConfig: BryntumSchedulerProBaseProps = {
    startDate: new Date(2024, 2, 21),
    endDate: new Date(2024, 2, 25),
    resourceStore: resourceStore,
    eventStore: eventStore,
    assignmentStore: assignmentStore,
    dependencyStore: dependenciesStore,
    viewPreset: "hourAndDay",
    eventStyle: "border",
    timeRangesFeature: true,
    barMargin: 10,
    columns: [
      {
        type: "tree",
        text: "Work Centers",
        field: "name",
        width: 300,
      },
    ],
    stripeFeature: false,
    dependenciesFeature: true,
    treeFeature: true,
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <BryntumSchedulerPro {...schedulerConfig} />
    </div>
  );
};

export default SchedulerRemoteData;
