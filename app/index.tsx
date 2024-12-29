import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/userContext";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (
        parsedUser &&
        parsedUser.username === username &&
        parsedUser.password === password
      ) {
        setUser(username);
        router.push("/home");
      } else {
        Alert.alert("Invalid credentials!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center py-16 px-8 bg-gray-50">
      <SafeAreaView className="flex-1 w-full h-full justify-between">
        <View className="mx-auto mb-8 w-80 h-32">
          <ImageBackground
            source={require("../assets/covid-logo.png")}
            resizeMode="contain"
            className="w-full h-full"
          />
        </View>
        <View>
          <Text className="text-4xl font-bold mb-8 text-center">Login</Text>
          <TextInput
            placeholder="Username"
            placeholderTextColor={"rgba(0,0,0,0.3)"}
            className="w-full border bg-slate-100 border-gray-300 rounded-md py-4 px-6 mb-4"
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={"rgba(0,0,0,0.3)"}
            className="w-full border bg-slate-100 border-gray-300 rounded-md py-4 px-6 mb-4"
            secureTextEntry
            onChangeText={setPassword}
          />
          <CustomButton
            onPress={handleLogin}
            title="Login"
            containerStyle="bg-red-400 mb-4"
            textStyle="text-white font-semibold"
          />
        </View>
        <View className="flex flex-row justify-center ">
          <Text className="mr-2">Don't have an account?</Text>
          <Link href="/signup">
            <Text className="text-blue-500">Sign Up</Text>
          </Link>
        </View>
      </SafeAreaView>
    </View>
  );
}
