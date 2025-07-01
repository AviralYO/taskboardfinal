"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Copy, Check } from "lucide-react"

const colorPalette = {
  primary: {
    name: "Primary Blue",
    colors: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
  },
  secondary: {
    name: "Purple",
    colors: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7c3aed",
      800: "#6b21a8",
      900: "#581c87",
    },
  },
  success: {
    name: "Green",
    colors: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },
  },
  warning: {
    name: "Yellow",
    colors: {
      50: "#fefce8",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
    },
  },
  danger: {
    name: "Red",
    colors: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    },
  },
}

export function ColorPalette() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color)
      setCopiedColor(color)
      setTimeout(() => setCopiedColor(null), 2000)
    } catch (err) {
      console.error("Failed to copy color:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Palette className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">TaskFlow Color Palette</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Complete color system used throughout the TaskFlow application
          </p>
        </div>

        <div className="grid gap-8">
          {Object.entries(colorPalette).map(([key, palette]) => (
            <Card key={key} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {palette.name}
                  <Badge variant="outline">{key}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
                  {Object.entries(palette.colors).map(([shade, color]) => (
                    <div key={shade} className="group">
                      <div
                        className="w-full h-20 rounded-lg shadow-sm border cursor-pointer transition-transform hover:scale-105"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(color)}
                      />
                      <div className="mt-2 text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{shade}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-gray-500 dark:text-gray-400 h-auto p-1 hover:bg-transparent"
                          onClick={() => copyToClipboard(color)}
                        >
                          {copiedColor === color ? (
                            <Check className="w-3 h-3 mr-1 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3 mr-1" />
                          )}
                          {color}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Usage Examples */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Usage Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Priority Badges</h3>
              <div className="flex space-x-3">
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">High Priority</Badge>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Medium Priority
                </Badge>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Low Priority
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Status Indicators</h3>
              <div className="flex space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">To Do</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">In Progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Done</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Project Colors</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "#6366f1",
                  "#8b5cf6",
                  "#ec4899",
                  "#ef4444",
                  "#f97316",
                  "#eab308",
                  "#22c55e",
                  "#10b981",
                  "#06b6d4",
                  "#3b82f6",
                ].map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color)}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
