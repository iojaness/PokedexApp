import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { getTypeColor, getTypeIconUrl } from '../constants/pokemonTypes';

interface TypeBadgeProps {
  type: string;
}

export default function TypeBadge({ type }: TypeBadgeProps) {
  const backgroundColor = getTypeColor(type);
  const iconUrl = getTypeIconUrl(type);

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <SvgUri width={16} height={16} uri={iconUrl} />
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
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 6,
    letterSpacing: 0.5,
  },
});