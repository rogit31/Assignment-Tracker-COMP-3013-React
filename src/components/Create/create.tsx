
import { AiOutlinePlusCircle } from "react-icons/ai";

interface CreateProps {
  inputValue: string;
}

const Create: React.FC<CreateProps> = ({ inputValue }) => { 

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (inputValue.trim() === "") {
      event.preventDefault();
    } else {

      const data = {title: inputValue, isChecked:false};
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
