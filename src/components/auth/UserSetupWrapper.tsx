import { currentUser } from "@clerk/nextjs/server";
import UserSetup from "./UserSetup";
import { User } from "@/types/types";

const UserSetupWrapper = async () => {
  const user = await currentUser();
  const userData: User = user! && {
    name: user.fullName || "",
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    followers: [],
    following: [],
    profileImg: user.imageUrl,
    posts: [],
    mentioned: [],
    timeStamp: "",
  };

  return <UserSetup user={userData} />;
};

export default UserSetupWrapper;
