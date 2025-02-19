import StudentSummaryCard from "@/components/cards/StudentSummaryCard";
import { ModalError } from "@/components/modal/ModalError";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useStudent } from "@/context/StudentContext";
import { StudentCursus, StudentDetails } from "@/interface/Student";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Student login
  const [login, setLogin] = useState('');

  // Student Context
  const { student, setStudent } = useStudent() as { student: StudentDetails | null, setStudent: (student: StudentDetails | null) => void };
  const { cursus, setCursus } = useStudent() as { cursus: StudentCursus | null, setCursus: (student: StudentCursus | null) => void };

  //------GET STUDENT DETAILS SECTION------  
  const onChangeText = (text: string) => {
    setLogin(text);
  };

  const onPressGetStudent = async () => {
    setCursus(null);
    setStudent(null);
    if (!login) {
      console.error('Login is empty');
      return;
    }

    // Get student details
    const loginFormatted = login.toLowerCase();

    try {
      const response = await axios.get<StudentDetails>(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${loginFormatted}`,
      )
      setStudent({
        id: response.data.id,
        login: response.data.login,
        email: response.data.email,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        image: response.data.image,
        phone: response.data.phone,
        correction_point: response.data.correction_point,
        wallet: response.data.wallet,
      });
    } catch (error: any) {
      console.log('Error fetching student', error.message);
      const errorResponse = error.response.data.message ? error.response.data.message : error.message;
      setErrorMessage(errorResponse);
      setShowModal(true);
    }
  };

  const getCursus = async () => {

    if (!student) {
      console.error('Student is null');
      return;
    }
    try {
      const response = await axios.get<StudentCursus>(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${student.id}/cursus`,
      )
      setCursus(response.data);
      if (cursus) {
        // To keep
        console.log("Student Cursus: ", cursus.id);
      }
    }
    catch (error: any) {
      const errorResponse = error.response.data.message ? error.response.data.message : error.message;
      setErrorMessage(errorResponse);
      setShowModal(true);
    }
  }

  useEffect(() => {
    if (!student) {
      return;
    }
    getCursus();
  }, [student]);


  return (
    <Center className="flex-1 bg-background">
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Box className="flex flex-1 items-center justify-start my-12 mx-5 lg:my-16 lg:mx-32">
          <ModalError showModal={showModal} setShowModal={setShowModal} errorMessage={errorMessage} />

          {/* Header Section */}
          <VStack space="md" className="items-center">
            <Heading className="font-bold text-3xl text-center">Find Your 42 Buddy</Heading>
            <Text className="text-lg text-muted-foreground text-center">
              Search and connect with other 42 students.
            </Text>
          </VStack>

          {/* Search Section */}
          <Box className="w-full max-w-lg mt-6 p-4 bg-white rounded-xl shadow-lg">
            <VStack space="sm">
              <Text className="font-medium text-lg">Student Search</Text>
              <Input variant="outline" size="md">
                <InputSlot className="pl-3">
                  <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField
                  placeholder="Enter student login..."
                  value={login}
                  onChangeText={onChangeText}
                />
              </Input>
              <Button onPress={onPressGetStudent} size="md" variant="solid" action="primary">
                <ButtonText>Search</ButtonText>
              </Button>
            </VStack>
          </Box>

          {/* Display Student Summary if Found */}
          {student && (
            <Box className="mt-8 w-full max-w-lg">
              <StudentSummaryCard />
            </Box>
          )}
        </Box>
      </ScrollView>
    </Center>
  );
}
