import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import TierTable from "./TierTable"
import Gallery from "./Gallery"
import { useState } from "react"

function App() {
  const [activeTab, setActiveTab] = useState("Animation")

  return (
    <div id="app" onDragOver={(e) => e.preventDefault()}>
      <div id="app-body">
        <TierTable activeTab={activeTab} />
        <Gallery activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  )
}

export default App
