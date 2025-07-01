"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Calendar, User, ArrowLeft, Palette } from "lucide-react"
import Link from "next/link"
import { TaskDialog } from "@/components/task-dialog"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { ThemeToggle } from "@/components/theme-toggle"

interface Task {
  id: string
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  status: "To Do" | "In Progress" | "Done"
  assignee: string
  dueDate?: string
  projectId: string
  createdAt: string
}

interface Project {
  id: string
  name: string
  description: string
  color: string
}

const priorityColors = {
  High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
}

const statusColumns = ["To Do", "In Progress", "Done"] as const

export default function DashboardPage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])
  const [projects, setProjects] = useLocalStorage<Project[]>("projects", [])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterProject, setFilterProject] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [filterAssignee, setFilterAssignee] = useState<string>("all")
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProject = filterProject === "all" || task.projectId === filterProject
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority
    const matchesAssignee = filterAssignee === "all" || task.assignee === filterAssignee

    return matchesSearch && matchesProject && matchesPriority && matchesAssignee
  })

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  const getProjectName = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId)
    return project?.name || "Unknown Project"
  }

  const getProjectColor = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId)
    return project?.color || "#6366f1"
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result

    if (source.droppableId !== destination.droppableId) {
      const newStatus = destination.droppableId as Task["status"]
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === draggableId ? { ...task, status: newStatus } : task)),
      )
    }
  }

  const handleCreateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, newTask])
  }

  const handleUpdateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    if (!editingTask) return

    setTasks((prev) => prev.map((task) => (task.id === editingTask.id ? { ...task, ...taskData } : task)))
    setEditingTask(null)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const uniqueAssignees = [...new Set(tasks.map((task) => task.assignee))].filter(Boolean)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/colors">
                <Button variant="ghost" size="sm">
                  <Palette className="w-4 h-4 mr-2" />
                  Colors
                </Button>
              </Link>
              <Button onClick={() => setIsTaskDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterProject} onValueChange={setFilterProject}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterAssignee} onValueChange={setFilterAssignee}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              {uniqueAssignees.map((assignee) => (
                <SelectItem key={assignee} value={assignee}>
                  {assignee}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid md:grid-cols-3 gap-6">
            {statusColumns.map((status) => (
              <div key={status} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center justify-between">
                    {status}
                    <Badge variant="secondary">{getTasksByStatus(status).length}</Badge>
                  </h3>
                </div>
                <Droppable droppableId={status}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`p-4 min-h-[500px] ${snapshot.isDraggingOver ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                    >
                      {getTasksByStatus(status).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-4 cursor-pointer hover:shadow-md transition-shadow ${
                                snapshot.isDragging ? "shadow-lg rotate-2" : ""
                              }`}
                              onClick={() => {
                                setEditingTask(task)
                                setIsTaskDialogOpen(true)
                              }}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                                    {task.title}
                                  </h4>
                                  <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                                </div>
                                {task.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                                    {task.description}
                                  </p>
                                )}
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                  <div className="flex items-center space-x-2">
                                    <div
                                      className="w-3 h-3 rounded-full"
                                      style={{ backgroundColor: getProjectColor(task.projectId) }}
                                    />
                                    <span>{getProjectName(task.projectId)}</span>
                                  </div>
                                  {task.assignee && (
                                    <div className="flex items-center">
                                      <User className="w-3 h-3 mr-1" />
                                      {task.assignee}
                                    </div>
                                  )}
                                </div>
                                {task.dueDate && (
                                  <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(task.dueDate).toLocaleDateString()}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      <TaskDialog
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        onDelete={editingTask ? () => handleDeleteTask(editingTask.id) : undefined}
        task={editingTask}
        projects={projects}
      />
    </div>
  )
}
