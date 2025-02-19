import { VStack } from "../ui/vstack";
import { Heading } from "../ui/heading";
import { Box } from "@/components/ui/box";
import { Avatar } from "../ui/avatar";
import { Icon } from "../ui/icon";
import { Meh } from "lucide-react-native";
import { Center } from "../ui/center";

export default function StudentNotFoundCard() {
    return (
        <Center className="flex-1">
            <Box className="w-72 p-6 bg-white rounded-xl shadow-lg self-center">
                {/* Avatar + Student Info */}
                <VStack space="md" className="items-center justify-center w-full">
                    <Avatar className="bg-black">
                        <Icon as={Meh} size="xl" className="stroke-white" />
                    </Avatar>
                    <Heading size="xl" className="text-center font-bold">
                        No Buddy Here
                    </Heading>
                </VStack>
            </Box>
        </Center>
    );
}