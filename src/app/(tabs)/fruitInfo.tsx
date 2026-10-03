import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FruitTypeBadge from '../../components/fruitTypeBadge';
import { PIRATE } from '../../constants/theme';
import { useFruit } from '../../context/FruitContext';

export default function FruitInfoScreen() {
  const { fruit } = useFruit();

  if (!fruit) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Ionicons name="map-outline" size={70} color={PIRATE.cardBorder} />
        <Text style={styles.emptyText}>
          Busca una Fruta del Diablo en la pestaña "Frutas" para ver su información.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.nameText}>{fruit.name}</Text>
          <Text style={styles.idText}>#{String(fruit.id).padStart(3, '0')}</Text>
        </View>

        <View style={styles.typesRow}>
          <FruitTypeBadge type={fruit.type} />
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statBlock}>
            <Ionicons name="language-outline" size={20} color={PIRATE.bloodRed} />
            <Text style={styles.statLabel}>Nombre original</Text>
            <Text style={styles.statValue}>
              {fruit.romanName !== 'NA' ? fruit.romanName : 'NA'}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="flash-outline" size={14} color={PIRATE.inkFaded} /> Poder de la fruta
          </Text>
          <Text style={styles.descriptionText}>{fruit.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: PIRATE.parchment },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: PIRATE.parchment },
  emptyText: { marginTop: 12, color: PIRATE.inkFaded, textAlign: 'center', fontSize: 15 },
  content: { padding: 20 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  nameText: { fontSize: 22, fontWeight: 'bold', color: PIRATE.ink, flexShrink: 1, paddingRight: 8 },
  idText: { fontSize: 18, fontWeight: '600', color: PIRATE.inkFaded },
  typesRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  statsCard: {
    flexDirection: 'row', backgroundColor: PIRATE.parchmentLight, borderRadius: 16, padding: 16,
    marginBottom: 16, borderWidth: 1, borderColor: PIRATE.cardBorder,
  },
  statBlock: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: 13, color: PIRATE.inkFaded, marginTop: 4 },
  statValue: { fontSize: 16, fontWeight: 'bold', color: PIRATE.ink, marginTop: 2, textAlign: 'center' },
  descriptionCard: { backgroundColor: PIRATE.parchmentLight, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: PIRATE.cardBorder },
  sectionTitle: {
    fontSize: 14, fontWeight: 'bold', color: PIRATE.inkFaded, marginBottom: 10,
    textTransform: 'uppercase', letterSpacing: 0.5,
  },
  descriptionText: { fontSize: 15, color: PIRATE.inkSoft, lineHeight: 22 },
});