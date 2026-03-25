import { useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";

const List = ({ tasks }: any) => {
  
  const updateTaskStatus = useTaskStore((s: any) => s.updateTaskStatus);

  // sorting state
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  // sorting logic
  const sortedTasks = [...tasks].sort((a: any, b: any) => {
    if (!sortConfig.key) return 0;

    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    // priority custom order
    if (sortConfig.key === "priority") {
      const order: any = {
        critical: 4,
        high: 3,
        medium: 2,
        low: 1,
      };

      return sortConfig.direction === "asc"
        ? order[valA] - order[valB]
        : order[valB] - order[valA];
    }

    // date sorting
    if (sortConfig.key === "dueDate") {
      return sortConfig.direction === "asc"
        ? new Date(valA).getTime() - new Date(valB).getTime()
        : new Date(valB).getTime() - new Date(valA).getTime();
    }

    // string sorting
    return sortConfig.direction === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  // handle sort click
  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="mt-5 overflow-auto">
      <table className="w-full border">
        {/* TABLE HEADER */}
        <thead className="bg-gray-200">
          <tr>
            <th
              className="p-2 border cursor-pointer"
              onClick={() => handleSort("title")}
            >
              Title {sortConfig.key === "title" ? (sortConfig.direction === "asc" ? "⬆️" : "⬇️") : ""}
            </th>

            <th
              className="p-2 border cursor-pointer"
              onClick={() => handleSort("priority")}
            >
              Priority {sortConfig.key === "priority" ? (sortConfig.direction === "asc" ? "⬆️" : "⬇️") : ""}
            </th>

            <th
              className="p-2 border cursor-pointer"
              onClick={() => handleSort("dueDate")}
            >
              Due Date {sortConfig.key === "dueDate" ? (sortConfig.direction === "asc" ? "⬆️" : "⬇️") : ""}
            </th>

            <th className="p-2 border">Status</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {sortedTasks.map((task: any) => (
            <tr key={task.id} className="text-center">
              <td className="p-2 border">{task.title}</td>

              <td className="p-2 border capitalize">
                {task.priority}
              </td>

              <td className="p-2 border">
                {new Date(task.dueDate).toLocaleDateString()}
              </td>

              <td className="p-2 border">
                <select
                  value={task.status}
                  onChange={(e) =>
                    updateTaskStatus(task.id, e.target.value)
                  }
                  className="border p-1"
                >
                  <option value="todo">Todo</option>
                  <option value="inprogress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;