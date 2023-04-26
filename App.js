import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QuoteList from "./QuoteList";
import {
  NativeBaseProvider,
  Heading,
  Container,
  View,
  Flex,
  Center,
  Input,
  Box,
} from "native-base";
import React, { useState } from "react";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setSearchTerm(searchText);
    console.log("Performing search with search term:", searchText);
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <StatusBar style="auto" />
        <Center>
          <View style={styles.container}>
            <Box style={styles.search}>
              <Heading mb="4" textAlign={"center"} fontFamily={"Hoefler Text"}>
                Bijon
              </Heading>
              <Flex flexDirection="row">
                <Input
                  placeholder="Search for quotes by type"
                  bg="gray.100"
                  py={2}
                  px={4}
                  borderRadius={4}
                  w={{ base: "100%", md: "50%" }}
                  size="2xl"
                  mb={4}
                  value={searchText}
                  onChangeText={setSearchText}
                  keyboardType="web-search"
                  onSubmitEditing={handleSearch}
                />
              </Flex>
            </Box>

            <QuoteList searchTerm={searchTerm} useTestJson={false} />
          </View>
        </Center>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: "HelveticaNeue-Medium",
  },
});
