"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, FolderOpen, Users, ArrowRight, Sparkles, Palette } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import TextPressure from "./TextPressure/TextPressure"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import * as THREE from "three"
import NET from "vanta/dist/vanta.net.min"
import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const vantaRef = useRef<any>(null);
  const [name, setName] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  async function handleSetName(e: React.FormEvent) {
    e.preventDefault();
    setNameLoading(true);
    // await updateName(name); // This line is removed as per the edit hint
    setNameLoading(false);
  }
  const [refreshing, setRefreshing] = useState(false);
  async function handleRefreshUserInfo() {
    setRefreshing(true);
    try {
      // Just reload the page to refetch user info from context
      window.location.reload();
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (heroRef.current && !vantaRef.current) {
      vantaRef.current = NET({
        el: heroRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: 0x000000,
        color: 0xff3f81,
        points: 12.0,
        maxDistance: 25.0,
        spacing: 18.0,
      });
    }
    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, []);

  // Calculate fade/scale based on scroll position
  const fadeOut = Math.max(0, 1 - scrollY / 300); // Fades out over 300px
  const scaleOut = 1 - Math.min(scrollY / 1200, 0.1); // Scales down a bit
  const fadeInContent = Math.min(1, scrollY / 200); // Fades in content after 200px

  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="flex flex-col items-center justify-center h-screen w-full text-center relative overflow-hidden px-2 sm:px-4"
        style={{
          opacity: fadeOut,
          transform: `scale(${scaleOut})`,
          transition: "opacity 0.3s, transform 0.3s",
          pointerEvents: fadeOut < 0.05 ? "none" : "auto",
        }}
      >
        <div className="absolute inset-0 z-0" />
        <div className="flex items-center justify-center w-full h-full">
          <h1 className="text-center text-6xl md:text-8xl font-bold leading-tight w-full max-w-4xl mx-auto z-10 tracking-tight">
            {mounted && (
              <TextPressure
                text="TaskFlow"
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#fff"
                strokeColor="#7c3aed"
                minFontSize={72}
                className="mx-auto"
                renderChar={(char, i, props) => {
                  // Apply gradient to 'Flow' (indices 4,5,6,7)
                  if (i >= 4) {
                    return (
                      <span
                        {...props}
                        style={{
                          ...props.style,
                          background: 'linear-gradient(90deg, #6366f1, #a21caf)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          color: 'transparent',
                        }}
                      >
                        {char}
                      </span>
                    );
                  }
                  return <span {...props}>{char}</span>;
                }}
              />
            )}
          </h1>
        </div>
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-80 animate-bounce z-10">
          <span className="text-sm text-gray-400 mb-1">Scroll Down</span>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400" viewBox="0 0 24 24"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </div>
      </section>

      {/* Main Content */}
      <div
        className="container mx-auto px-2 sm:px-4 py-10 sm:py-20 w-full max-w-full"
        style={{
          opacity: fadeInContent,
          transition: "opacity 0.5s",
          pointerEvents: fadeInContent < 0.05 ? "none" : "auto",
        }}
      >
        <div className="text-center max-w-4xl mx-auto w-full">
          {/* Header */}
          <header className="container mx-auto px-2 sm:px-4 py-6 flex flex-col sm:flex-row justify-between items-center w-full">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">TaskFlow</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-center sm:justify-end">
              <Link href="/colors">
                <Button variant="ghost" size="sm">
                  <Palette className="w-4 h-4 mr-2" />
                  Colors
                </Button>
              </Link>
              {status === "loading" ? null : !session ? (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="font-semibold">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="default" size="sm" className="font-semibold">Sign Up</Button>
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white mr-2">
                    Hello, {session.user?.name || session.user?.email || "User"}
                  </span>
                  <Button variant="outline" size="sm" className="font-semibold ml-2" onClick={() => signOut()}>Logout</Button>
                </>
              )}
              <ThemeToggle />
            </div>
          </header>

          {/* Hero Section (hidden after scroll) */}
          {/* <h1>...</h1> is now in the sticky hero above */}

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
            Streamline your workflow, organize your projects, and boost productivity with our intuitive task management
            platform
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 w-full">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                View Projects
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 sm:mt-20 w-full">
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Task Management</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Create, organize, and track tasks with priorities, due dates, and status updates
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FolderOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Organization</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Group tasks into projects with custom colors and descriptions for better organization
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Team Collaboration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Assign tasks to team members and track progress across your entire organization
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
