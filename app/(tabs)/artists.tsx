import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native"
import React from "react"
import { useFetch } from "@/lib/fetch"
import { SafeAreaView } from "react-native-safe-area-context"

const Artists = () => {
  const { data, loading, error, refetch } = useFetch<any>(
    "/chart/artists/?time_period=week&per_page=30&page=1"
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
      <View className="flex-row items-center my-4">
        <View>
          <Text className="text-lg mt-2 font-bold">#{index + 1}</Text>
        </View>
        <Image
          source={{ uri: item.item.image_url }}
          className="w-12 h-12 rounded-full mx-4"
          resizeMode="contain"
        />
        <View>
          <Text className="text-base font-semibold">{item.item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const chartArtists = data?.chart_items
  return (
    <SafeAreaView className="bg-lightGray px-4 pt-4">
      <FlatList
        data={chartArtists}
        keyExtractor={(item) => item.item.id.toString()}
        renderItem={renderArtists}
        ListHeaderComponent={() => (
          <View>
            <Text className="text-2xl font-bold">Trending Artists</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Artists
