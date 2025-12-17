interface TaskFilterProps {
  filter: string;
  onChange: (value: string) => void;
}

const TaskFilter = ({ filter, onChange }: TaskFilterProps) => {
  return (
    <div>
      <label>Filter: </label>
      <select value={filter} onChange={(e) => onChange(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilter;
