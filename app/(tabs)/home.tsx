import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useFetch } from "@/lib/fetch"

const Home = () => {
  const { data, loading, error, refetch } = useFetch<any>(
    "/chart/songs/?time_period=week&chart_genre=all&per_page=50&page=1"
  )

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

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
        <Text className="text-red-500">Error loading songs.</Text>
      </SafeAreaView>
    )
  }

  const chartSongs = data?.chart_items

  const renderSong = ({ item }) => (
    <TouchableOpacity>
      <View className="flex-row items-center my-4 px-4">
        <Image
          source={{ uri: item.item.song_art_image_thumbnail_url }}
          className="w-12 h-12 rounded-full mr-4"
        />
        <View>
          <Text className="text-lg font-bold">{item.item.title}</Text>
          <Text className="text-gray-500">{item.item.artist_names}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1 bg-lightGray">
      <FlatList
        data={chartSongs}
        keyExtractor={(item) => item.item.id.toString()}
        renderItem={renderSong}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={() => <View className="mx-4"></View>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  )
}

export default Home
