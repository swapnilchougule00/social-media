"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useAppStore from "@/store/useAppStore";
import SuggestionUserCard from "./SuggestionUserCard";
const SuggestionsBox = () => {
  const { fetchUsers, users, setUsers, userData } = useAppStore();

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await fetchUsers();
      setUsers(allUsers);
    };
    getUsers();
  }, []);
  const followingUsers = userData ? [...userData.following, userData?.id] : [];
  const usersNotFollowed = useMemo(() => {
    if (!userData?.name) return [];
    return users.filter((user) => !followingUsers.includes(user.id));
  }, [users, userData]);

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
            {userData?.name &&
              usersNotFollowed.map((user) => (
                <SuggestionUserCard key={user.id} user={user} />
              ))}
            {usersNotFollowed.length < 1 && (
              <h3 className="text-center font-bold">No Users</h3>
            )}
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
};

export default SuggestionsBox;
