import axios from 'axios'
import { useEffect, useState } from 'react'

// Pexels API 认证密钥
const API_KEY = 'WfJN5QkixLc7WKnf6vKjbL0cOEUM0WhK4TFGuKxMRMACffsUH2DmZ0fA'

interface useFetchImgProps {
  keyword?: string
}

/**
 * 根据关键词从Pexels获取一张图片
 */
const useFetchImg = ({ keyword }: useFetchImgProps = {}): string => {
  const [imageUrl, setImageUrl] = useState<string>('')

  const fetchImages = async () => {
    try {
      // 如果没有关键词则使用web3作为默认值
      const searchTerm = keyword?.trim() ? keyword : 'web3'

      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=10`,
        { headers: { Authorization: API_KEY } }
      )

      if (response?.data?.photos?.length > 0) {
        // 随机选择0到photos.length-1之间的一个索引
        const randomIndex = Math.floor(Math.random() * response.data.photos.length)
        setImageUrl(response.data.photos[randomIndex].src.tiny)
      } else {
        // 如果没有找到相关图片，返回null
        setImageUrl('')
      }
    } catch (error) {
      console.error('获取图片时出错:', error)
      setImageUrl('')
    }
  }

  useEffect(() => {
    fetchImages()
  }, [keyword])

  return imageUrl
}

export default useFetchImg
