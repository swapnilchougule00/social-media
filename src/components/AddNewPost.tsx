"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import useAppStore from "@/store/useAppStore";

const AddNewPost = () => {
  const { userData, users } = useAppStore();
  const [inputValue, setInputValue] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [filteredFollowing, setFilteredFollowing] = useState([]);
  const usersWithFollowerIds =
    userData.name &&
    users.filter((user) => userData?.following.includes(user.id));

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const lastWord = value.split(" ").pop();
    if (lastWord.startsWith("@")) {
      setShowMentions(true);
      const search = lastWord.slice(1).toLowerCase();
      setFilteredFollowing(
        usersWithFollowerIds?.filter((user) =>
          user.name.toLowerCase().includes(search)
        )
      );
    } else {
      setShowMentions(false);
    }
  };

  const handleMentionClick = (user) => {
    const words = inputValue.split(" ");
    words[words.length - 1] = `@${user.name} `;
    setInputValue(words.join(" "));
    setShowMentions(false);
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md">
      <CardContent className="pt-6">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="What's on your mind?"
              className="mb-4 bg-gray-100 dark:bg-gray-700 border-0 focus-visible:ring-2 focus-visible:ring-purple-500"
            />
            {showMentions && (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg">
                    {filteredFollowing.length > 0 ? (
                      <ul>
                        {filteredFollowing.map((user) => (
                          <li
                            key={user.id}
                            onClick={() => handleMentionClick(user)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {user.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="px-4 py-2 text-gray-500 dark:text-gray-400">
                        No users found
                      </p>
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent />
              </Popover>
            )}
          </div>
          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
            Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNewPost;
