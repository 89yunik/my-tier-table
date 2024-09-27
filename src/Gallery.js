import { useState, useEffect } from "react"

const Gallery = () => {
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchData = async (query) => {
      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })
      const { data } = await response.json()
      setImages(data.Page.media)
    }
    const pageNum = 1
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
  }, [])
  return (
    <div id="gallery">
      {images.map((imageInfo) => (
        <img className="gallery-image" key={imageInfo.id} src={imageInfo.coverImage.large} title={imageInfo.title.romaji}></img>
      ))}
    </div>
  )
}

export default Gallery
