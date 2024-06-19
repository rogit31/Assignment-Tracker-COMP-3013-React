
import { AiOutlinePlusCircle } from "react-icons/ai";

interface CreateProps {
  inputValue: string;
  dateInputValue: string;
}

const Create: React.FC<CreateProps> = ({ inputValue, dateInputValue}) => { 

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (inputValue.trim() === "") {
      event.preventDefault();
    } else {
      const data = {title: inputValue, isChecked:false, dueDate: dateInputValue};
      const assignments = JSON.parse(localStorage.getItem("assignments") || "[]");
      assignments.push(data);
      localStorage.setItem("assignments", JSON.stringify(assignments));
    }
  };

  return (
    <button
      onClick={handleSubmit}
      style={{
        background: inputValue.trim() === "" ? "gray" : "#8284fa",
        cursor: inputValue.trim() === "" ? 'default' : 'pointer'
      }}
    >
      Create <AiOutlinePlusCircle size={20} />
    </button>
  );
};

export default Create;
