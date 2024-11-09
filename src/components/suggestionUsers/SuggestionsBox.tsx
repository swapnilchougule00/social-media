"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useAppStore from "@/store/useAppStore";
import SuggestionUserCard from "./SuggestionUserCard";
const SuggestionsBox = () => {
  const { fetchUsers, users, setUsers } = useAppStore();

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await fetchUsers();
      setUsers(allUsers);
    };
    getUsers();
  }, []);

  

  return (
    <aside className="hidden md:block md:col-span-2">
      <Card className="sticky top-24 bg-white dark:bg-gray-800 shadow-md">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Suggested Users
          </h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {users.map((user) => (
              <SuggestionUserCard key={user.id} user={user} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
};

export default SuggestionsBox;
