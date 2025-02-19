import { useStudent } from "@/context/StudentContext";
import { Skills } from "@/interface/Student";
import { Text } from "@/components/ui/text";
import { Box } from "../ui/box";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";

export default function StudentSkillsCard() {
    const { cursus } = useStudent();

    return (
        <Box className="w-full max-w-lg p-6 bg-white rounded-xl shadow-lg self-center mt-4">
        <VStack space="md">
          <Text size="lg" className="font-bold text-gray-800">
            Skills
          </Text>
          {cursus?.skills?.map((skill: Skills, index: number) => (
            <VStack key={skill.name} space="xs" className="py-2 flex-1">
            {/* Skill name and numeric level */}
            <HStack className="justify-between">
              <Text size="md" className="text-gray-800 flex-wrap">
                {skill.name}
              </Text>
              <Text size="md" className="text-gray-600">
                {skill.level.toFixed(2)}
              </Text>
            </HStack>
          </VStack>
          ))}
        </VStack>
      </Box>
    );
};
