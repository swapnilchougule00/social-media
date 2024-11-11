"use client";
import useAppStore from "@/store/useAppStore";
import { createUserInFirebase } from "@/utils/firebaseUtils";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { User } from "@/types/types";
import { useAuth } from "@clerk/nextjs";

interface UserSetupProps {
  user: User | null;
}

export default function UserSetup({ user }: UserSetupProps) {
  console.log(user);
  const { setUserData } = useAppStore();
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const initializeUser = async () => {
      if (user) {
        try {
          const userData = await createUserInFirebase(user);
          setUserData(userData as User);
          setLoading(false);
        } catch (error) {
          console.error("Error setting up user:", error);
        }
      }
    };

    initializeUser();
  }, [user, isSignedIn, setUserData]);

  if (loading) {
    return <Loader />;
  }

  return null;
}
