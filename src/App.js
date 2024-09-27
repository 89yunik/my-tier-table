import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import TierTable from "./TierTable"
import Gallery from "./Gallery"

function App() {
  return (
    <div id="app" onDragOver={(e) => e.preventDefault()}>
      <header id="app-header">
        <TierTable />
        <Gallery />
      </header>
    </div>
  )
}

export default App
