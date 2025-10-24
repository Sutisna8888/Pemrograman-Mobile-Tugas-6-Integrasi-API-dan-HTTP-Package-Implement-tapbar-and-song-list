import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import SongCard from "../components/SongCard";
import { getSongs, Song } from '../api/data';

const MusicScreen = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const data = await getSongs();
        setSongs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadSongs();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00bfff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f2f2ff" }}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SongCard song={item} />}
      />
    </View>
  );
};

export default MusicScreen;
