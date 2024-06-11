import styles from "./header.module.css";
import { uppercase } from "../../helpers/stringHelpers";
import Input from "../Input/input";

export function Header() {
  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm}>
        <Input/>
      </form>
    </header>
  );
}
