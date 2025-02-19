import React, { useEffect, useState } from "react";
import Gradient from "@/assets/Icons/Gradient";
import { Box } from "@/components/ui/box";
import { ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { useURL } from "expo-linking";
import * as Linking from 'expo-linking';
import axios from 'axios';
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { ModalError } from "@/components/modal/ModalError";
import { VStack } from "@/components/ui/vstack";

interface AuthResponse {
  authUrl: string;
}

export default function Home() {

  //Modal
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  //------AUTHENTICATION SECTION------ 
  const url = useURL();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!url || isAuthenticated) {
      console.log('No URL received || Already authenticated');
      return;
    }

    // Extract the parameters from the URL
    const { queryParams } = Linking.parse(url);
    // Check if the URL contains the authorization code
    if (queryParams?.code) {
      const authorizationCode = queryParams.code;

      const fetchToken = async () => {
        try {
          await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/auth/callback?code=${authorizationCode}`);
          setIsAuthenticated(true);
          router.navigate("./tabs/tabs/home", { relativeToDirectory: true });
        } catch (error: any) {
          const errorResponse = error?.response?.data?.message || error.message;
          setErrorMessage(errorResponse);
          setShowModal(true);
          console.log("Erreur lors de l'authentification :", errorResponse);
        }
      };
      fetchToken();
    }
  }, [url]);

  const getAuthenticationURL = async () => {
    console.log('Going to authentication page');
    try {
      // Get the authentication URL from the API
      const response = await axios.get<AuthResponse>(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`);
      // Redirect to the authentication page
      Linking.openURL(response.data.authUrl);
    } catch (error: any) {
      setShowModal(true);  
      setErrorMessage("Network Error");
    }
  };

  return (
    <Box className="flex-1 bg-black h-[100vh]">
      <ModalError showModal={showModal} setShowModal={setShowModal} errorMessage={errorMessage} />
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Background Gradient */}
        <Box className="absolute h-[500px] w-[500px] lg:w-[700px] lg:h-[700px]">
          <Gradient />
        </Box>
        <Box className="flex flex-1 items-center justify-center my-16 mx-5 lg:my-24 lg:mx-32 gap-8">
          {/* Card Container */}
          <Box className="w-full max-w-lg p-6 bg-white rounded-xl shadow-lg self-center">
            <VStack space="md" className="items-center">
              <Text size="xl" className="text-gray-800 font-extrabold text-center">
                Welcome to Swifty Companion
              </Text>
              <Text size="md" className="text-gray-800 font-medium text-center">
                Find your mates at 42!
              </Text>
              <Button
                className="bg-black"
                size="xl"
                onPress={getAuthenticationURL}
              >
                <Text size="md" className="text-white font-medium">
                  Authenticate
                </Text>
              </Button>
            </VStack>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
