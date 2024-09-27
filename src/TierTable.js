import { useState } from "react"
import AutosizeInput from "react-input-autosize"

const TierTable = () => {
  const rowKey = "TierName"
  const initialTierName = "Tier"

  const [rows, setRows] = useState([{ [rowKey]: initialTierName, images: new Set() }])

  const addRow = (rowNum) => {
    const newRows = [...rows]
    newRows.splice(rowNum + 1, 0, { [rowKey]: initialTierName, images: new Set() })
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
        <button className="add-tier-btn btn btn-link" onClick={() => addRow(props.index)}>
          +
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
