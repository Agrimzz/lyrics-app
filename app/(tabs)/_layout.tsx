import { View, Text } from "react-native"
import React from "react"
import { Tabs } from "expo-router"
import {
  IconCategory,
  IconHome,
  IconSearch,
  IconUsersGroup,
} from "tabler-icons-react-native"

const TabIcon = ({
  Icon,
  color,
  name,
  focused,
}: {
  Icon: React.FC<{ color: string }>
  color: string
  name: string
  focused: boolean
}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Icon color={color} />
      <Text
        className={`${focused ? "font-bold" : ""} text-sm`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#e9e8e9",
          tabBarInactiveTintColor: "#3A3A3A",
          tabBarStyle: {
            backgroundColor: "#5A36A2",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={IconHome}
                color={color}
                focused={focused}
                name="Home"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            title: "artists",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={IconUsersGroup}
                color={color}
                focused={focused}
                name="Artists"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="genre"
          options={{
            title: "genre",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={IconCategory}
                color={color}
                focused={focused}
                name="Genre"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "search",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={IconSearch}
                color={color}
                focused={focused}
                name="Search"
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout
