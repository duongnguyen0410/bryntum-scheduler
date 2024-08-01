"use client";

import assignmentStore from "@/stores/assignmentssStore";
import dependencyStore from "@/stores/dependenciesStore";
import eventStore from "@/stores/eventsStore";
import resourceStore from "@/stores/resourcesStore";
import {
  Model,
  SchedulerEventModel,
  StringHelper,
} from "@bryntum/schedulerpro";
import {
  BryntumGridProps,
  BryntumSchedulerProBaseProps,
} from "@bryntum/schedulerpro-react";

const schedulerConfig: BryntumSchedulerProBaseProps = {
  startDate: new Date(2024, 2, 21),
  endDate: new Date(2024, 2, 25),

  resourceStore: resourceStore,
  eventStore: eventStore,
  assignmentStore: assignmentStore,
  dependencyStore: dependencyStore,

  viewPreset: "hourAndDay",
  eventStyle: "border",
  timeRangesFeature: true,
  barMargin: 10,

  stripeFeature: false,
  dependenciesFeature: true,
  treeFeature: true,
  percentBarFeature: true,

  useInitialAnimation: true,

  columns: [
    {
      type: "tree",
      text: "Work Centers",
      field: "name",
      width: 200,
    },
    {
      type: "percent",
      mode: "circle",
      field: "percentDone",
      text: "Progress",
      width: 100,
      align: "center",
      showValue: true,
    },
  ],

  listeners: {
    beforeCellEditStart: ({ editorContext }) =>
      editorContext.column.field !== "percentDone" ||
      editorContext.record.isLeaf,
  },
};

const unplannedGridConfig: BryntumGridProps = {
  rowHeight: 50,
  cls: "b-unplannedgrid",
  columns: [
    {
      text: "Unplanned tasks",
      flex: 1,
      field: "name",
      htmlEncode: false,
      renderer: (data: { record: Model }) => {
        const record = data.record as SchedulerEventModel;
        return StringHelper.xss`</i>${record.name}`;
      },
    },
    {
      text: "Duration",
      width: 100,
      align: "center",
      editor: false,
      field: "duration",
      renderer: (data: { record: Model }) => {
        const record = data.record as SchedulerEventModel;
        return StringHelper.xss`${record.duration} ${record.durationUnit}`;
      },
    },
  ],
  sortFeature: "id",
};

export { schedulerConfig, unplannedGridConfig };
