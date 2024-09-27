import { useState } from "react"
import AutosizeInput from "react-input-autosize"

const TierTable = () => {
  const rowKey = "TierName"
  const initialTierName = "Tier"

  const [rows, setRows] = useState([{ [rowKey]: initialTierName }])

  const addRow = (rowNum) => {
    const newRows = [...rows]
    newRows.splice(rowNum + 1, 0, { [rowKey]: initialTierName })
    setRows(newRows)
  }

  const TierTableRow = (props) => {
    const [tierName, setTierName] = useState(props.rowInfo[rowKey])

    const changeTierName = (e) => {
      setTierName(e.target.value)
      rows[props.index][rowKey] = e.target.value
    }
    return (
      <div className="tier-table-row">
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
    <div id="tier-table">
      {Array.from(rows).map((row, i) => (
        <TierTableRow key={i} index={i} rowInfo={row} />
      ))}
    </div>
  )
}

export default TierTable
