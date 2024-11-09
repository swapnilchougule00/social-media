"use client";
import useAppStore from "@/store/useAppStore";
import { createUserInFirebase } from "@/utils/firebaseUtils";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function UserSetup() {
  const { user } = useUser();
  const { setUserData, userData } = useAppStore();
  console.log("Current userData:", userData);

  useEffect(() => {
    const initializeUser = async () => {
      if (user) {
        const userData = await createUserInFirebase(user);
        console.log("Fetched userData:", userData);
        setUserData(userData);
      }
    };

    initializeUser();
  }, [user, setUserData]);

  return null;
}
