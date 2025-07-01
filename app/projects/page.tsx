"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, ArrowLeft, FolderOpen, Trash2, Edit, Palette } from "lucide-react"
import Link from "next/link"
import { ProjectDialog } from "@/components/project-dialog"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { ThemeToggle } from "@/components/theme-toggle"

interface Project {
  id: string
  name: string
  description: string
  color: string
  createdAt: string
}

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

export default function ProjectsPage() {
  const [projects, setProjects] = useLocalStorage<Project[]>("projects", [])
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])
  const [searchTerm, setSearchTerm] = useState("")
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getProjectStats = (projectId: string) => {
    const projectTasks = tasks.filter((task) => task.projectId === projectId)
    const completedTasks = projectTasks.filter((task) => task.status === "Done").length
    const totalTasks = projectTasks.length

    return {
      total: totalTasks,
      completed: completedTasks,
      inProgress: projectTasks.filter((task) => task.status === "In Progress").length,
      todo: projectTasks.filter((task) => task.status === "To Do").length,
      progress: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    }
  }

  const handleCreateProject = (projectData: Omit<Project, "id" | "createdAt">) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setProjects((prev) => [...prev, newProject])
  }

  const handleUpdateProject = (projectData: Omit<Project, "id" | "createdAt">) => {
    if (!editingProject) return

    setProjects((prev) =>
      prev.map((project) => (project.id === editingProject.id ? { ...project, ...projectData } : project)),
    )
    setEditingProject(null)
  }

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId))
    // Also delete all tasks associated with this project
    setTasks((prev) => prev.filter((task) => task.projectId !== projectId))
  }

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/colors">
                <Button variant="ghost" size="sm">
                  <Palette className="w-4 h-4 mr-2" />
                  Colors
                </Button>
              </Link>
              <Button onClick={() => setIsProjectDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {projects.length === 0 ? "No projects yet" : "No projects found"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {projects.length === 0
                ? "Create your first project to get started organizing your tasks."
                : "Try adjusting your search terms."}
            </p>
            {projects.length === 0 && (
              <Button onClick={() => setIsProjectDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const stats = getProjectStats(project.id)
              return (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: project.color }} />
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingProject(project)
                            setIsProjectDialogOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{project.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                        <span>Progress</span>
                        <span>{stats.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${stats.progress}%`,
                            backgroundColor: project.color,
                          }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white">{stats.total}</div>
                        <div className="text-gray-500 dark:text-gray-400">Total</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{stats.todo}</div>
                        <div className="text-gray-500 dark:text-gray-400">To Do</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-yellow-600">{stats.inProgress}</div>
                        <div className="text-gray-500 dark:text-gray-400">In Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{stats.completed}</div>
                        <div className="text-gray-500 dark:text-gray-400">Done</div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Created {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      <ProjectDialog
        open={isProjectDialogOpen}
        onOpenChange={setIsProjectDialogOpen}
        onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
        project={editingProject}
      />
    </div>
  )
}
