import Ionicons from '@expo/vector-icons/Ionicons';
import {
    ActivityIndicator, Image, KeyboardAvoidingView, Platform,
    ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FruitTypeBadge from '../../components/fruitTypeBadge';
import { PIRATE } from '../../constants/theme';
import { useFruit } from '../../context/FruitContext';

export default function FruitSearchScreen() {
  const { query, setQuery, fruit, loading, errorMsg, searchFruit } = useFruit();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="skull-outline" size={26} color={PIRATE.goldLight} />
          <Text style={styles.headerTitle}>Registro de Akuma no Mi</Text>
        </View>
        <Ionicons name="nutrition-outline" size={24} color={PIRATE.goldLight} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.screenContent} keyboardShouldPersistTaps="handled">
          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              placeholder="Ej: Mera Mera o 82"
              placeholderTextColor={PIRATE.inkFaded}
              value={query}
              onChangeText={setQuery}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              onSubmitEditing={searchFruit}
            />
            <TouchableOpacity style={styles.button} onPress={searchFruit} disabled={loading}>
              <Ionicons name="search" size={22} color={PIRATE.parchmentLight} />
            </TouchableOpacity>
          </View>

          <View style={styles.imageBox}>
            {loading ? (
              <ActivityIndicator size="large" color={PIRATE.bloodRed} />
            ) : fruit?.image ? (
              <Image source={{ uri: fruit.image }} style={styles.image} />
            ) : (
              <Ionicons name="skull-outline" size={90} color={PIRATE.cardBorder} />
            )}
          </View>

          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

          {fruit && (
            <>
              <View style={styles.nameRow}>
                <Text style={styles.nameText}>{fruit.name}</Text>
                <Text style={styles.idText}>#{String(fruit.id).padStart(3, '0')}</Text>
              </View>

              <View style={styles.typesRow}>
                <FruitTypeBadge type={fruit.type} />
              </View>

              <Text style={styles.hintText}>Ve a la pestaña "Info Fruta" para ver más detalles.</Text>
            </>
          )}

          {!fruit && !loading && !errorMsg && (
            <Text style={styles.hintText}>
              Busca una Fruta del Diablo por nombre o número para descubrir sus poderes.
            </Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: PIRATE.woodDark },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: PIRATE.woodDark, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20,
    borderBottomWidth: 2, borderBottomColor: PIRATE.gold,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { color: PIRATE.goldLight, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  screenContent: {
    backgroundColor: PIRATE.parchment, borderTopLeftRadius: 28, borderTopRightRadius: 28,
    flexGrow: 1, padding: 20, paddingBottom: 40,
  },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  input: {
    flex: 1, backgroundColor: PIRATE.parchmentLight, borderWidth: 1, borderColor: PIRATE.border,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginRight: 10, fontSize: 16,
    color: PIRATE.ink,
  },
  button: { width: 46, height: 46, borderRadius: 23, backgroundColor: PIRATE.bloodRed, justifyContent: 'center', alignItems: 'center' },
  imageBox: {
    backgroundColor: PIRATE.parchmentLight, borderRadius: 20, height: 220, justifyContent: 'center',
    alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: PIRATE.cardBorder,
  },
  image: { width: '85%', height: '85%', resizeMode: 'contain' },
  errorText: { color: PIRATE.bloodRed, textAlign: 'center', marginBottom: 12, fontSize: 15 },
  hintText: { color: PIRATE.inkFaded, textAlign: 'center', marginTop: 24, fontSize: 15, paddingHorizontal: 10 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  nameText: { fontSize: 22, fontWeight: 'bold', color: PIRATE.ink },
  idText: { fontSize: 18, fontWeight: '600', color: PIRATE.inkFaded },
  typesRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
});