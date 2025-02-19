import { useStudent } from "@/context/StudentContext";
import { Box } from "../ui/box";
import { VStack } from "../ui/vstack";
import { Avatar, AvatarFallbackText, AvatarImage } from "../ui/avatar";
import { Heading } from "../ui/heading";
import { Text } from "@/components/ui/text";
import { HStack } from "../ui/hstack";
import { Award, Wallet as WalletIcon } from "lucide-react-native";

export default function StudentDetailsCard() {
    const { student, cursus } = useStudent();

    if (!student || !student.id) {
        return null;
    }

    return (
        <Box className="w-full max-w-lg p-6 bg-white rounded-xl shadow-lg self-center">
            <VStack space="lg" className="items-center justify-center w-full">
                {/* Avatar and basic info */}
                <HStack space="md" className="items-center justify-between">
                    <Avatar size="xl">
                        <AvatarFallbackText>
                            {student.first_name[0]}
                            {student.last_name[0]}
                        </AvatarFallbackText>
                        <AvatarImage source={{ uri: student.image }} />
                    </Avatar>
                    <VStack space="sm" className="items-center justify-center">
                        <Heading size="md" className="text-center font-bold">
                            {student.first_name} {student.last_name}
                        </Heading>
                        <Text size="md" className="text-center text-muted-foreground">
                            {student.email}
                        </Text>
                        <Text size="md" className="text-center text-muted-foreground">
                            {student.login}
                        </Text>
                    </VStack>
                </HStack>

                {/* Correction Points and Wallet with Icons */}
                <HStack space="md" className="w-72 mt-4 justify-center">
                    {/* Correction Points Card */}
                    <HStack className="items-center justify-between p-2 bg-white rounded-xl shadow-sm">
                        <HStack space="sm" className="items-center">
                            <Box className="p-2 bg-blue-100 rounded-full">
                                <Award size={16} color={"black"} />
                            </Box>
                            <Text size="md" className="font-semibold text-gray-800">
                                {student.correction_point} Points
                            </Text>
                        </HStack>
                    </HStack>

                    {/* Wallet Card */}
                    <HStack className="items-center justify-between p-2 bg-white rounded-xl shadow-sm">
                        <HStack space="sm" className="items-center">
                            <Box className="p-2 bg-blue-100 rounded-full">
                                <WalletIcon size={16} color="black" />
                            </Box>
                            <Text size="md" className="font-semibold text-gray-800">
                                {student.wallet} ₳
                            </Text>
                        </HStack>
                    </HStack>
                </HStack>
                {/* Level Bar */}
                <Box className="w-72 mt-4">
                    {/* Level header */}
                    <Box className="flex flex-row justify-between mb-1 ml-2 mr-2">
                        <Text size="sm" className="font-semibold text-gray-700">
                            Level {cursus?.level}
                        </Text>
                        <Text size="sm" className="font-semibold text-gray-700">
                            {cursus?.percentage}%
                        </Text>
                    </Box>

                    {/* Progress bar */}
                    <Box className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                        <Box
                            className="h-full bg-black rounded-full"
                            style={{ width: `${cursus?.level ? ((cursus?.level / 21) * 100) : 0}%` }}
                        />
                    </Box>
                </Box>
            </VStack >
        </Box >
    );
};