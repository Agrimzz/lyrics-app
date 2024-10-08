declare interface ButtonProps extends TouchableOpacityProps {
  title: string
  containerStyles?: string
  textStyles?: string
  handlePress: () => void
}
