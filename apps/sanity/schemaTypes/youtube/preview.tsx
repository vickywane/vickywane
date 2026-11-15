import type {PreviewProps} from 'sanity'
import {Flex, Text} from '@sanity/ui'
import YouTubePlayer from 'react-player'

export function YouTubePreview(props: PreviewProps) {
  const {title: url} = props

  return (
    <Flex padding={3} align="center" justify="center">
      {typeof url === 'string' 
        ? <YouTubePlayer src={url} /> 
        : <Text>Add a YouTube URL</Text>}
    </Flex>
  )
}

