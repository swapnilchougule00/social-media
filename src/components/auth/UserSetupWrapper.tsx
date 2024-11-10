import { currentUser } from "@clerk/nextjs/server";
import UserSetup from "./UserSetup";

const UserSetupWrapper = async () => {
  const user = await currentUser();
  const userData = user
    ? {
        name: user.fullName,
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        followers: [],
        following: [],
        profileImg: user.imageUrl,
        posts: [],
        mentioned: [],
      }
    : null;
  return <UserSetup user={userData} />;
};

export default UserSetupWrapper;
