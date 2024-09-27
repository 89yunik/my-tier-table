import { useState } from "react"
import AutosizeInput from "react-input-autosize"

const TierTable = () => {
  const rowKey = "TierName"
  const initialTierName = "Tier"

  const [rows, setRows] = useState([{ [rowKey]: initialTierName, images: new Set() }])

  const modifyRow = (rowNum, isAdd = true) => {
    const newRows = [...rows]
    if (isAdd) newRows.splice(rowNum + 1, 0, { [rowKey]: initialTierName, images: new Set() })
    else if (rows.length > 1) newRows.splice(rowNum, 1)
    setRows(newRows)
  }

  const TierTableRow = (props) => {
    const [tierName, setTierName] = useState(props.rowInfo[rowKey])
    const [images, setImages] = useState(props.rowInfo.images)
    const [draggedUrl, setDraggedUrl] = useState(null)

    const changeTierName = (e) => {
      setTierName(e.target.value)
      rows[props.index][rowKey] = e.target.value
    }

    const handleDragStart = (url) => {
      setDraggedUrl(url)
    }

    const handleImageDrag = (e) => {
      e.preventDefault()
      const newImages = new Set(images)
      if (draggedUrl) {
        newImages.delete(draggedUrl)
        setDraggedUrl(null)
      } else {
        const urlToAdd = e.dataTransfer.getData("text/uri-list")
        newImages.add(urlToAdd)
      }

      setImages(newImages)

      const newRows = [...rows]
      newRows[props.index].images = newImages
      setRows(newRows)
    }

    const handleDragOver = (e) => {
      e.preventDefault()
    }

    return (
      <div className="tier-table-row">
        <AutosizeInput className="tier-name" type="text" value={tierName} onChange={changeTierName} />
        <div className="tier-images" onDrop={(e) => handleImageDrag(e)} onDragOver={handleDragOver} onDragLeave={(e) => handleImageDrag(e)}>
          {Array.from(images).map((url) => (
            <img key={url} className="gallery-image" src={url} onDragStart={() => handleDragStart(url)}></img>
          ))}
        </div>
        <button className="tier-row-crud-btn btn btn-link" onClick={() => modifyRow(props.index)}>
          +
        </button>
        <button className="tier-row-crud-btn btn btn-link" onClick={() => modifyRow(props.index, false)} disabled={rows.length < 2}>
          -
        </button>
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
