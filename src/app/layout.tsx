import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import AuthRedirect from "@/components/auth/AuthRedirect";
import Header from "@/components/Header";
import UserSetupWrapper from "@/components/auth/UserSetupWrapper";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedIn>
            <AuthRedirect />
            <UserSetupWrapper />
            <Header />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
