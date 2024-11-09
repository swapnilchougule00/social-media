import { SignedOut, SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <SignedOut>
        <SignIn
          routing="hash"
          signUpForceRedirectUrl={"http://localhost:3000/feed"}
        />
      </SignedOut>
    </div>
  );
}
