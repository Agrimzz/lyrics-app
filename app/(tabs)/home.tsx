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
import ArtistsCard from "@/components/ArtistsCard"
import { router } from "expo-router"

const Home = () => {
  const { data, loading, error, refetch } = useFetch<any>(
    "/chart/songs/?time_period=week&chart_genre=all&per_page=10&page=1"
  )

  const { data: chartArtists } = useFetch<any>(
    "/chart/artists/?time_period=week&per_page=10&page=1"
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
        <Text className="text-red-500">Error loading songs. {error}</Text>
      </SafeAreaView>
    )
  }

  const chartSongs = data?.chart_items

  const renderSong = ({ item, index }: { item: any; index: any }) => (
    <TouchableOpacity onPress={() => router.push(`/lyrics/${item.item.id}`)}>
      <View className="flex-row items-center my-4 mx-4 overflow-hidden">
        <Text className="text-lg font-bold mr-4">#{index + 1}</Text>
        <Image
          source={{ uri: item.item.song_art_image_thumbnail_url }}
          className="w-12 h-12 rounded-full mr-4"
        />
        <View>
          <Text className="text-lg font-bold" numberOfLines={1}>
            {item.item.title}
          </Text>
          <Text className="text-gray-500">{item.item.artist_names}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1 ">
      <FlatList
        data={chartSongs}
        keyExtractor={(item) => item.item.id.toString()}
        renderItem={renderSong}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={() => (
          <View className="mx-4">
            <View className="flex space-y-6 pt-6">
              <View className="flex-row gap-4">
                <Image
                  source={require("@/assets/images/logosm.png")}
                  className="w-8 h-8"
                />
                <Text className="text-xl font-bold">Welcome to Lyrify</Text>
              </View>
              <View className="flex">
                <Text className="text-xl font-bold">
                  Trending artists this week
                </Text>
                <ArtistsCard artists={chartArtists?.chart_items} />
              </View>
              <Text className="text-xl font-bold">
                Trending songs this week
              </Text>
            </View>
          </View>
        )}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      />
    </SafeAreaView>
  )
}

export default Home
