import { Trash } from "phosphor-react";
import styles from "./Task.module.css";

interface Task {
  id: string;
  text: string;
  isComplete: boolean;
  onDeleteTask: (taskId: string) => void;
  onTaskChangeStatusCompletedOne: (taskId: string) => void;
}

export function Task({
  id,
  isComplete,
  text,
  onDeleteTask,
  onTaskChangeStatusCompletedOne,
}: Task) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleCheckTask() {
    onTaskChangeStatusCompletedOne(id);
  }

  return (
    <div className={styles.task}>
      <div className={styles.checkBox}>
        <input
          type="checkbox"
          readOnly
          checked={isComplete}
          onClick={handleCheckTask}
        />
      </div>
      <p
        className={
          isComplete ? `${styles.completedTask}` : `${styles.textTask}`
        }
      >
        {text}
      </p>
      <button onClick={handleDeleteTask} title="Deletar taréfa">
        <Trash size={16} />
      </button>
    </div>
  );
}
