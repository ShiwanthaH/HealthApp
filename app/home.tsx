import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Pressable,
} from "react-native";
import { UserContext } from "../context/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Home() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (data) {
      if (searchText == "") {
        setFilteredData(data);
      }
      const filteredData = data.filter((item: any) =>
        item.country.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filteredData);
    }
  }, [searchText]);

  const handleItemClick = () => setClickCount(clickCount + 1);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="mb-4 p-8 rounded-md bg-slate-50 border border-gray-300"
      onPress={handleItemClick}
    >
      <View className="flex-row items-center mb-4">
        <Image
          source={{ uri: item.countryInfo.flag }}
          className="w-[50px] h-[30px] mr-4"
        />
        <Text className="text-xl font-bold text-slate-700">{item.country}</Text>
      </View>

      <View className="flex-1 mt-4 border border-gray-300 p-4 border-b-0 justify-center items-center">
        <FontAwesome5
          name="briefcase-medical"
          size={24}
          color="black"
          className="mb-2"
        />
        <View>
          <Text className="font-semibold text-slate-700 mb-2 text-center">
            Total Cases
          </Text>
          <Text className="text-4xl font-bold text-slate-500">
            {item.cases}
          </Text>
        </View>
      </View>
      <View className="flex-row">
        <View className="w-1/2 flex-1 justify-center items-center border border-gray-300 p-4 border-r-0">
          <FontAwesome name="recycle" size={24} color="black" />
          <View>
            <Text className="text-center">Recovered</Text>
            <Text className="text-2xl font-bold text-green-600">
              {item.recovered}
            </Text>
          </View>
        </View>
        <View className="w-1/2 flex-1 justify-center items-center border border-gray-300 p-4">
          <Ionicons name="skull" size={24} color="black" />
          <View>
            <Text className="text-center">Deaths</Text>
            <Text className="text-2xl font-bold text-red-600">
              {item.deaths}
            </Text>
          </View>
        </View>
      </View>
      <Text className="text-sm text-gray-300 mt-6">
        Last Update: {new Date(item.updated).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-4">
        <View className="flex-row items-center pb-4">
          <ImageBackground
            source={require("../assets/man (1).png")}
            resizeMode="contain"
            className="w-16 h-16 mr-2"
          />
          <View>
            <Text className="text-lg">Welcome,</Text>
            <Text className="text-2xl font-bold">{user}</Text>
          </View>
        </View>

        <View className="my-2">
          <TextInput
            placeholder="Search"
            className="border border-gray-300 py-4 px-4 rounded-md bg-gray-200"
            placeholderTextColor={"rgba(0,0,0,0.3)"}
            onChange={(e) => setSearchText(e.nativeEvent.text)}
          />
        </View>

        <Text className="text-md my-4 text-red-400 text-right">
          COVID-19 Cases by Country
        </Text>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.country}
          renderItem={renderItem}
        />
        <View className="absolute bottom-4 right-4">
          <Pressable
            onPress={() => {}}
            className="bg-red-400 w-20 h-20 rounded-full flex-1 justify-center items-center"
          >
            <Text className="text-2xl font-bold text-white">
              {clickCount.toString()}
            </Text>
          </Pressable>

          {/* <Button title={`Clicks: ${clickCount}`} onPress={() => {}} /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, textAlign: "center", marginBottom: 8 },
  card: { padding: 16, borderWidth: 1, marginVertical: 8, borderRadius: 8 },
  flag: { width: 50, height: 30, marginBottom: 8 },
  country: { fontSize: 16, fontWeight: "bold" },
  floatingButton: { position: "absolute", bottom: 16, right: 16 },
});
