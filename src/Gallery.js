import { useState, useEffect } from "react"
import Pagination from "./Pagination"

const Gallery = ({ activeTab, setActiveTab }) => {
  // const [activeTab, setActiveTab] = useState(0)
  const [images, setImages] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const categories = {
    Animation: {
      fetchUrl: "https://graphql.anilist.co",
      query: `
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
    `,
    },
    Movie: {
      fetchUrl: `https://www.omdbapi.com/?s=${searchQuery}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`,
    },
  }

  const handleCategoryChange = (clickedTab) => {
    setActiveTab(clickedTab)
    setPageNum(1)
  }

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setPageNum(1)
      fetchData()
    } else setSearchQuery(e.target.value)
  }

  const handlePageChange = (nextPage) => {
    if (nextPage > 0 && hasNextPage) {
      setPageNum(nextPage)
    }
  }

  const fetchData = async () => {
    const url = categories[activeTab].fetchUrl
    const query = categories[activeTab].query

    switch (activeTab) {
      case "Animation":
        const animationRes = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        })
        const animationData = await animationRes.json()
        setHasNextPage(animationData.data.Page.pageInfo.hasNextPage)
        setImages(animationData.data.Page.media)
        break
      case "Movie":
        const movieRes = await fetch(url)
        const movieData = await movieRes.json()
        const formattedMovieData =
          "Search" in movieData
            ? movieData.Search.map((movie_info) => ({
                id: movie_info.imdbID,
                coverImage: { large: movie_info.Poster },
                title: { romaji: undefined, english: movie_info.Title },
              }))
            : []
        setHasNextPage(false)
        setImages(formattedMovieData)
        break
      default:
        break
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageNum, activeTab])
  return (
    <div id="gallery">
      <div id="gallery-control">
        <ul id="gallery-nav" className="nav nav-pills">
          {Object.keys(categories).map((categoryName, index) => (
            <li key={index} className={`nav-item nav-link ${activeTab === categoryName ? "active" : ""}`} onClick={() => handleCategoryChange(categoryName)}>
              {categoryName}
            </li>
          ))}
        </ul>
        <div id="gallery-search-pagination">
          <input type="text" placeholder="Search for image..." value={searchQuery} onChange={handleSearch} onKeyDown={handleSearch} />
          <Pagination pageNum={pageNum} hasNextPage={hasNextPage} onPageChange={handlePageChange} />
        </div>
      </div>
      {images.map((imageInfo) => (
        <img className="gallery-image" key={imageInfo.id} src={imageInfo.coverImage.large} title={imageInfo.title.romaji} alt={imageInfo.title.english}></img>
      ))}
    </div>
  )
}

export default Gallery
