import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { PIRATE } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PIRATE.goldLight,
        tabBarInactiveTintColor: '#A89572',
        tabBarStyle: {
          backgroundColor: PIRATE.woodDark,
          borderTopColor: PIRATE.wood,
          borderTopWidth: 1,
        },
        headerStyle: { backgroundColor: PIRATE.woodDark },
        headerTintColor: PIRATE.goldLight,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pokémon',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Info Poké',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'information-circle' : 'information-circle-outline'}
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="fruit"
        options={{
          title: 'Frutas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'nutrition' : 'nutrition-outline'} color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="fruitInfo"
        options={{
          title: 'Info Fruta',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'book' : 'book-outline'} color={color} size={22} />
          ),
        }}
      />
    </Tabs>
  );
}