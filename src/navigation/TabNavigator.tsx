// src/navigation/TabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import MovieListScreen from "../screens/MovieListScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import SongListScreen from "../screens/SongListScreen";
import SongDetailScreen from "../screens/SongDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack untuk tab "Music"
function SongStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SongListScreen"
        component={SongListScreen}
        options={{ title: "Music" }}
      />
      <Stack.Screen
        name="SongDetailScreen"
        component={SongDetailScreen}
        options={{ title: "Now Playing" }}
      />
    </Stack.Navigator>
  );
}

// Stack untuk tab "Movies" (kalau mau bisa nambah detail movie juga)
function MovieStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MovieList"
        component={MovieListScreen}
        options={{ title: "Movies" }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{ title: "Movie Detail" }}
      />
    </Stack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007aff",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "film-outline";
          if (route.name === "Movies") iconName = "film-outline";
          else if (route.name === "Music") iconName = "musical-notes-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Movies" component={MovieStack} />
      <Tab.Screen name="Music" component={SongStack} />
    </Tab.Navigator>
  );
}
