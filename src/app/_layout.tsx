import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function RootLayout() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
