import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import {LogIn} from 'lucide-react'


export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId
  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-black to-gray-800">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="text-white mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mt-2">
            {isAuth && <Button className="bg-white text-black font-semibold hover:bg-gray-100 hover:text-black ">
              Go to Chats
            </Button>}
          </div>
          <p className="max-w-xl mt-2 text-lg text-slate-50">
            Join a global community of students, researchers, and professionals using AI to find answers instantly and explore research with ease.
          </p>

          <div className="w-full mt-4">
            {isAuth ? (<h1>File Upload</h1>) : (
              <Link href="/sign-in">
                <Button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition">
                  Get Started
                  <LogIn className="w-4 h-4 ml-2"/>
                </Button>

              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
