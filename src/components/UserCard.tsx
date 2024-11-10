"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAppStore from "@/store/useAppStore";
import { User } from "@/types/types";
const UserCard = () => {
  const { userData }: User = useAppStore();
  if (!userData.name) return null;
  return (
    <aside className="hidden md:block md:col-span-2">
      <Card className="sticky top-24 bg-white ">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Your Profile
          </h2>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage className="object-cover" src={userData.profileImg} alt={userData.name} />
              <AvatarFallback className="bg-purple-500 text-white text-xl">
                {userData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {userData.name}
              </p>
              <p className="text-sm text-gray-500 text-wrap dark:text-gray-400">
                {userData.email}
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-between text-sm">
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {userData.followers.length}
              </p>
              <p className="text-gray-500 dark:text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {userData.following.length}
              </p>
              <p className="text-gray-500 dark:text-gray-400">Following</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {userData.posts.length}
              </p>
              <p className="text-gray-500 dark:text-gray-400">Posts</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default UserCard;
