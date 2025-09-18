import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion';
import {Button} from '../components/ui/button';
import { useMoodStore } from '@/store/mood-store';
export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const {setMood} = useMoodStore()
  const navigate = useNavigate()
  const settingMood = (mood: string) => {
    setMood(mood);
    navigate({to:'/tracks'})
  }
  return (
    // main layout component in which we have mood selector
    <div className="p-6 flex flex-col items-center justify-start min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold">Mood Music</h1>
      <p className="text-gray-600">Select your mood and we'll find the perfect tracks for you!</p>
      <div className="mt-4">
          {/* create a four button layout Sad, Energetic, chill, Foucsed, containg emojis and beautiful animation with framer motion library */}
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-semibold mb-4 ">Choose Your Mood</h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button onClick={() => settingMood('sad')} className="w-40 h-40 flex flex-col items-center justify-center bg-blue-100 hover:bg-blue-200 rounded-lg shadow-md cursor-pointer">
                <span className="text-5xl">😢</span>
                <span className="mt-2 text-xl font-semibold">Sad</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button onClick={() => settingMood('energetic')} className="w-40 h-40 flex flex-col items-center justify-center bg-red-100 hover:bg-red-200 text-red-800 rounded-lg shadow-md cursor-pointer">
                <span className="text-5xl">⚡</span>
                <span className="mt-2 text-xl font-semibold">Energetic</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button onClick={() => settingMood('chill')} className="w-40 h-40 flex flex-col items-center justify-center hover:bg-green-200 bg-green-100 text-green-800 rounded-lg shadow-md cursor-pointer">
                <span className="text-5xl">😌</span>
                <span className="mt-2 text-xl font-semibold">Chill</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button onClick={() => settingMood('focused')} className="w-40 h-40 flex flex-col items-center justify-center hover:bg-yellow-200 bg-yellow-100 text-yellow-800 rounded-lg shadow-md cursor-pointer">
                <span className="text-5xl">🧠</span>
                <span className="mt-2 text-xl font-semibold">Focused</span>
              </Button>
            </motion.div>
          </div>
        </div>
     
      </div>
      
    </div>
  )
}
