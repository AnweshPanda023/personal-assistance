import { auth } from "@/src/firebaseConfig";
import { Stack } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfigParams,
} from "react-native-toast-message";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const toastConfig = {
    success: (props: ToastConfigParams<any>) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "green", height: 70 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 18,
          fontWeight: "600",
        }}
        text2Style={{
          fontSize: 14,
        }}
      />
    ),

    error: (props: ToastConfigParams<any>) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: "red", height: 70 }}
        text1Style={{
          fontSize: 18,
          fontWeight: "600",
        }}
        text2Style={{
          fontSize: 14,
        }}
      />
    ),
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="(auth)/login" />
        )}
      </Stack>

      <Toast config={toastConfig} />
    </>
  );
}
