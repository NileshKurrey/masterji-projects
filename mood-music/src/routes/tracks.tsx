import Player from '@/components/player'
import { Button } from '@/components/ui/button'
import { useMoodStore } from '@/store/mood-store'
import { createFileRoute } from '@tanstack/react-router'
import { Heart } from 'lucide-react'

export const Route = createFileRoute('/tracks')({
  component: RouteComponent,
})

function RouteComponent() {
  const {mood} = useMoodStore()
  return (
    <div className="p-16 flex flex-col items-start justify-start min-h-screen bg-gray-50">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Mood: {mood}</h1>
        <p className="pt-2 text-gray-600">
          Playlist for you based on your mood
        </p>
      </div>
      <div className="flex items-start justify-between w-full">
        <div className="">
          <h2 className="text-2xl font-semibold">{mood} Mix</h2>
          <p className="pt-2 text-gray-600">
            A mix of high-energy tracks to get you moving!
          </p>
          <Button className="mt-6 p-4 rounded-3xl bg-gray-200 text-black cursor-pointer hover:bg-gray-300">
            Play
          </Button>
        </div>
        <div>
          {/* Playlist cover image */}
          <div className="mt-6 w-72 h-72 bg-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-5xl">🎵</span>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm">Energetic Mix</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 w-full flex flex-col items-start justify-between mb-10">
        {/* Playlist tracks */}
        <h2 className="text-2xl font-semibold">Recommended Playlist</h2>
        <div className="mt-4 w-full">
          {[1, 2, 3, 4, 5].map((track) => (
            <div
              key={track}
              className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer"
            >
              <div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎵</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Track Title {track}
                    </h3>
                    <p className="text-sm text-gray-600">Artist Name</p>
                  </div>
                </div>
              </div>
              <div>
                <Heart className="w-6 h-6 text-black hover:text-red-500 cursor-pointer " />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full'>
        <Player/>
      </div>
    </div>
  )
}
