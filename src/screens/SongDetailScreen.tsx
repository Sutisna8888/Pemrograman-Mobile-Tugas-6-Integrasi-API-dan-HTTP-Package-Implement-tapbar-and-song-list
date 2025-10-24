import React, { useState, useCallback, useRef } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Song } from "../api/data";

type SongDetailRouteProp = RouteProp<{ params: { song: Song } }, "params">;

export default function SongDetailScreen() {
  const route = useRoute<SongDetailRouteProp>();
  const { song } = route.params;
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef(null);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  // Ambil ID video dari URL YouTube
  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : "";
  };

  const videoId = extractYouTubeId(song.url);

  return (
    <ScrollView style={styles.container}>
      {/* Header Lagu */}
      <View style={styles.header}>
        <Image source={{ uri: song.img }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{song.name}</Text>
          <Text style={styles.artist}>{song.artist}</Text>
          {song.playlist ? <Text style={styles.playlist}>{song.playlist}</Text> : null}
          {song.score ? <Text style={styles.score}>Score: {song.score}</Text> : null}
        </View>
      </View>

      {/* YouTube Player */}
      {videoId ? (
        <View style={styles.videoContainer}>
          <YoutubePlayer
            ref={playerRef}
            height={230}
            play={playing}
            videoId={videoId}
          />
          <Pressable style={styles.button} onPress={togglePlaying}>
            <Text style={styles.buttonText}>{playing ? "Pause" : "Play"}</Text>
          </Pressable>
        </View>
      ) : (
        <Text style={styles.error}>Video tidak tersedia</Text>
      )}

      {/* Informasi Detail */}
      <View style={styles.details}>
        <Text style={styles.sectionTitle}>Song Information</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.detailValue}>{song.name}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Artist:</Text>
          <Text style={styles.detailValue}>{song.artist}</Text>
        </View>

        {song.playlist ? (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Playlist:</Text>
            <Text style={styles.detailValue}>{song.playlist}</Text>
          </View>
        ) : null}

        {song.score ? (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Score:</Text>
            <Text style={styles.detailValue}>{song.score}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(249, 250, 251, 1)",
  },
  header: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#0c0c0cda",
    borderBottomWidth: 5,
    borderColor: "#f7570cff",
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f6f7f8ff",
  },
  artist: {
    fontSize: 14,
    color: "#f4f5f7ff",
  },
  playlist: {
    fontSize: 13,
    color: "#f7f9fcff",
    marginTop: 2,
  },
  score: {
    fontSize: 13,
    color: "#11eb1cff",
    fontWeight: "600",
  },
  videoContainer: {
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingBottom: 5,
    elevation: 20,
  },
  button: {
    backgroundColor: "#124ac2ff",
    marginHorizontal: 30,
    marginTop: -15,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    textAlign: "center",
    color: "#ef4444",
    marginTop: 20,
  },
  details: {
    marginTop: 15,
    backgroundColor: "#080808ff",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#fffffff8",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 14,
    color: "#ffffffff",
  },
  label: {
    fontWeight: "500",
    color: "#f9fafcff",
    marginRight: 1, 
    minWidth: 60,
  },
});
