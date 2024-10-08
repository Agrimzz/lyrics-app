import { View, Text, TouchableOpacity } from "react-native"
import React from "react"

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-purplePrimary rounded-xl justify-center items-center min-h-[62px] ${containerStyles}`}
    >
      <Text className={`text-white text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
