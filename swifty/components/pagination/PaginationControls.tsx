import { AntDesign } from "@expo/vector-icons";
import React, { FC } from "react";
import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";
import { ArrowLeft, ArrowRight } from "lucide-react-native";


interface Props {
    pagination: {
        page: number;
        length: number;
        pageSize: number;
        setPage: (page: number) => void;
    }
}

const PaginationControls: FC<Props> = ({ pagination }) => {

    const isPrevDisabled = pagination.page === 1;
    const isNextDisabled = pagination.length < pagination.pageSize;

    return (
        <Box className="w-full mt-4">
            <HStack space="md" className="items-center justify-center">
                <Pressable
                    onPress={() => pagination.setPage(pagination.page - 1)}
                    disabled={isPrevDisabled}
                >
                    <Box
                        className={`p-1 rounded-full ${isPrevDisabled ? "bg-gray-300" : "bg-black"
                            }`}
                    >
                        <ArrowLeft size={20} color="white" />
                    </Box>
                </Pressable>

                <Text size="md" className="font-semibold text-gray-800">
                    Page {pagination.page}
                </Text>

                <Pressable
                    onPress={() => pagination.setPage(pagination.page + 1)}
                    disabled={isNextDisabled}
                >
                    <Box
                        className={`p-1 rounded-full ${isNextDisabled ? "bg-gray-300" : "bg-black"
                            }`}
                    >
                        <ArrowRight size={20} color="white" />
                    </Box>
                </Pressable>
            </HStack>
        </Box>
    );
}

export default PaginationControls;