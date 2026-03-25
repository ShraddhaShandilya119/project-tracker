export const generateTasks = (count = 100) => {
  const statuses = ["todo", "inprogress", "review", "done"];
  const priorities = ["low", "medium", "high", "critical"];

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    title: `Task ${i}`,
    status: statuses[Math.floor(Math.random() * 4)],
    priority: priorities[Math.floor(Math.random() * 4)],
    assignee: "S",
    dueDate: new Date(),
  }));
};