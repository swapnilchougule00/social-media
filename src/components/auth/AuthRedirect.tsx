"use client";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AuthRedirect() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      setTimeout(() => {
        router.push("/feed");
      }, 400);
    }
  }, [isSignedIn, router]);

  return null;
}
