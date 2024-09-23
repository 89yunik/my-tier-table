import { useState } from "react"
import AutosizeInput from "react-input-autosize"

const TierTable = () => {
  const [rows, setRows] = useState([{ tierName: "tier" }])

  const addRow = (rowNum) => {
    const newRows = [...rows]
    newRows.splice(rowNum + 1, 0, { tierName: "tier" })
    setRows(newRows)
  }

  const TierTableRow = (props) => {
    const [tierName, setTierName] = useState(props.rowInfo["tierName"])

    const changeTierName = (e) => {
      setTierName(e.target.value)
      rows[props.index]["tierName"] = e.target.value
    }
    return (
      <div className="tier-row">
        <AutosizeInput className="tier-name" type="text" value={tierName} onChange={changeTierName} />
        <span className="tier-images">
          <button className="add-tier-btn btn btn-link" onClick={() => addRow(props.index)}>
            +
          </button>
        </span>
      </div>
    )
  }

  return (
    <div>
      {Array.from(rows).map((row, i) => (
        <TierTableRow key={i} index={i} rowInfo={row} />
      ))}
    </div>
  )
}

export default TierTable
