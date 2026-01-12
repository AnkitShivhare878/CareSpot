import { Stack, useRouter } from "expo-router";
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext, useEffect } from 'react';

const RootStack = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      router.replace('/(dashboard)/dashboard-screen');
    } else {
      router.replace('/(auth)/auth-screen');
    }
  }, [isAuthenticated, isLoading]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/auth-screen" options={{ headerShown: false }} />
      <Stack.Screen name="(dashboard)/dashboard-screen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
}
