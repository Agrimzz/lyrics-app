import { View, Text, Image } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import CustomButton from "@/components/CustomButton"
import { router } from "expo-router"

const Index = () => {
  const handleClick = () => {
    router.push("/")
  }
  return (
    <SafeAreaView className="bg-lightGray h-full">
      <View className="mx-4">
        <View className="flex items-center justify-between h-full py-8">
          <Image
            source={require("@/assets/images/logo.png")}
            className="w-96 h-96 mt-36"
            resizeMode="contain"
          />
          <View className="flex">
            <Text className="text-purplePrimary text-xl text-center">
              Discover the words behind the music. Welcome to Lyrify
            </Text>
            <CustomButton
              title="Get Started"
              containerStyles="mt-4"
              handlePress={handleClick}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Index
