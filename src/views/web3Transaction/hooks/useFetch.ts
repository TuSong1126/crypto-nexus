import { useEffect, useState } from 'react'

// GIPHY API key - 在实际应用中最好从环境变量中获取
const API_KEY = 'zFOvZN9d2Vm3bZDWHBKLaUHW2SfSTpao'

interface UseFetchProps {
  keyword: string
}

/**
 * 根据关键词从GIPHY获取一个GIF
 * @param param0 包含关键词的对象
 * @returns GIF URL或null
 */
const useFetch = ({ keyword }: UseFetchProps): string | null => {
  const [gifUrl, setGifUrl] = useState<string | null>(null)

  const fetchGifs = async () => {
    try {
      // 如果没有关键词则使用随机GIF
      const searchTerm = keyword.trim() ? keyword : 'random'

      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm.split(' ').join('')}&limit=1`
      )
      const { data } = await response.json()

      if (data && data.length > 0) {
        setGifUrl(data[0]?.images?.downsized_medium.url)
      } else {
        // 如果没有找到相关GIF，则使用一个默认GIF
        setGifUrl('https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif')
      }
    } catch (error) {
      console.error('获取GIF时出错:', error)
      // 出错时使用默认GIF
      setGifUrl('https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif')
    }
  }

  useEffect(() => {
    if (keyword) fetchGifs()
  }, [keyword])

  return gifUrl
}

export default useFetch
