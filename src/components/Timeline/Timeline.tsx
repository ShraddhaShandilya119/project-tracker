import { useTaskStore } from "../../store/useTaskStore";

const Timeline = () => {
  const tasks = useTaskStore((s: any) => s.tasks);

  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold mb-4">Timeline View 📅</h2>

      <div className="space-y-3">
        {tasks.slice(0, 20).map((task: any) => {
          const days = Math.floor(
            (new Date(task.dueDate).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          );

          return (
            <div key={task.id} className="flex items-center gap-2">
              <span className="w-32">{task.title}</span>

              <div className="flex-1 bg-gray-200 h-6 relative rounded">
                <div
                  className="bg-blue-500 h-6 rounded"
                  style={{
                    width: `${Math.max(10, days * 5)}px`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;