import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Song } from "../api/data";

interface SongCardProps {
  song: Song;
}

export default function SongCard({ song }: SongCardProps) {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate("SongDetailScreen", { song })}
    >
      <Image source={{ uri: song.img }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {song.name}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {song.artist}
        </Text>
        {song.playlist ? (
          <Text style={styles.playlist}>Playlist: {song.playlist}</Text>
        ) : null}
        {song.score ? (
          <Text style={styles.score}>Score: {song.score}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 8,
    marginHorizontal: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  artist: {
    fontSize: 14,
    color: "#666",
  },
  playlist: {
    fontSize: 13,
    color: "#007aff",
    marginTop: 2,
  },
  score: {
    fontSize: 13,
    color: "#ff9500",
    marginTop: 2,
  },
});
