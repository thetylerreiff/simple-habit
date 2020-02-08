import { useState, useEffect } from "react"
import localforage from 'localforage'

type Cadence = "h" | "d" | "w"

interface HabitObject {
  id: string
  title: string
  lastReached: number
  cadence: Cadence
  streak: number
}

export function useHabitTracker() {
  const [habits, setHabits] = useState<HabitObject[]>([])

  useEffect(() => {
    localforage.getItem('HABBITS')
    .then((json: any) => {
      const res: HabitObject[] = JSON.parse(json)
      setHabits(res)
    })
    .catch(console.warn)

    return () => {}
  }, [])

  function addHabit(title: string, options?: any) {
    const newHabit: HabitObject = {
      id: generateId(),
      title: title,
      lastReached: options?.lastReached || Date.now(),
      cadence: options?.cadence || "d",
      streak: 0
    }
    const newHabits = [...habits, newHabit]
    setHabits(newHabits)
    localforage.setItem('HABBITS', JSON.stringify(newHabits)).catch(console.warn)
  }

  function updateHabit(item: HabitObject, options?: any) {
    const next = habits.map(i => {
      if (i.id === item.id) {
        const update: HabitObject = {
          ...item,
          streak: item.streak + 1,
          lastReached: Date.now(),
        }
        return update
      }
      return i
    })
    setHabits(next)
    localforage.setItem('HABBITS', JSON.stringify(next)).catch(console.warn)

  }

  function removeHabit(id: string) {
    const next = habits.filter(i => i.id !== id)
    setHabits(next)
    localforage.setItem('HABBITS', JSON.stringify(next)).catch(console.warn)
  }

  return {
    habits,
    addHabit,
    updateHabit,
    removeHabit,
  }
}

function generateId(): string {
  return Date.now().toString()
}
