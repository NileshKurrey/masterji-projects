// Player Compoentnt
import { Play, SkipBack, SkipForward, Volume, Repeat, Shuffle } from "lucide-react";
import { Slider } from "./ui/slider";
export default function Player() {  
    return (
        <div className="h-24 w-full bg-white border-t border-gray-300 flex items-center justify-between px-6 rounded-2xl">
            {/* Left section: Current track info */}
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎵</span>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Track Title</h3>
                    <p className="text-sm text-gray-600">Artist Name</p>
                </div>
            </div>
            {/* Center section: Playback controls */}
            <div className="flex items-center space-x-6">
                <Shuffle className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                <SkipBack className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                    <Play className="w-6 h-6" />
                </div>
                <SkipForward className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                <Repeat className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
            </div>
            {/* Right section: Volume control */}
            <div className="flex items-center space-x-4 w-48">
                <Volume className="w-5 h-5 text-gray-600" />
                <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
            </div>
        </div>
    )
}
