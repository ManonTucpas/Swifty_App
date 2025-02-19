import { FC } from "react";
import { StudentProjects } from "@/interface/Student";
import Pagination from "@/interface/Pagination";
import PaginationControls from "../pagination/PaginationControls";
import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { CircleCheck, CircleX } from "lucide-react-native";

interface Props {
    studentProjects: StudentProjects[];
    pagination: Pagination;
}

const StudentProjectsCard: FC<Props> = ({ studentProjects, pagination }) => {

    if (!studentProjects) {
        console.log("Student Projects is null");
        return null;
    }

    return (
        <Box className="w-full max-w-lg p-6 bg-white rounded-xl shadow-lg self-center mt-4">
            <VStack space="md">
                {/* Header */}
                <Text size="lg" className="font-bold text-gray-800">
                    Projects
                </Text>
                {/* Project List */}
                {studentProjects.map((item) => (
                    <Box
                        key={item.id}
                        className="py-3 border-b border-gray-200 last:border-b-0"
                    >
                        <HStack className="justify-between items-center">
                            <VStack space="xs" className="flex-1">

                                <Text size="md" className="font-semibold text-gray-800  break-words">
                                    {item.project_name}
                                </Text>
                                <Text size="md" className="text-gray-600">
                                    {item.final_mark !== null ? item.final_mark : "N/A"}
                                </Text>
                            </VStack>
                            <Box>
                                {item.validated ? (
                                    <CircleCheck size={24} color="green" />
                                ) : (
                                    <CircleX size={24} color="red" />
                                )}
                            </Box>
                        </HStack>
                    </Box>
                ))}

                {/* Pagination Controls */}
                <Box className="mt-4">
                    <PaginationControls
                        pagination={{
                            page: pagination.page,
                            length: pagination.length,
                            pageSize: pagination.pageSize,
                            setPage: pagination.setPage,
                        }}
                    />
                </Box>
            </VStack>
        </Box>
    );
};

export default StudentProjectsCard;