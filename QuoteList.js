import axios from "axios";
import { useState, useEffect } from "react";
import { FlatList, Text, Box, Container } from "native-base";
import { AuthorThumbnail } from "./AuthorThumbnail";

const QuoteList = ({ searchTerm, useTestJson }) => {
  const [quotes, setQuotes] = useState([]);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: `Find up to 5 relevant quotes related to the search term "${searchTerm}". The search term can refer to a type, genre, author, or text. For each quote, include a short biography of the author with less than 140 characters. Please return the results in JSON format with the following structure: {"quotes": [{"quote": "", "author": "", "biography": ""}]}. Make sure property names have double quotes.`,
          max_tokens: 1941,
          temperature: 0.9,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0.6,
          model: "text-davinci-003",
        },
        {
          headers: {
            Authorization: `Bearer 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`,
          },
        }
      );

      if (
        response &&
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0
      ) {
        const quotes = JSON.parse(response.data.choices[0].text.trim()).quotes;
        const data = quotes.map((quote) => ({
          ...quote,
          id: generateId(),
        }));

        setQuotes(data);
      } else {
        console.log("No data available for the search term:", searchTerm);
        setQuotes([]);
      }
    } catch (error) {
      console.error(error);
      setQuotes([]);
    }
  };

  useEffect(() => {
    if (useTestJson) {
      // Load test.json file
      const data = require("./test.json");
      setQuotes(data);
    } else if (searchTerm) {
      // Make API call
      fetchData();
    }
  }, [searchTerm, useTestJson]);

  const renderItem = ({ item }) => (
    <Box flexDirection="column" mb={6} flex={1}>
      <Box
        alignItems="center"
        mb={6}
        bgColor="gray.100"
        borderRadius="sm"
        p={10}
      >
        <Text
          lineHeight={35}
          style={{
            fontSize: 34,
            textAlign: "center",
            fontFamily: "Hoefler Text",
          }}
        >
          {item.quote}
        </Text>
      </Box>
      <Box flexDirection="row" alignItems="center">
        <AuthorThumbnail author={item.author} size="xs" mr={2} />
        <Box flex={1}>
          <Text fontWeight="bold">{item.author}</Text>
          <Text fontSize={12}>{item.biography}</Text>
        </Box>
      </Box>
    </Box>
  );

  return (
    <FlatList
      data={quotes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<Text>No quotes to display.</Text>}
    />
  );
};

export default QuoteList;
