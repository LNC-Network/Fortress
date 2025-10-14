import Image from "next/image";
import { SignupForm } from "@/components/signup-form";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Navigation */}
      <nav className="w-full h-28 bg-blue-800 text-white flex justify-between items-center px-8 relative z-20">
        <h1 className="text-6xl font-light tracking-wide">Fortress</h1>
      </nav>

      {/* Main Content */}
      <div className="relative flex justify-center items-center flex-1">
        {/* Background Image */}
        <Image
          alt="Medieval fortress painting background"
          src="/bg.jpg"
          fill
          className="object-cover"
          priority
        />

        {/* Dark Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Login Form */}
        <div className="w-full max-w-sm z-10 px-4">
          <SignupForm className="shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-sm" />
        </div>
      </div>
    </div>
  );
}
