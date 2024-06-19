import { TbTrash } from "react-icons/tb";
import { AiFillCheckCircle } from "react-icons/ai";
import styles from "./assignment.module.css";
import { differenceInDays } from "date-fns";

interface AssignmentProps {
  index: number;
  data: { title: string; isChecked: boolean; timestamp: string; dueDate: string };
  isChecked: boolean;
  handleCheck: () => void;
}

export function Assignment({ index, data, isChecked, handleCheck }: AssignmentProps) {
  const handleDelete = () => {
    const storedAssignments = JSON.parse(localStorage.getItem("assignments") || "[]");
    const updatedAssignments = storedAssignments.filter((_: any, idx: number) => idx !== index);
    localStorage.setItem("assignments", JSON.stringify(updatedAssignments));
    window.location.reload();
  };

  const dueDate = new Date(data.dueDate);
  const today = new Date();
  const isDueSoon = differenceInDays(dueDate, today) < 1;
  const dueIn = differenceInDays(dueDate, today);

  let dueText = `Due in ${dueIn} days`;

  if (dueIn === 0){
    dueText = 'Due today'
  }
  else if (dueIn === 1){
    dueText = 'Due tomorrow'
  }
  else if(dueIn < 0){
    dueText = `Was due on ${dueDate}`
  };

  return (
    <div className={styles.assignment}>
      <button className={styles.checkContainer} onClick={handleCheck}>
        {isChecked ? <AiFillCheckCircle size={20} /> : <div />}
      </button>
      <p className={isChecked ? styles.textCompleted : ""}>{data.title}</p>
      <span className={isDueSoon ? styles.dueSoon : ""}>{dueText}</span>
      <button className={styles.deleteButton} onClick={handleDelete}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
