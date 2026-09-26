import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TypeBadge from '../../components/typeBadge';
import { usePokemon } from '../../context/PokemonContext';

const POKEDEX_RED = '#E3350D';

export default function InfoScreen() {
  const { pokemon } = usePokemon();

  if (!pokemon) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Ionicons name="help-circle-outline" size={70} color="#CFD8DC" />
        <Text style={styles.emptyText}>
          Busca un Pokémon en la pestaña "Buscar" para ver su información.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.nameText}>{pokemon.name}</Text>
          <Text style={styles.idText}>#{String(pokemon.id).padStart(3, '0')}</Text>
        </View>

        {pokemon.types.length > 0 && (
          <View style={styles.typesRow}>
            {pokemon.types.map((t) => (
              <TypeBadge key={t} type={t} />
            ))}
          </View>
        )}

        <View style={styles.statsCard}>
          <View style={styles.statBlock}>
            <Ionicons name="resize-outline" size={20} color={POKEDEX_RED} />
            <Text style={styles.statLabel}>Altura</Text>
            <Text style={styles.statValue}>
              {typeof pokemon.height === 'number' ? `${(pokemon.height / 10).toFixed(1)} m` : 'NA'}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBlock}>
            <Ionicons name="barbell-outline" size={20} color={POKEDEX_RED} />
            <Text style={styles.statLabel}>Peso</Text>
            <Text style={styles.statValue}>
              {typeof pokemon.weight === 'number' ? `${(pokemon.weight / 10).toFixed(1)} kg` : 'NA'}
            </Text>
          </View>
        </View>

        <View style={styles.movesCard}>
          <Text style={styles.sectionTitle}>
            Movimientos ({pokemon.moves.filter((m) => m !== 'NA').length})
          </Text>
          {pokemon.moves.map((moveName, index) => (
            <View
              key={`${moveName}-${index}`}
              style={[styles.moveRow, index === pokemon.moves.length - 1 && styles.moveRowLast]}
            >
              <Ionicons
                name={moveName === 'NA' ? 'remove-circle-outline' : 'flash-outline'}
                size={18}
                color={moveName === 'NA' ? '#B0B8C1' : '#555'}
              />
              <Text style={[styles.moveText, moveName === 'NA' && styles.moveTextNA]}>
                {moveName}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F7FA' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emptyText: { marginTop: 12, color: '#8A94A0', textAlign: 'center', fontSize: 15 },
  content: { padding: 20 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  nameText: { fontSize: 24, fontWeight: 'bold', color: '#263238', textTransform: 'capitalize' },
  idText: { fontSize: 18, fontWeight: '600', color: '#B0B8C1' },
  typesRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  statsCard: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, padding: 16,
    marginBottom: 16, borderWidth: 1, borderColor: '#E8ECF0',
  },
  statBlock: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: '#E8ECF0', marginHorizontal: 8 },
  statLabel: { fontSize: 13, color: '#8A94A0', marginTop: 4 },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#263238', marginTop: 2 },
  movesCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E8ECF0' },
  sectionTitle: {
    fontSize: 14, fontWeight: 'bold', color: '#8A94A0', marginBottom: 10,
    textTransform: 'uppercase', letterSpacing: 0.5,
  },
  moveRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F0F2F5' },
  moveRowLast: { borderBottomWidth: 0 },
  moveText: { fontSize: 15, color: '#37474F', marginLeft: 8, textTransform: 'capitalize' },
  moveTextNA: { color: '#B0B8C1', fontStyle: 'italic', textTransform: 'none' },
});