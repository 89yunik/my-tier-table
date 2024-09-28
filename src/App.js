import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import TierTable from "./TierTable"
import Gallery from "./Gallery"

function App() {
  return (
    <div id="app" onDragOver={(e) => e.preventDefault()}>
      {/* <h1 id="app-title">My Tier Table</h1> */}
      <div id="app-body">
        <TierTable />
        <Gallery />
      </div>
    </div>
  )
}

export default App
