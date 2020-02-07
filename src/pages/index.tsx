import React, { useState } from "react"
import Modal from "react-modal"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useHabbitTracker } from "../hooks/useHabbitTracker"

function IndexPage() {
  return (
    <Layout>
      <SEO title="Habbits" />
      <HabbitGrid />
    </Layout>
  )
}

function HabbitGrid() {
  const { habbits, addHabbit } = useHabbitTracker()
  const [isAddOpen, setIsAddOpen] = useState(false)

  return (
    <div>
      <AddHabbitModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={addHabbit}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridAutoRows: 175,
          gridGap: "1.5rem",
        }}
      >
        {habbits?.map(i => (
          <HabbitItem key={i.id} habbit={i} />
        ))}
        <AddHabbitButton onAdd={() => setIsAddOpen(true)} />
      </div>
    </div>
  )
}

function HabbitCard({ children }) {
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

interface HabbitItemProps {
  habbit: any
}

function HabbitItem(props: HabbitItemProps) {
  const [isCongrats, setIsCongrats] = useState(false)

  function complete() {
    setIsCongrats(true)
    setTimeout(() => {
      setIsCongrats(false)
    }, 2 * 1000)
  }

  return (
    <HabbitCard>
      <div style={{ textAlign: "center", padding: "1.25rem" }}>
        <h2>{props.habbit?.title}</h2>
        <span>
          {props.habbit?.streak} {props.habbit.cadence}
        </span>
        <button
          style={{
            border: "none",
            background: "none",
            outline: "none",
          }}
          type="button"
          onClick={complete}
        >
          {isCongrats ? "Great Job! 🎉" : "Complete"}
        </button>
      </div>
    </HabbitCard>
  )
}

interface ActionHabbitButtonProps {
  onAdd: () => void
}

function AddHabbitButton(props: ActionHabbitButtonProps) {
  function addNewHabbit() {
    props.onAdd()
  }
  return (
    <HabbitCard>
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
          onClick={addNewHabbit}
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
    </HabbitCard>
  )
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

function AddHabbitModal(props) {
  const [title, setTitle] = useState(null)
  function submit() {
    props.onAdd(title)
    props.onClose()
  }
  return (
    <Modal style={customStyles} isOpen={props.isOpen}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <button onClick={submit}>Submit</button>
      </div>
    </Modal>
  )
}

export default IndexPage
