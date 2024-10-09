import { useState, useEffect } from "react"
import Pagination from "./Pagenation"

const Gallery = () => {
  const [images, setImages] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const animeQuery = `
      {
        Page(page: ${pageNum}) {
          media(type: ANIME, format: TV, status: FINISHED, sort: POPULARITY_DESC, ${searchQuery ? `search: "${searchQuery}"` : ""}) {
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

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setPageNum(1)
      fetchData(animeQuery)
    } else setSearchQuery(e.target.value)
  }

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
    fetchData(animeQuery)
  }, [pageNum])
  return (
    <div id="gallery">
      <div id="gallery-control">
        <input type="text" placeholder="Search for image..." value={searchQuery} onChange={handleSearch} onKeyDown={handleSearch} />
        <Pagination pageNum={pageNum} hasNextPage={hasNextPage} onPageChange={handlePageChange} />
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              Animation
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Movie
            </a>
          </li>
        </ul>
      </div>
      {images.map((imageInfo) => (
        <img className="gallery-image" key={imageInfo.id} src={imageInfo.coverImage.large} title={imageInfo.title.romaji} alt={imageInfo.title.english}></img>
      ))}
    </div>
  )
}

export default Gallery
