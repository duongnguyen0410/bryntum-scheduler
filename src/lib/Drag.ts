/**
 * Taken from the vanilla dragfromgrid example
 */
import Task from "@/lib/Task";
import TaskStore from "@/lib/TaskStore";
import {
  DateHelper,
  DomHelper,
  DragHelper,
  DragHelperConfig,
  Grid,
  SchedulerResourceModel,
  Scheduler,
  ScrollManager,
  Tooltip,
  Toast,
  ResourceModel,
} from "@bryntum/schedulerpro";


type DragConfig = DragHelperConfig & {
  grid: Grid;
  schedule: Scheduler;
  outerElement: HTMLElement;
};

export default class Drag extends DragHelper {
  static get configurable() {
    return {
      callOnFunctions: true,
      // Don't drag the actual row element, clone it
      cloneTarget: true,
      // We size the cloned element manually
      autoSizeClonedTarget: false,
      // Only allow drops on the schedule area
      dropTargetSelector: ".b-timeline-subgrid",
      // Only allow drag of row elements inside on the unplanned grid
      targetSelector: ".b-grid-row:not(.b-group-row)",
    };
  }

  public scrollManager!: ScrollManager;
  public grid: Grid;
  public outerElement: HTMLElement;

  private tip: Tooltip | undefined;
  private _schedule!: Scheduler;

  // We need this construction for TypeScript
  // Also, we cannot use `me` as variable for `this`
  constructor(config: DragConfig) {
    super(config);
    this.grid = config.grid;
    this.schedule = config.schedule;
    this.outerElement = config.outerElement;
  }

  afterConstruct(): void {
    // Configure DragHelper with schedule's scrollManager to allow scrolling while dragging
    this.scrollManager = this.schedule.scrollManager as ScrollManager;
  }

  createProxy(element: HTMLElement): HTMLDivElement {
    const proxy = document.createElement("div");
    const { schedule } = this;
    const task = this.grid.getRecordFromElement(element) as Task;
    const durationInPx = schedule.timeAxisViewModel.getDistanceForDuration(
      task.getDurationMS()
    );
    // Fake an event bar
    proxy.classList.add(
      "b-sch-event-wrap",
      "b-sch-event",
      "b-unassigned-class",
      `b-sch-${schedule.mode}`
    );
    proxy.innerHTML = `<div class="b-sch-event b-has-content b-sch-event-withicon">
            <div class="b-sch-event-content">
              ${task.get("name")}
            </div>
        </div>`;

    if (schedule.mode === "horizontal") {
      proxy.style.height = `${
        schedule.rowHeight - 2 * (schedule.resourceMargin as number)
      }px`;
      proxy.style.width = `${durationInPx}px`;
    } else {
      proxy.style.height = `${durationInPx}px`;
      proxy.style.width = `${schedule.resourceColumnWidth}px`;
    }

    return proxy;
  }

  onDragStart: (event: {
    source: DragHelper;
    context: any;
    event: MouseEvent | TouchEvent;
  }) => boolean | void = ({
    context,
  }: {
    context: {
      task: any;
      element: HTMLElement;
      grabbed: HTMLElement;
      relatedElements: HTMLElement[];
    };
  }) => {
    const me = this;
    const { schedule } = me;
    const { eventTooltip, eventDrag } = schedule.features;

    // save a reference to the task so we can access it later
    context.task = me.grid.getRecordFromElement(context.grabbed);

    // Prevent tooltips from showing while dragging
    eventTooltip.disabled = true;

    schedule.enableScrollingCloseToEdges(schedule.timeAxisSubGrid);

    if (eventDrag.showTooltip && !me.tip) {
      me.tip = new Tooltip({
        align: "b-t",
        forElement: context.element,
        cls: "b-popup b-sch-event-tooltip",
      });
    }
  };

  onDrag: (event: {
    source: DragHelper;
    context: any;
    event: MouseEvent;
  }) => boolean | void = ({
    context,
    event,
  }: {
    context: {
      element: HTMLElement;
      target: HTMLElement;
      grabbed: HTMLElement;
      relatedElements: HTMLElement[];
      valid: boolean;
    };
    event: MouseEvent;
  }) => {
    const me = this;
    const { schedule } = me;
    const task = (context as any).task;
    const coordinate = DomHelper[
      `getTranslate${schedule.mode === "horizontal" ? "X" : "Y"}`
    ](context.element);
    const startDate = schedule.getDateFromCoordinate(
      coordinate,
      "round",
      false,
      true
    );
    const endDate =
      startDate && DateHelper.add(startDate, task.duration, task.durationUnit);
    // Coordinates required when used in vertical mode, since it does not use actual columns
    const resource =
      context.target &&
      schedule.resolveResourceRecord(context.target, [
        event.offsetX,
        event.offsetY,
      ]);

    // Don't allow drops anywhere, only allow drops if the drop is on the timeaxis and on top of a Resource
    context.valid =
      Boolean(startDate && resource) &&
      (schedule.allowOverlap ||
        schedule.isDateRangeAvailable(startDate, endDate, null, resource));

    // Save reference to resource so we can use it in onTaskDrop
    (context as any).resource = resource;

    if (me.tip && context.valid) {
      const dateFormat = schedule.displayDateFormat,
        formattedStartDate = DateHelper.format(startDate, dateFormat),
        formattedEndDate = DateHelper.format(endDate, dateFormat);

      me.tip.html = `
                <div class="b-sch-event-title">${task.name}</div>
                <div class="b-sch-tooltip-startdate">Starts: ${formattedStartDate}</div>
                <div class="b-sch-tooltip-enddate">Ends: ${formattedEndDate}</div>
            `;
      me.tip.showBy(context.element);
    } else if (me.tip) {
      me.tip.hide();
    }
  };

  // Drop callback after a mouse up, take action and transfer the unplanned task to the real SchedulerEventStore (if it's valid)
  onDrop: (event: { source: DragHelper; context: any }) => boolean | void = ({
    context,
  }: {
    context: {
      task: Task;
      resource: ResourceModel;
      element: HTMLElement;
      target: HTMLElement;
      grabbed: HTMLElement;
      relatedElements: HTMLElement[];
      valid: boolean;
    };
  }) => {
    const me = this;
    const { schedule } = me;
    const { task, target, resource, valid, element } = context;

    me.tip?.hide();

    schedule.disableScrollingCloseToEdges(me.schedule.timeAxisSubGrid);

    // If drop was done in a valid location, set the startDate and transfer the task to the Scheduler event store
    if (valid && target) {
      const coordinate =
          DomHelper[
            `getTranslate${schedule.mode === "horizontal" ? "X" : "Y"}`
          ](element),
        date = schedule.getDateFromCoordinate(coordinate, "round", false, true),
        // Try resolving event record from target element, to determine if drop was on another event
        targetEventRecord = schedule.resolveEventRecord(target);

      if (date) {
        // Remove from grid first so that the data change
        // below does not fire events into the grid.
        (me.grid.store as TaskStore).remove(task);

        task.startDate = date;

        task.assign(resource);
        
        console.log(task);
        console.log(schedule.eventStore);
        schedule.eventStore.add(task);
        
      }

      // Dropped on a scheduled event, display toast
      if (targetEventRecord) {
        Toast.show(`Dropped on ${targetEventRecord.name}`);
      }
    }

    if (resource) {
      resource.cls = "";
    }

    schedule.features.eventTooltip.disabled = false;
  };

  set schedule(schedule: Scheduler) {
    this._schedule = schedule;

    // Configure DragHelper with schedule's scrollManager to allow scrolling while dragging
    this.scrollManager = schedule.scrollManager as ScrollManager;
  }

  get schedule(): Scheduler {
    return this._schedule;
  }

  onDragAbort() {
    this.tip?.hide();
  }
}
