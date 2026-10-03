import { FruitProvider } from '@/context/FruitContext';
import { Stack } from 'expo-router';
import { PokemonProvider } from '../context/PokemonContext';

export default function RootLayout() {
  return (
    <PokemonProvider>
      <FruitProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </FruitProvider>
    </PokemonProvider>
  );
}