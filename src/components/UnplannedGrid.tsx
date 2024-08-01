import React, { useEffect, useState, MutableRefObject } from "react";
import { BryntumGrid, BryntumSchedulerPro } from "@bryntum/schedulerpro-react";

import Task from "../lib/Task";
import TaskStore from "../lib/TaskStore";
import { unplannedGridConfig } from "@/components/Scheduler/SchedulerRemoteData";

interface Props {
  gridRef: MutableRefObject<BryntumGrid>;
  schedulerRef: MutableRefObject<BryntumSchedulerPro>;
}

export const UnplannedGrid = (props: Props) => {
  const { gridRef, schedulerRef } = props;
  const [store] = useState({
    modelClass: Task,
    readUrl: "data/unplanned.json",
    autoLoad: true,
  });

  useEffect(() => {
    const store = gridRef.current.instance.store as TaskStore;
    const eventStore = schedulerRef.current.instance.eventStore;
    let detachUpdateListener: Function;

    if (eventStore && store) {
      detachUpdateListener = eventStore.on({
        update: ({ record, changes }: { record: Task; changes: any }) => {
          if ("resourceId" in changes && !record.resourceId) {
            eventStore.remove(record);
            store.add(record);
          }
        },
      });
    }
    return () => {
      detachUpdateListener?.();
    };
  }, [gridRef, schedulerRef]);

  return <BryntumGrid ref={gridRef} store={store} {...unplannedGridConfig} />;
};
