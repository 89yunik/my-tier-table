import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import TierTable from "./TierTable"
import Gallery from "./Gallery"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TierTable />
        <Gallery />
      </header>
    </div>
  )
}

export default App
