"use client";

import React from "react";
import {
  BryntumScheduler,
  BryntumSchedulerBaseProps,
} from "@bryntum/scheduler-react";

const SchedulerRemoteData: React.FC = () => {
  const schedulerConfig: BryntumSchedulerBaseProps = {
    startDate: new Date(2024, 2, 21),
    endDate: new Date(2024, 2, 25),
    crudManager: {
      autoLoad: true,
      autoSync: true,
      loadUrl: "/api/load",
      syncUrl: "/api/sync",
    },
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

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <BryntumScheduler {...schedulerConfig} />
    </div>
  );
};

export default SchedulerRemoteData;