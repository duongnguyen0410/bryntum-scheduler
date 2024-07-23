import styles from "./page.module.css";
import "@bryntum/scheduler/scheduler.stockholm.css";

import { SchedulerInlineData } from "@/components/SchedulerInlineData";
import SchedulerRemoteData from "@/components/SchedulerRemoteData";

export default function Home() {
  return (
    <main className={styles.main}>
      <SchedulerRemoteData />
      {/* <SchedulerInlineData /> */}
    </main>
  );
}
