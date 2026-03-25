import { useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";

const columns = ["todo", "inprogress", "review", "done"];

const Kanban = ({ tasks }: any) => {
  
  const updateTaskStatus = useTaskStore((s: any) => s.updateTaskStatus);

  
  const [draggingId, setDraggingId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-4 gap-4 mt-5">
      {columns.map((col) => (
       <div
  key={col}
  className="bg-gray-100 p-3 rounded min-h-[300px] transition"
  onDragOver={(e) => e.preventDefault()}

  onDragEnter={(e) =>
    e.currentTarget.classList.add("bg-blue-100")
  }

  onDragLeave={(e) =>
    e.currentTarget.classList.remove("bg-blue-100")
  }

  onDrop={(e) => {
    e.currentTarget.classList.remove("bg-blue-100");

    const id = e.dataTransfer.getData("taskId");
    updateTaskStatus(Number(id), col);
  }}
>
          {/*  Column Heading + Count */}
          <h2 className="font-bold capitalize mb-2 flex justify-between">
            {col}
            <span className="text-sm bg-gray-300 px-2 rounded">
              {tasks.filter((t: any) => t.status === col).length}
            </span>
          </h2>

          {tasks
            .filter((t: any) => t.status === col)
            .map((task: any) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("taskId", String(task.id));
                  setDraggingId(task.id); // 🔥 added
                }}
                onDragEnd={() => setDraggingId(null)} // 🔥 added
                className={`bg-white p-3 mb-2 shadow rounded cursor-pointer transition
                  ${draggingId === task.id ? "opacity-50 scale-105" : ""}
                `}
              >
                <p className="font-medium">{task.title}</p>

                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-gray-500">{task.priority}</span>
                  <span className="text-gray-400">S</span>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Kanban;