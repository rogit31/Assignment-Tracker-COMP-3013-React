import { useState, useEffect } from "react";
import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";

interface AssignmentType {
  title: string;
  isChecked: boolean;
  timestamp: string;
  dueDate: string;
}

export function AssignmentsDisplay() {
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [checkCount, setCheckCount] = useState<number>(0);

  useEffect(() => {
    const storedAssignments: AssignmentType[] = JSON.parse(localStorage.getItem("assignments") || "[]");
    setAssignments(storedAssignments);

    const initialCheckCount = storedAssignments.filter((assignment) => assignment.isChecked).length;
    setCheckCount(initialCheckCount);
  }, []);

  const handleCheck = (index: number) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index].isChecked = !updatedAssignments[index].isChecked;
    setAssignments(updatedAssignments);

    const newCheckCount = updatedAssignments.filter((assignment) => assignment.isChecked).length;
    setCheckCount(newCheckCount);

    localStorage.setItem("assignments", JSON.stringify(updatedAssignments));
  };

  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignments.length}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{checkCount} of {assignments.length}</span>
        </div>
      </header>

      <div className={styles.list}>
        {assignments.map((assignment, index) => (
          <Assignment
            key={index}
            index={index}
            data={assignment}
            isChecked={assignment.isChecked}
            handleCheck={() => handleCheck(index)}
          />
        ))}
      </div>
    </section>
  );
}
