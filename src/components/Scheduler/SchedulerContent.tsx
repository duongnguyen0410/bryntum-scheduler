'use client';

import { schedulerConfig } from "@/components/Scheduler/SchedulerRemoteData";
import { UnplannedGrid } from "@/components/UnplannedGrid";
import Drag from "@/lib/Drag";
import Task from "@/lib/Task";
import TaskStore from "@/lib/TaskStore";
import { SchedulerEventModel, SchedulerResourceModel } from "@bryntum/schedulerpro";
import { BryntumGrid, BryntumSchedulerPro, BryntumSplitter } from "@bryntum/schedulerpro-react"
import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react"

const SchedulerContent = () => {
    const schedulerRef = useRef<BryntumSchedulerPro>() as MutableRefObject<BryntumSchedulerPro>;
    const gridRef = useRef<BryntumGrid>() as MutableRefObject<BryntumGrid>;

    const [autoReschedule, setAutoReschedule] = useState<Boolean>(false);

    const onEventStoreUpdate = useCallback(
      ({
        record,
        source: eventStore,
      }: {
        record: Task;
        source: TaskStore;
      }): void => {
        if (autoReschedule) {
          eventStore.rescheduleOverlappingTasks(record);
        }
      },
      [autoReschedule]
    );

    const onEventStoreAdd = useCallback(
      ({
        records,
        source: eventStore,
      }: {
        records: Task[];
        source: TaskStore;
      }): void => {
        if (autoReschedule) {
          records.forEach((eventRecord) =>
            eventStore.rescheduleOverlappingTasks(eventRecord)
          );
        }
      },
      [autoReschedule]
    );

    const [eventMenuFeature] = useState({
      items: {
        // custom item with inline handler
        unassign: {
          text: "Unassign",
          icon: "b-fa b-fa-user-times",
          weight: 200,
          onItem: ({
            eventRecord,
            resourceRecord,
          }: {
            eventRecord: SchedulerEventModel;
            resourceRecord: SchedulerResourceModel;
          }) => eventRecord.unassign(resourceRecord),
        },
      },
    });

    useEffect(() => {
      const eventStore = schedulerRef.current.instance.eventStore;
      Object.assign(eventStore, {
        onUpdate: onEventStoreUpdate,
        onAdd: onEventStoreAdd,
      });
    }, [onEventStoreAdd, onEventStoreUpdate]);

    useEffect(() => {
      const drag = new Drag({
        grid: gridRef.current.instance,
        schedule: schedulerRef.current.instance,
        constrain: false,
        outerElement: gridRef.current.instance.element,
      });
      return () => {
        drag.destroy();
      };
    }, []);



    return (
      <div className=" flex h-[100%]">
        <div className="w-[83%]">
          <BryntumSchedulerPro
            ref={schedulerRef}
            eventMenuFeature={eventMenuFeature}
            eventDragFeature={{ showTooltip: true }}
            {...schedulerConfig}
          />
        </div>
        <BryntumSplitter />
        <div className="w-[17%]">
          <UnplannedGrid gridRef={gridRef} schedulerRef={schedulerRef} />
        </div>
      </div>
    );
};

export default SchedulerContent;