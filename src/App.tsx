import { v4 as uuidV4 } from "uuid";

import { Header } from "./components/Header";

import styles from "./App.module.css";
import { Task } from "./components/Task";
import { ChangeEvent, FormEvent, useState } from "react";
import { ClipboardText, Notepad, PlusCircle } from "phosphor-react";

interface Task {
  id: string;
  text: string;
  isComplete: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newText, setNewText] = useState("");

  const isNewTextEmpty = newText.length === 0;

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks([
      ...tasks,
      {
        id: uuidV4(),
        text: newText,
        isComplete: false,
      },
    ]);
    setNewText("");
  }

  function deleteTask(taskId: string) {
    const taskWithoutDeleteOne = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(taskWithoutDeleteOne);
  }

  function changeTheStatusOfTask(id: string) {
    const taskList = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }

      return task;
    });

    setTasks(taskList);
  }

  function handleNewTextChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");

    setNewText(event.target.value);
  }

  function howMuchCompletedTasks() {
    if (tasks.length <= 0) {
      return "0";
    } else {
      const completeTask = tasks.filter((task) => task.isComplete).length;
      return `${completeTask} de ${tasks.length}`;
    }
  }

  return (
    <div>
      <Header />
      <main className={styles.content}>
        <div className={styles.taskBarContainer}>
          <form onSubmit={handleCreateNewTask} className={styles.taskBar}>
            <input
              className={styles.input}
              type="text"
              placeholder="Adicione uma nova tarefa"
              onChange={handleNewTextChange}
              value={newText}
            />
            <button
              type="submit"
              className={styles.button}
              disabled={isNewTextEmpty}
            >
              Criar <PlusCircle size={16} />
            </button>
          </form>
        </div>
        <section>
          <header>
            <p className={styles.totalTask}>
              Tarefas criadas <span>{tasks.length}</span>
            </p>
            <p className={styles.completTask}>
              Concluídas <span>{howMuchCompletedTasks()}</span>
            </p>
          </header>
          <div className={styles.listTasksBox}>
            {tasks.length === 0 ? (
              <div className={styles.listEmptyBox}>
                <Notepad size={56} />
                <p>Você ainda não tem tarefas cadastradas</p>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            ) : (
              tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    text={task.text}
                    isComplete={task.isComplete}
                    onDeleteTask={deleteTask}
                    onTaskChangeStatusCompletedOne={changeTheStatusOfTask}
                  />
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
