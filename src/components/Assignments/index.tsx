import { useState, useEffect } from "react";
import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";

export function AssignmentsDisplay() {
  const [assignments, setAssignments] = useState([]);
  const [checkCount, setCheckCount] = useState();

  useEffect(() => {
    //Fetch JSON data from local storage
    const storedAssignments = JSON.parse(localStorage.getItem("assignments") || "[]");
    setAssignments(storedAssignments);

    //Initialize the checkCount to the length of a filtered array where isChecked is true
    const initialCheckCount = storedAssignments.filter((assignment:any) => assignment.isChecked).length;
    setCheckCount(initialCheckCount);
  }, []);

    //HandleCheck function is passed to child assignment as a prop since it needs to use it to change the style of the check but needs to be defined here to useState
  const handleCheck = (index:number) => {
    //Spread operator is necessary to update states in react apparently? 
    const updatedAssignments = [...assignments];

    //Change the isChecked flag on the Assignment of matching index
    updatedAssignments[index].isChecked = !updatedAssignments[index].isChecked;
    //Update state
    setAssignments(updatedAssignments);

    // Update check count based on checked assignments length
    const newCheckCount = updatedAssignments.filter((assignment) => assignment.isChecked).length;
    setCheckCount(newCheckCount);

    // Update localStorage
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
          <span>
            {checkCount} of {assignments.length}
          </span>
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
