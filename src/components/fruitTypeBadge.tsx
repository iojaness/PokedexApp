import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { getFruitTypeColor, getFruitTypeIcon } from '../constants/fruitTypes';

interface FruitTypeBadgeProps {
  type: string;
}

export default function FruitTypeBadge({ type }: FruitTypeBadgeProps) {
  const backgroundColor = getFruitTypeColor(type);
  const iconName = getFruitTypeIcon(type);

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Ionicons name={iconName as any} size={16} color="#FBF3DD" />
      <Text style={styles.label}>{type.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(251, 243, 221, 0.4)',
  },
  label: {
    color: '#FBF3DD',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 6,
    letterSpacing: 0.5,
  },
});