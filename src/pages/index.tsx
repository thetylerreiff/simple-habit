import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useHabitTracker } from "../hooks/useHabitTracker"

function IndexPage() {
  return (
    <Layout>
      <SEO title="Habits" />
      <HabitGrid />
    </Layout>
  )
}

function HabitGrid() {
  const { habits, addHabit, updateHabit, removeHabit } = useHabitTracker()
  const [isAddOpen, setIsAddOpen] = useState(false)

  return (
    <div>
      <AddHabitModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={addHabit}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridAutoRows: 175,
          gridGap: "1.5rem",
        }}
      >
        {habits?.map(i => (
          <HabitItem
            key={i.id}
            Habit={i}
            onComplete={() => updateHabit(i)}
            onRemove={() => removeHabit(i.id)}
          />
        ))}
        <AddHabitButton onAdd={() => setIsAddOpen(true)} />
      </div>
    </div>
  )
}

function HabitCard({ children }) {
  return (
    <div
      style={{
        padding: "1.5rem",
      }}
    >
      {children}
    </div>
  )
}

interface HabitItemProps {
  Habit: any
  onComplete: () => void
  onRemove: () => void
}

function HabitItem(props: HabitItemProps) {
  const [isCongrats, setIsCongrats] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  function remove() {
    props.onRemove()
  }

  function complete() {
    props.onComplete()
    setIsCongrats(true)
    setTimeout(() => {
      setIsCongrats(false)
    }, 2 * 1000)
  }

  return isDelete ? (
    <HabitCard>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
        onClick={() => setIsDelete(false)}
      >
        <button
          type="button"
          style={{ background: "none", border: "none", outline: "none" }}
          onClick={remove}
        >
          <svg
            style={{
              height: 100,
              stroke: "grey",
              transform: "rotate(45deg)",
            }}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="7.5"
            ></circle>
            <line x1="32.5" y1="50" x2="67.5" y2="50" strokeWidth="5"></line>
            <line x1="50" y1="32.5" x2="50" y2="67.5" strokeWidth="5"></line>
          </svg>
        </button>
      </div>
    </HabitCard>
  ) : (
    <HabitCard>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div onClick={() => setIsDelete(true)}>
          <h2 >{props.Habit?.title}</h2>
          <span>
            {props.Habit?.streak} {props.Habit.cadence}{" "}
            {props.Habit?.streak >= 5 ? "🔥" : null}
          </span>
        </div>
        
        <button
          style={{
            border: "none",
            background: "none",
            outline: "none",
            marginTop: "1.5rem",
          }}
          type="button"
          onClick={complete}
        >
          {isCongrats ? "Great Job! 🎉" : "Complete"}
        </button>
      </div>
    </HabitCard>
  )
}

interface ActionHabitButtonProps {
  onAdd: () => void
}

function AddHabitButton(props: ActionHabitButtonProps) {
  function addNewHabit() {
    props.onAdd()
  }
  return (
    <HabitCard>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <button
          type="button"
          style={{ background: "none", border: "none", outline: "none" }}
          onClick={addNewHabit}
        >
          <svg style={{ height: 100, stroke: "#4B5EA3" }} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="7.5"
            ></circle>
            <line x1="32.5" y1="50" x2="67.5" y2="50" strokeWidth="5"></line>
            <line x1="50" y1="32.5" x2="50" y2="67.5" strokeWidth="5"></line>
          </svg>
        </button>
      </div>
    </HabitCard>
  )
}

function AddHabitModal(props) {
  const [title, setTitle] = useState(null)

  function submit() {
    props.onAdd(title)
    setTitle(null)
    props.onClose()
  }
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        fontSize: 28,
        height: props.isOpen ? 50 : 0,
        display: "flex",
        justifyContent: "center",
        transition: "height 1s",
        visibility: props.isOpen ? "visible" : "hidden",
      }}
    >
      <input
        style={{ flex: 3 }}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button
        style={{
          background: "none",
          color: "white",
          flex: 1,
          border: "solid white",
        }}
        type="button"
        onClick={submit}
      >
        Submit
      </button>
    </div>
  )
}

export default IndexPage
