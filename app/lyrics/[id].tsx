import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native"
import React, { useState } from "react"
import { useLocalSearchParams } from "expo-router"
import { useFetch } from "@/lib/fetch"
import RenderHtml from "react-native-render-html"

type LyricsData = {
  lyrics?: {
    lyrics: {
      body?: {
        html?: string
      }
    }
    tracking_data?: {
      title?: string
      primary_artist?: string
      release_date?: string
    }
  }
}

type SongsData = {
  song: {
    song_art_image_url: string
    release_date_for_display?: string
    description_preview?: string
  }
}

const Lyrics = () => {
  const { id } = useLocalSearchParams()
  const { data, loading, error } = useFetch<LyricsData>(
    `/song/lyrics/?id=${id}`
  )
  const { data: details } = useFetch<SongsData>(`/song/details/?id=${id}`)

  const [showFullDescription, setShowFullDescription] = useState(false)

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-red-500">
          Error loading song details: {error}
        </Text>
      </SafeAreaView>
    )
  }

  const title = data?.lyrics?.tracking_data?.title || "Unknown Title"
  const primary_artist =
    data?.lyrics?.tracking_data?.primary_artist || "Unknown Artist"
  const release_date =
    data?.lyrics?.tracking_data?.release_date || "Unknown Release Date"
  const lyricsHtml =
    data?.lyrics?.lyrics?.body?.html || "<p>Lyrics unavailable</p>"
  const descriptionPreview = details?.song.description_preview || ""

  return (
    <SafeAreaView className="flex-1 bg-lightGray py-6">
      <ScrollView>
        <View className="p-4">
          <View className="flex flex-row items-center">
            <Image
              source={{ uri: details?.song.song_art_image_url }}
              className="w-32 h-32"
              style={{ borderRadius: 8 }}
            />
            <View className="ml-4">
              <Text className="text-xl font-bold">{title}</Text>
              <Text className="text-lg">{primary_artist}</Text>
              <Text className="text-md text-gray-500">
                {details?.song.release_date_for_display ||
                  "Unknown Release Date"}
              </Text>
            </View>
          </View>

          <Text className="mt-4">
            {showFullDescription
              ? descriptionPreview
              : `${descriptionPreview.slice(0, 100)}...`}
          </Text>
          {descriptionPreview.length > 100 && (
            <TouchableOpacity
              onPress={() => setShowFullDescription(!showFullDescription)}
            >
              <Text className="text-blue-500 ">
                {showFullDescription ? "Show Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          )}

          <Text className="mt-4 text-lg font-bold">Lyrics:</Text>
          <RenderHtml contentWidth={400} source={{ html: lyricsHtml }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Lyrics
