"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { followUser } from "@/utils/firebaseUtils";
import useAppStore from "@/store/useAppStore";
import { User } from "@/types/types";

const SuggestionUserCard = ({ user }) => {
  const { user: currentUser } = useUser();
  const { setUserData } = useAppStore();

  const handleFollowUser = async (currentUserId, targetUserId) => {
    const res = await followUser(currentUserId, targetUserId);
    setUserData(res);
  };

  return (
    <li key={user.id} className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage
            className="w-10 h-10 object-cover rounded-full"
            src={user.profileImg}
            alt={user.name}
          />
          <AvatarFallback className="bg-purple-500 p-2 rounded-full px-3 text-white">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{user.email.slice(0, 10)}...
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleFollowUser(currentUser.id, user.id)}
        className="text-purple-500 border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900"
      >
        Follow
      </Button>
    </li>
  );
};

export default SuggestionUserCard;
