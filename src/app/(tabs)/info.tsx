import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TypeBadge from '../../components/typeBadge';
import { PIRATE } from '../../constants/theme';
import { usePokemon } from '../../context/PokemonContext';
import { PokemonStats } from '../../types/pokemon';

  const STAT_LABELS: [keyof PokemonStats, string][] = [
  ['hp', 'PS'], ['attack', 'Ataque'], ['defense', 'Defensa'],
  ['specialAttack', 'At. Esp.'], ['specialDefense', 'Def. Esp.'], ['speed', 'Velocidad'],
];

export default function InfoScreen() {
  const { pokemon } = usePokemon();

  if (!pokemon) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Ionicons name="map-outline" size={70} color={PIRATE.cardBorder} />
        <Text style={styles.emptyText}>
          Busca un Pokémon en la pestaña "Pokémon" para ver su información.
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
            <Ionicons name="resize-outline" size={20} color={PIRATE.bloodRed} />
            <Text style={styles.statLabel}>Altura</Text>
            <Text style={styles.statValue}>
              {typeof pokemon.height === 'number' ? `${(pokemon.height / 10).toFixed(1)} m` : 'NA'}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBlock}>
            <Ionicons name="barbell-outline" size={20} color={PIRATE.bloodRed} />
            <Text style={styles.statLabel}>Peso</Text>
            <Text style={styles.statValue}>
              {typeof pokemon.weight === 'number' ? `${(pokemon.weight / 10).toFixed(1)} kg` : 'NA'}
            </Text>
          </View>
        </View>

        {/* Stats base */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Estadísticas base</Text>
          {STAT_LABELS.map(([key, label]) => (
            <View key={key} style={styles.statRow}>
              <Text style={styles.statRowLabel}>{label}</Text>
              <Text style={styles.statRowValue}>{pokemon.stats[key]}</Text>
              <View style={styles.barBg}>
                <View style={[styles.barFill, { width: `${Math.min(pokemon.stats[key] / 255, 1) * 100}%` }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Diferencia sexual */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Diferencia sexual</Text>
          {pokemon.hasGenderDifference && pokemon.imageFemale ? (
            <View style={styles.formsRow}>
              <View style={styles.formItem}>
                {pokemon.image && <Image source={{ uri: pokemon.image }} style={styles.formImage} />}
                <Text style={styles.formLabel}>♂ Macho</Text>
              </View>
              <View style={styles.formItem}>
                <Image source={{ uri: pokemon.imageFemale }} style={styles.formImage} />
                <Text style={styles.formLabel}>♀ Hembra</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.emptyNote}>Este Pokémon no tiene diferencia sexual.</Text>
          )}
        </View>

        {/* Formas alternas */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Formas alternas</Text>
          {pokemon.hasAlternateForms && pokemon.forms.length > 0 ? (
            <View style={styles.formsRow}>
              {pokemon.forms.map((f) => (
                <View key={f.name} style={styles.formItem}>
                  <Image source={{ uri: f.image }} style={styles.formImage} />
                  <Text style={styles.formLabel}>{f.name.replace(`${pokemon.name}-`, '')}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyNote}>Este Pokémon no tiene formas alternas.</Text>
          )}
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
                color={moveName === 'NA' ? PIRATE.cardBorder : PIRATE.inkSoft}
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
  safeArea: { flex: 1, backgroundColor: PIRATE.parchment },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: PIRATE.parchment },
  emptyText: { marginTop: 12, color: PIRATE.inkFaded, textAlign: 'center', fontSize: 15 },
  content: { padding: 20 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  nameText: { fontSize: 24, fontWeight: 'bold', color: PIRATE.ink, textTransform: 'capitalize' },
  idText: { fontSize: 18, fontWeight: '600', color: PIRATE.inkFaded },
  typesRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  statsCard: {
    flexDirection: 'row', backgroundColor: PIRATE.parchmentLight, borderRadius: 16, padding: 16,
    marginBottom: 16, borderWidth: 1, borderColor: PIRATE.cardBorder,
  },
  statBlock: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: PIRATE.cardBorder, marginHorizontal: 8 },
  statLabel: { fontSize: 13, color: PIRATE.inkFaded, marginTop: 4 },
  statValue: { fontSize: 16, fontWeight: 'bold', color: PIRATE.ink, marginTop: 2 },
  movesCard: { backgroundColor: PIRATE.parchmentLight, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: PIRATE.cardBorder },
  sectionTitle: {
    fontSize: 14, fontWeight: 'bold', color: PIRATE.inkFaded, marginBottom: 10,
    textTransform: 'uppercase', letterSpacing: 0.5,
  },
  moveRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: PIRATE.border },
  moveRowLast: { borderBottomWidth: 0 },
  moveText: { fontSize: 15, color: PIRATE.inkSoft, marginLeft: 8, textTransform: 'capitalize' },
  moveTextNA: { color: PIRATE.inkFaded, fontStyle: 'italic', textTransform: 'none' },
  sectionCard: { backgroundColor: PIRATE.parchmentLight, borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: PIRATE.cardBorder },

  statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  statRowLabel: { width: 80, fontSize: 13, color: PIRATE.inkSoft },
  statRowValue: { width: 36, fontSize: 14, fontWeight: 'bold', color: PIRATE.ink },
  barBg: { flex: 1, height: 8, borderRadius: 4, backgroundColor: PIRATE.border },
  barFill: { height: 8, borderRadius: 4, backgroundColor: PIRATE.bloodRed },
  formsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  formItem: { alignItems: 'center', marginBottom: 12, width: '45%' },
  formImage: { width: 110, height: 110, resizeMode: 'contain' },
  formLabel: { fontSize: 13, color: PIRATE.inkSoft, marginTop: 4, textTransform: 'capitalize' },
  emptyNote: { color: PIRATE.inkFaded, fontStyle: 'italic' },
});