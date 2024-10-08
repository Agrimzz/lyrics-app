import { View, Text, TouchableOpacity, Image, FlatList } from "react-native"
import React from "react"

const ArtistsCard = ({ artists }: any) => {
  const renderArtists = ({ item, index }: { item: any; index: any }) => (
    <TouchableOpacity className="mt-4">
      <View className="flex items-center my-4 px-4">
        <Image
          source={{ uri: item.item.image_url }}
          className="w-32 h-32 rounded-lg mr-4"
          resizeMode="contain"
        />
        <View>
          <Text className="text-lg mt-2 font-bold">#{index + 1}</Text>
        </View>
        <View>
          <Text className="text-base font-semibold">{item.item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
  return (
    <FlatList
      data={artists}
      keyExtractor={(item) => item.item.id.toString()}
      renderItem={renderArtists}
      horizontal
    />
  )
}

export default ArtistsCard
