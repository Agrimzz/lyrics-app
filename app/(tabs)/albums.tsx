import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native"
import React from "react"
import { useFetch } from "@/lib/fetch"
import { SafeAreaView } from "react-native-safe-area-context"

const Albums = () => {
  const { data, loading, error, refetch } = useFetch<any>(
    "/chart/albums/?time_period=day&per_page=10&page=1"
  )

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

  const renderArtists = ({ item, index }: { item: any; index: any }) => (
    <TouchableOpacity className="mt-4">
      <View className="flex-row items-center my-1 overflow-hidden rounded-lg">
        <ImageBackground
          source={{ uri: item.item.cover_art_url }}
          className="w-full h-44 relative justify-end "
          resizeMode="cover"
        >
          <View className="absolute inset-0 bg-black opacity-40 w-full h-full" />
          <View className="p-2">
            <Text className="text-lg font-bold  text-white">#{index + 1}</Text>
            <Text className="text-lg font-bold text-white">
              {item.item.name}
            </Text>
            <Text className=" text-slate-300 font-bold mt-4">
              {item.item.primary_artist_names}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )

  const chartArtists = data?.chart_items
  return (
    <SafeAreaView className="bg-lightGray px-4 pt-6">
      <FlatList
        data={chartArtists}
        keyExtractor={(item) => item.item.id.toString()}
        renderItem={renderArtists}
        ListHeaderComponent={() => (
          <View>
            <Text className="text-2xl font-bold">Trending Albums</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Albums
