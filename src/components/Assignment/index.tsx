import { TbTrash } from "react-icons/tb";
import { AiFillCheckCircle } from "react-icons/ai";
import styles from "./assignment.module.css";

interface AssignmentProps {
  index: number;
  data: { title: string; isChecked: boolean; timestamp: string };
  isChecked: boolean;
  handleCheck: () => void;
}

export function Assignment({ index, data, isChecked, handleCheck }: AssignmentProps) {
  const handleDelete = () => {
    const storedAssignments = JSON.parse(localStorage.getItem("assignments") || "[]");
    const updatedAssignments = storedAssignments.filter((_:any, idx: number) => idx !== index);
    localStorage.setItem("assignments", JSON.stringify(updatedAssignments));
    window.location.reload();
  };

  return (
    <div className={styles.assignment}>
      <button className={styles.checkContainer} onClick={handleCheck}>
        {isChecked ? <AiFillCheckCircle size={20} /> : <div />}
      </button>
      <p className={isChecked ? styles.textCompleted : ''}>{data.title}</p>
      <button className={styles.deleteButton} onClick={handleDelete}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
