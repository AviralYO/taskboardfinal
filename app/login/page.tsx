"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [nameLoading, setNameLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // await signIn(email, password); // This line was removed as per the edit hint
  }
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    // await signUp(email, password); // This line was removed as per the edit hint
  }
  async function handleSetName(e: React.FormEvent) {
    e.preventDefault();
    setNameLoading(true);
    // await updateName(name); // This line was removed as per the edit hint
    setNameLoading(false);
  }

  // Redirect to home if logged in
  useEffect(() => {
    // if (user && !loading) { // This line was removed as per the edit hint
    //   router.push("/");
    // }
  }, [/* user, loading, router */]); // This line was removed as per the edit hint

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Logo at top right */}
      <div className="w-full flex justify-end p-6">
        <Image src="/placeholder-logo.svg" alt="TaskFlow Logo" width={48} height={48} />
      </div>
      <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-10 flex flex-col items-center gap-6 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">Log In to TaskFlow</h1>
        {status === "loading" ? (
          <div className="text-gray-500 dark:text-gray-300">Loading...</div>
        ) : !session ? (
          <>
            <Button variant="outline" onClick={() => signIn("github", { prompt: "select_account" })}>Log in with GitHub</Button>
            <Button variant="outline" onClick={() => signIn("google", { prompt: "select_account" })}>Log in with Google</Button>
            <div className="text-sm mt-4 text-gray-700 dark:text-gray-300">
              New here? <Link href="/signup" className="underline text-blue-600">Sign up</Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-xl text-gray-900 dark:text-white mb-4">
              Hello, <span className="font-semibold">{session.user?.name || session.user?.email || "User"}</span>!
            </div>
            <Button onClick={() => signOut()} variant="outline" className="mt-4">Logout</Button>
          </>
        )}
      </div>
    </div>
  );
} 