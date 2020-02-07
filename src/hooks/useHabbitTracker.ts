import { useState, useEffect } from "react"
import localforage from 'localforage'

type Cadence = "h" | "d" | "w"

interface HabbitObject {
  id: string
  title: string
  lastReached: number
  cadence: Cadence
  streak: number
}

export function useHabbitTracker() {
  const [habbits, setHabbits] = useState<HabbitObject[]>([])

  useEffect(() => {
    localforage.getItem('HABBITS')
    .then((json: any) => {
      const res: HabbitObject[] = JSON.parse(json)
      setHabbits(res)
    })
    .catch(console.warn)

    return () => {}
  }, [])

  function updateHabbit(id: string, update: HabbitObject) {
    const next = habbits.map(i => {
      if (i.id === id) {
        return update
      }
      return i
    })
    setHabbits(next)
  }

  function addHabbit(title: string, options?: any) {
    const newHabbit: HabbitObject = {
      id: generateId(),
      title: title,
      lastReached: options?.lastReached || Date.now(),
      cadence: options?.cadence || "d",
      streak: 0
    }
    const newHabbits = [...habbits, newHabbit]
    setHabbits(newHabbits)
    localforage.setItem('HABBITS', JSON.stringify(newHabbits)).catch(console.warn)
  }

  function removeHabbit(id: string) {
    const next = habbits.filter(i => i.id !== id)
    setHabbits(next)
  }

  return {
    habbits,
    addHabbit,
    updateHabbit,
    removeHabbit,
  }
}

function generateId(): string {
  return Date.now().toString()
}
