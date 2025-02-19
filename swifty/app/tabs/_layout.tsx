export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

import { StudentProvider } from "@/context/StudentContext";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <StudentProvider>
      <Stack>
        <Stack.Screen name="(tabs)"
          options={{
            headerShown: true,
            title: "Swifty Companion",
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { fontWeight: 'bold', color: 'white'},
          }} />
      </Stack>
    </StudentProvider>
  );
}
