"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (session) {
      const interval = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
      const timeout = setTimeout(() => {
        router.push("/");
      }, 5000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [session, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-10 flex flex-col items-center gap-6 max-w-md w-full justify-center mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">Sign Up for TaskFlow</h1>
        {status === "loading" ? (
          <div className="text-gray-500 dark:text-gray-300">Loading...</div>
        ) : !session ? (
          <>
            <Button onClick={() => signIn("github", { prompt: "select_account" })}>Sign up with GitHub</Button>
            <Button onClick={() => signIn("google", { prompt: "select_account" })}>Sign up with Google</Button>
            <div className="text-sm mt-4 text-gray-700 dark:text-gray-300">
              Already have an account? <Link href="/login" className="underline text-blue-600">Log in</Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-xl text-gray-900 dark:text-white mb-4">
              Hello, <span className="font-semibold">{session.user?.name || session.user?.email || "User"}</span>!
            </div>
            <div className="text-gray-700 dark:text-gray-300 mb-2 text-center">
              Redirecting to homepage in {countdown} second{countdown !== 1 ? "s" : ""}...
            </div>
            <Button onClick={() => signOut()} variant="outline" className="mt-4">Logout</Button>
          </>
        )}
      </div>
    </div>
  );
} 