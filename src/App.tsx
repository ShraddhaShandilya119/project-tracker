import { useEffect, useState } from "react";
import { generateTasks } from "./data/generateTasks";
import { useTaskStore } from "./store/useTaskStore";
import Kanban from "./components/Kanban/Kanban";
import List from "./components/List/List";
import Timeline from "./components/Timeline/Timeline";

function App() {
  const tasks = useTaskStore((s: any) => s.tasks);
  const setTasks = useTaskStore((s: any) => s.setTasks);

  // 🔄 view toggle
  const [view, setView] = useState("kanban");

  //  filters
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
  });

  
  //  initial data
  //data load
  useEffect(() => {
    const data = generateTasks(500); //  500 tasks (important for virtual scroll)
    setTasks(data);
  }, []);

  //url read
  
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  setFilters({
    status: params.get("status") || "",
    priority: params.get("priority") || "",
  });
}, []);

  //  filter logic
  const filteredTasks = tasks.filter((task: any) => {
    return (
      (filters.status ? task.status === filters.status : true) &&
      (filters.priority ? task.priority === filters.priority : true)
    );
  });

  useEffect(() => {
  const params = new URLSearchParams();

  if (filters.status) params.set("status", filters.status);
  if (filters.priority) params.set("priority", filters.priority);

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}, [filters]);


  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Project Tracker 🚀</h1>



      {/* TOGGLE */}
    <div className="flex gap-3 mt-4">
  <button
    onClick={() => setView("kanban")}
    className={`px-4 py-2 rounded text-white ${
      view === "kanban" ? "bg-blue-600" : "bg-gray-400"
    }`}
  >
    Kanban
  </button>

  <button
    onClick={() => setView("list")}
    className={`px-4 py-2 rounded text-white ${
      view === "list" ? "bg-green-600" : "bg-gray-400"
    }`}
  >
    List
  </button>

  <button
    onClick={() => setView("timeline")}
    className={`px-4 py-2 rounded text-white ${
      view === "timeline" ? "bg-purple-600" : "bg-gray-400"
    }`}
  >
    Timeline
  </button>
</div>
       
      {/* FILTERS */}
      <div className="flex gap-3 mt-4">
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
          className="border p-2"
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) =>
            setFilters({ ...filters, priority: e.target.value })
          }
          className="border p-2"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {/* VIEW RENDER */}
      <div className="mt-5">
        {view === "kanban" && <Kanban tasks={filteredTasks} />}
        {view === "list" && <List tasks={filteredTasks} />}
        {view === "timeline" && <Timeline />}
      </div>
    </div>
  );
}

export default App;