"use client";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useAppStore from "@/store/useAppStore";

export default function AuthRedirect() {
  const { isSignedIn } = useAuth();
  const { userData } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      setTimeout(() => {
        router.push("/feed");
      }, 400);
    }
  }, [isSignedIn, router, userData]);

  return null;
}
