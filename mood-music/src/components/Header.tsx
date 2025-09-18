import { Heart, User } from "lucide-react";


export default function Header() {
  return (
    // navbar component with only grey line in bottom
    <nav className="h-16 text-gray-800 flex items-center justify-between px-6 border-b border-gray-300">
      {/* logo */}
      <div className="text-lg font-bold">Logo</div>
      {/* navigation links */}
      <div className="flex items-center space-x-4">
        <div className="flex space-x-4">
          <a className="hover:text-gray-600 font-semibold cursor-pointer" href="/">Home</a>
          <a className="hover:text-gray-600 font-semibold cursor-pointer" href="/about">About</a>
          <a className="hover:text-gray-600 font-semibold cursor-pointer" href="/contact">Contact</a>
      </div>
      {/* profile icon */}
      <div className="flex items-center space-x-4">
        <a href="/likes">

        <div className="w-10 h-10 rounded-full cursor-pointer bg-gray-100 flex items-center justify-center">
          <Heart className="font-light w-6 h-6 text-black-500" />
        </div>
        </a>
        <a href="/profile">
        <div className="w-10 h-10 rounded-full cursor-pointer bg-gray-100 flex items-center justify-center">
          <User className="font-light w-6 h-6 text-black-500" />
        </div>
        </a>
      </div>
      </div>

    </nav>
  )
}
