import styles from "./page.module.css";
import "@bryntum/scheduler/scheduler.stockholm.css";

import { SchedulerInlineData } from "@/components/Scheduler/SchedulerInlineData";
import SchedulerContent from "@/components/Scheduler/SchedulerContent";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <SchedulerContent />
    </>
  );
}
