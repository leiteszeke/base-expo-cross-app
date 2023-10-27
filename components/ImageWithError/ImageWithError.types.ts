import { ImageProps } from 'expo-image'

export type ImageWithErrorProps = Omit<ImageProps, 'source'> & {
  fallbackImage?: ImageProps['source']
  src?: string
}

export type ImageSource = ImageProps['source']
