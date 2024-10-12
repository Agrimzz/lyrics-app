import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
  Image,
} from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useFetch } from "@/lib/fetch"
import { IconSearch } from "tabler-icons-react-native"
import { router } from "expo-router"

const Search = () => {
  const [query, setQuery] = useState("")
  const { data, loading, error, refetch } = useFetch<any>(
    `/search/?q=${query}&per_page=10&page=1`
  )

  const handleSearch = () => {
    if (!query) {
      return Alert.alert(
        "Missing Query",
        "Please input something to search across the database."
      )
    } else {
      refetch()
    }
  }

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => router.push(`/lyrics/${item.result.id}`)}>
      <View className="flex-row items-center my-4 mx-4 overflow-hidden">
        <Image
          source={{ uri: item.result.song_art_image_thumbnail_url }}
          className="w-12 h-12 rounded-full mr-4"
        />
        <View>
          <Text className="text-lg font-bold" numberOfLines={1}>
            {item.result.title}
          </Text>
          <Text className="text-gray-500">{item.result.artist_names}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1 px-4 pt-6 bg-lightGray">
      <View className="border-2 border-charcoalGray w-full h-16 px-4 flex-row space-x-4 items-center rounded-lg">
        <TextInput
          className="text-base flex-1"
          value={query}
          onChangeText={(e) => setQuery(e)}
          placeholder="Search songs"
        />
        <TouchableOpacity onPress={handleSearch}>
          <IconSearch />
        </TouchableOpacity>
      </View>

      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {error && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500">Error loading results: {error}</Text>
        </View>
      )}

      {data && (
        <FlatList
          data={data.hits}
          keyExtractor={(item) => item.result.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <Text className="text-center text-gray-500">No results found</Text>
          )}
        />
      )}
    </SafeAreaView>
  )
}

export default Search
