"use client";

import { schedulerConfig } from "@/components/SchedulerConfig";
import { BryntumDemoHeader, BryntumScheduler } from "@bryntum/scheduler-react";
import { BryntumSchedulerPro } from "@bryntum/schedulerpro-react";
import { Fragment, useEffect, useRef } from "react";

const SchedulerInlineData = () => {
  const schedulerProRef = useRef<BryntumSchedulerPro>(null);
  const schedulerProInstance = () => schedulerProRef.current?.instance;

  useEffect(() => {
    // Bryntum Scheduler instance
    schedulerProInstance()?.project.load();
  }, []);

  console.log(schedulerConfig.resourceStore?.data);

  return (
    <Fragment>
      {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
      <BryntumSchedulerPro ref={schedulerProRef} {...schedulerConfig} />
    </Fragment>
  );
};

export { SchedulerInlineData };
