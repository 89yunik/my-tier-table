import { useState, useEffect } from "react"
import Pagination from "./Pagenation"

const Gallery = () => {
  const [images, setImages] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)

  const handlePageChange = (nextPage) => {
    if (nextPage > 0 && hasNextPage) {
      setPageNum(nextPage)
    }
  }

  const fetchData = async (query) => {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
    const { data } = await response.json()
    setHasNextPage(data.Page.pageInfo.hasNextPage)
    setImages(data.Page.media)
  }

  useEffect(() => {
    const animeQuery = `
      {
        Page(page: ${pageNum}) {
          media(type: ANIME, format: TV, status: FINISHED, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `

    fetchData(animeQuery)
  }, [pageNum])
  return (
    <div id="gallery">
      <Pagination pageNum={pageNum} hasNextPage={hasNextPage} onPageChange={handlePageChange} />
      {images.map((imageInfo) => (
        <img className="gallery-image" key={imageInfo.id} src={imageInfo.coverImage.large} title={imageInfo.title.romaji} alt={imageInfo.title.english}></img>
      ))}
    </div>
  )
}

export default Gallery
