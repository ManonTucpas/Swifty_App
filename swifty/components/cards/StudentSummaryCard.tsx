import { useStudent } from '@/context/StudentContext';
import { VStack } from '../ui/vstack';
import { Avatar, AvatarFallbackText, AvatarImage } from '../ui/avatar';
import { Text } from "@/components/ui/text"
import { HStack } from '../ui/hstack';
import { Heading } from '../ui/heading';
import { Button, ButtonIcon, ButtonText } from '../ui/button';
import { router } from 'expo-router';
import { ArrowUpRight } from "lucide-react-native"
import { Box } from '../ui/box';

export default function StudentSummaryCard() {
    const { student } = useStudent();

    if (!student || !student.id) {
        return null;
    }

    const navigateToProfile = () => {
        router.push("/tabs/(tabs)/profile");
    };

    return (
        <Box className="w-full max-w-lg p-6 bg-white rounded-xl shadow-lg self-center">
            <VStack space="lg" className="items-center justify-center w-full">
                {/* Section Title */}
                <Text size="lg" className="font-semibold text-muted-foreground">
                    Profile
                </Text>

                {/* Avatar + Student Info */}
                <VStack space="md" className="items-center justify-center w-full">
                    <Avatar size="xl">
                        <AvatarFallbackText>{student.first_name[0]}{student.last_name[0]}</AvatarFallbackText>
                        <AvatarImage source={{ uri: student.image }} />
                    </Avatar>
                    <VStack space="sm" className="items-center justify-center">
                        <Heading size="md" className="text-center font-bold">
                            {student.first_name} {student.last_name}
                        </Heading>
                        <Text size="md" className="text-center text-muted-foreground">
                            {student.login}
                        </Text>
                    </VStack>
                </VStack>

                {/* Profile Button */}
                <HStack space="md" className="items-center justify-center w-full">
                    <Button onPress={navigateToProfile} action="secondary" className="flex-row items-center px-4 py-2">
                        <ButtonText>See profile</ButtonText>
                        <ButtonIcon as={ArrowUpRight} className="ml-2" />
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
}