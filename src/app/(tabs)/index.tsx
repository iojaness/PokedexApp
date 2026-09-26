import Ionicons from '@expo/vector-icons/Ionicons';
import {
  ActivityIndicator, Image, KeyboardAvoidingView, Platform,
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TypeBadge from '../../components/typeBadge';
import { usePokemon } from '../../context/PokemonContext';

const POKEDEX_RED = '#E3350D';

export default function SearchScreen() {
  const { query, setQuery, pokemon, loading, errorMsg, searchPokemon } = usePokemon();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.lensRing}>
          <View style={styles.lensInner} />
        </View>
        <View style={styles.dotsRow}>
          <View style={[styles.dot, { backgroundColor: '#F44336' }]} />
          <View style={[styles.dot, { backgroundColor: '#FFEB3B' }]} />
          <View style={[styles.dot, { backgroundColor: '#4CAF50' }]} />
        </View>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.screenContent} keyboardShouldPersistTaps="handled">
          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              placeholder="Ej: pikachu o 25"
              placeholderTextColor="#888"
              value={query}
              onChangeText={setQuery}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              onSubmitEditing={searchPokemon}
            />
            <TouchableOpacity style={styles.button} onPress={searchPokemon} disabled={loading}>
              <Ionicons name="search" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.imageBox}>
            {loading ? (
              <ActivityIndicator size="large" color={POKEDEX_RED} />
            ) : pokemon?.image ? (
              <Image source={{ uri: pokemon.image }} style={styles.image} />
            ) : (
              <Ionicons name="help-circle-outline" size={90} color="#CFD8DC" />
            )}
          </View>

          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

          {pokemon && (
            <>
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

              <Text style={styles.hintText}>Ve a la pestaña "Info" para ver más detalles.</Text>
            </>
          )}

          {!pokemon && !loading && !errorMsg && (
            <Text style={styles.hintText}>
              Busca un Pokémon por nombre o número para ver su información.
            </Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: POKEDEX_RED },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: POKEDEX_RED, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20,
  },
  lensRing: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  lensInner: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#4FD3E8' },
  dotsRow: { flexDirection: 'row' },
  dot: { width: 14, height: 14, borderRadius: 7, marginLeft: 8 },
  screenContent: {
    backgroundColor: '#F5F7FA', borderTopLeftRadius: 28, borderTopRightRadius: 28,
    flexGrow: 1, padding: 20, paddingBottom: 40,
  },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  input: {
    flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E0E0E0',
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginRight: 10, fontSize: 16,
  },
  button: { width: 46, height: 46, borderRadius: 23, backgroundColor: POKEDEX_RED, justifyContent: 'center', alignItems: 'center' },
  imageBox: {
    backgroundColor: '#fff', borderRadius: 20, height: 220, justifyContent: 'center',
    alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#E8ECF0',
  },
  image: { width: '85%', height: '85%', resizeMode: 'contain' },
  errorText: { color: POKEDEX_RED, textAlign: 'center', marginBottom: 12, fontSize: 15 },
  hintText: { color: '#8A94A0', textAlign: 'center', marginTop: 24, fontSize: 15, paddingHorizontal: 10 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  nameText: { fontSize: 24, fontWeight: 'bold', color: '#263238', textTransform: 'capitalize' },
  idText: { fontSize: 18, fontWeight: '600', color: '#B0B8C1' },
  typesRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
});