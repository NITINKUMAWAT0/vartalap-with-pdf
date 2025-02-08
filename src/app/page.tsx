import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";

export default async function Home() {
  const { userId } = await auth(); // ✅ Fetch user auth status inside the function
  const isAuth = Boolean(userId);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-black to-gray-800 flex justify-center items-center">
      <div className="text-center">
        {/* Title & User Button */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-white text-5xl font-semibold">Chat with any PDF</h1>
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Navigation Button */}
        {isAuth && (
          <Button className="bg-white text-black font-semibold hover:bg-gray-100 transition">
            Go to Chats
          </Button>
        )}

        {/* Description */}
        <p className="max-w-xl mt-3 text-lg text-slate-50">
          Join a global community of students, researchers, and professionals using AI to find answers instantly and explore research with ease.
        </p>

        {/* Authentication & Upload Section */}
        <div className="w-full mt-5">
          {isAuth ? (
            <FileUpload /> // ✅ Show file upload if authenticated
          ) : (
            <Link href="/sign-in">
              <Button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition flex items-center">
                Get Started
                <LogIn className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
