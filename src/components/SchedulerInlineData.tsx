"use client";

import { schedulerConfig } from "@/components/SchedulerConfig";
import { BryntumScheduler } from "@bryntum/scheduler-react";
import { useEffect, useRef } from "react";

const SchedulerInlineData = () => {
  const schedulerRef = useRef<BryntumScheduler>(null);

  useEffect(() => {
    // Bryntum Scheduler instance
    schedulerRef?.current?.instance;
  }, []);

  console.log(schedulerConfig.resourceStore?.data);

  return (
    <>
      <BryntumScheduler {...schedulerConfig} />
    </>
  );
};

export { SchedulerInlineData };
