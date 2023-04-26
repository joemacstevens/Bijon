import { useEffect, useState } from "react";
import { Box, Image, Link, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export const AuthorThumbnail = ({ author }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const fetchPhotoUrl = async () => {
      try {
        const response = await axios.get(
          `https://openlibrary.org/search.json?author=${author}`
        );
        const authorId =
          response.data.docs.length > 0
            ? response.data.docs[0].author_key[0]
            : null;
        if (authorId) {
          const photoResponse = await axios.get(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${author.replace(
              " ",
              "_"
            )}`
          );
          setPhotoUrl(photoResponse.data.thumbnail.source);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPhotoUrl();
  }, [author]);

  return (
    <Box mr={4}>
      <Link href={`https://www.google.com/search?q=${author}+author&tbm=isch`}>
        {photoUrl ? (
          <Image
            size="sm" // Change size from "lg" to "md"
            resizeMode="cover"
            source={{ uri: photoUrl }}
            alt={author}
          />
        ) : (
          <Box
            size="sm" // Change size from "md" to "sm"
            height={10} // Change height from 20 to 10
            width={10} // Change width from 20 to 10
            bgColor="gray.200"
            justifyContent="center"
            alignItems="center"
          >
            <Ionicons name="person-circle-outline" size={24} color="black" />
          </Box>
        )}
      </Link>
    </Box>
  );
};
