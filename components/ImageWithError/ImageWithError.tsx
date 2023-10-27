import { useState } from 'react'
import { Image as ExpoImage } from 'expo-image'
import { ImageSource, ImageWithErrorProps } from './ImageWithError.types'

import placeholderImage from '../../assets/images/placeholder.jpeg'

const ImageWithError = ({ fallbackImage, src, ...props }: ImageWithErrorProps) => {
  const [imageSource, setImageSource] = useState<ImageSource>(
    src ? { uri: src } : { uri: placeholderImage },
  )

  const handleError = () => {
    const placeholder: ImageSource = fallbackImage ?? {
      uri: placeholderImage,
    }

    if (imageSource !== fallbackImage) {
      setImageSource(placeholder)
    }
  }

  return <ExpoImage {...props} source={imageSource} onError={handleError} />
}

export default ImageWithError
