import { PlusCircle } from "phosphor-react";

import styles from "./NewTaskBar.module.css";

interface NewTaskBarProps {
  onCreateNewTask: (text: string) => void;
}

export function NewTaskBar() {
  return (
    <form className={styles.taskBar}>
      <input
        className={styles.input}
        type="text"
        placeholder="Adicione uma nova tarefa"
      />
      <button type="submit" className={styles.button}>
        Criar <PlusCircle size={16} />
      </button>
    </form>
  );
}
