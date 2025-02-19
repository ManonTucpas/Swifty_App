import StudentDetailsCard from "@/components/cards/StudentDetailsCard";
import StudentNotFoundCard from "@/components/cards/StudentNotFoundCard";
import StudentProjectsCard from "@/components/cards/StudentProjectsCard";
import StudentSkillsCard from "@/components/cards/StudentSkillsCard";
import { ModalError } from "@/components/modal/ModalError";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useStudent } from "@/context/StudentContext";
import { StudentProjects } from "@/interface/Student";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('');
  // Student
  const { student } = useStudent();
  const [studentProjects, setStudentProjects] = useState<StudentProjects[] | null>(null);
  // Pagination
  const [page, setPage] = useState<number>(1);
  const pageSize = 5;

  // Fetch the student's projects
  const getProjects = async () => {
    if (!student || !student.id) {
      return;
    }
    try {
      const response = await axios.get<StudentProjects[]>(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${student.id}/projects`,
        {
          params: {
            page: page,
            pageSize: pageSize,
          }
        }
      )
      setStudentProjects(
        response.data
      );
    }
    catch (error: any) {
      const errorResponse = error.response.data.message ? error.response.data.message : error.message;
      setErrorMessage(errorResponse);
      setShowModal(true);
    }
  }

  // Fetch projects whenever the student or page changes.
  useEffect(() => {
    if (!student?.id) return;
    // Adding a delay to avoid conflict with the previous request
    setTimeout(() => {
      getProjects();
    }, 1000);
  }, [student?.id, page]);

  // Reset the page to 1 when the student changes.
  useEffect(() => {
    if (!student?.id) return;
    setPage(1);
  }, [student?.id]);

  if (!student || !student.id) {
    return (
      <StudentNotFoundCard />
    )
  }

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
          <VStack space="md" className="items-center pb-4">
            <Heading className="font-bold text-3xl text-center">Your 42 Buddy</Heading>
            <Text className="text-lg text-muted-foreground text-center">
              Student details, cursus and projects.
            </Text>
          </VStack>
          {/* Profile Image && Student Information */}
          <StudentDetailsCard />
          {/* Skills */}
          <StudentSkillsCard />
          {/* Projects */}
          {studentProjects && <StudentProjectsCard studentProjects={studentProjects} pagination={{
            page: page,
            length: studentProjects?.length | 0,
            pageSize: pageSize,
            setPage: setPage,
          }}
          />}
        </Box>
      </ScrollView>
    </Center>

  );
}
