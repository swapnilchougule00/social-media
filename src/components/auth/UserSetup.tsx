"use client";
import useAppStore from "@/store/useAppStore";
import { createUserInFirebase } from "@/utils/firebaseUtils";
import { useEffect, useState } from "react";
import Loader from "../Loader";

export default function UserSetup({ user }) {
  const { setUserData, userData } = useAppStore();
  const [loading, setLoading] = useState(true);
  console.log("Current userData:", userData);

  useEffect(() => {
    const initializeUser = async () => {
      if (user) {
        const userData = await createUserInFirebase(user);
        console.log("Fetched userData:", userData);
        setUserData(userData);
        setLoading(false);
      }
    };

    initializeUser();
  }, [user, setUserData]);

  if (loading) {
    return <Loader />;
  }
  return null;
}
