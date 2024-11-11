"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import useAppStore from "@/store/useAppStore";
import { Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createPostInFirebase } from "@/utils/firebaseUtils";
import { User, Post } from "@/types/types";

const AddNewPost: React.FC = () => {
  const { userData, users, setPosts } = useAppStore();
  const [inputValue, setInputValue] = useState<string>("");
  const [showMentions, setShowMentions] = useState<boolean>(false);
  const [mentionedUser, setMentionedUser] = useState<string[]>([]);
  const [filteredFollowing, setFilteredFollowing] = useState<User[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const usersWithFollowerIds =
    userData?.name &&
    users.filter((user) => userData?.following.includes(user.id));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
    const lastWord = value.split(" ").pop();
    if (lastWord?.startsWith("@")) {
      setShowMentions(true);
      const search = lastWord.slice(1).toLowerCase();
      setFilteredFollowing(
        usersWithFollowerIds && usersWithFollowerIds.length > 0
          ? usersWithFollowerIds?.filter((user: User) =>
              user.name.toLowerCase().includes(search)
            )
          : []
      );
    } else {
      setShowMentions(false);
    }
  };

  const handleMentionClick = (user: User): void => {
    const words = inputValue.split(" ");
    words[words.length - 1] = `@${user.name} `;
    setInputValue(words.join(" "));
    setShowMentions(false);
    setMentionedUser([...mentionedUser, user.id]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const removeSelectedImage = (): void => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!inputValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content or select an image to post.",
        variant: "destructive",
      });
      return;
    }

    setIsPosting(true);
    try {
      const post: Post[] = await createPostInFirebase(
        userData!,
        inputValue,
        mentionedUser
      );
      toast({
        title: "Success",
        variant: "success",
        description: "Your post has been created successfully!",
      });
      setInputValue("");
      setPosts(post);
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "There was an error creating your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="What's on your mind?"
              className="bg-gray-100 dark:bg-gray-700 border-0 focus-visible:ring-2 focus-visible:ring-purple-500"
              disabled={isPosting}
            />
            {showMentions && (
              <Popover open={showMentions} onOpenChange={setShowMentions}>
                <PopoverTrigger asChild>
                  <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
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
                <PopoverContent className="w-full p-0" />
              </Popover>
            )}
          </div>
          {selectedImage && (
            <div className="mb-4 relative">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="w-full h-40 object-cover rounded-md"
              />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={removeSelectedImage}
                disabled={isPosting}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div className="flex items-center gap-4">
            {/* <Button
              type="button"
              variant="outline"
              size="icon"
              className="text-purple-500 border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900"
              onClick={() => fileInputRef.current?.click()}
              disabled={isPosting}
            >
              <Paperclip className="h-4 w-4" />
            </Button> */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
              disabled={isPosting}
            />
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              disabled={isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNewPost;
