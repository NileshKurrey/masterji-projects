import {create } from 'zustand'

interface MoodState{
    mood:String 
    setMood:(mood:String )=>void
}
export const useMoodStore = create<MoodState>((set) => ({
    mood: "Happy",
    setMood: (mood) => set({ mood })
}))