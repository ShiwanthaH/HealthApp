import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const user = { username, password };
      await AsyncStorage.setItem("user", JSON.stringify(user));
      Alert.alert("Registration successful!");
      router.push("/");
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
          <Text className="text-4xl font-bold mb-8 text-center">Create Account</Text>
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
            onPress={handleSignUp}
            title="Sign up"
            containerStyle="bg-red-400 mb-4"
            textStyle="text-white font-semibold"
          />
        </View>
        <View className="flex flex-row justify-center ">
          <Text className="mr-2">Already have an account?</Text>
          <Link href="/">
            <Text className="text-blue-500">Login</Text>
          </Link>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8 },
});
