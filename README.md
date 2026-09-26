# 📱 Pokédex Móvil — Desarrollo en Ambientes Móviles

Aplicación móvil tipo Pokédex desarrollada como proyecto para la asignatura **Desarrollo en Ambientes Móviles**. Permite buscar un Pokémon por nombre o número y consultar su imagen, tipos, altura, peso y movimientos.

## 🧩 Arquitectura

El proyecto está dividido en dos componentes independientes:

┌─────────────────┐ ┌──────────────────────┐ ┌───────────────┐
│ App Móvil │ HTTP │ Microservicio Node │ HTTP │ PokeAPI │
│ (Expo / RN) │ ─────► │ (Express) │ ─────► │ (pública) │
└─────────────────┘ └──────────────────────┘ └───────────────┘


- El **front** (app móvil) nunca consulta directamente la PokeAPI. Envía la búsqueda a nuestro propio backend.
- El **backend (microservicio)** recibe la petición, consulta la PokeAPI pública, transforma la respuesta a un formato simplificado y se la devuelve al front.
- Esto desacopla el front de la API externa: si mañana cambia la PokeAPI, solo se ajusta el microservicio.

### Frontend
- **Framework:** [Expo](https://expo.dev) + React Native
- **Lenguaje:** TypeScript
- **Navegación:** Expo Router (file-based routing) con tabs (`Buscar` / `Info`)
- **Manejo de estado global:** React Context API (`PokemonContext`), para compartir entre pantallas el Pokémon buscado sin pasar props ni repetir llamadas al backend
- **UI:** componentes nativos de React Native + `@expo/vector-icons` + `react-native-svg` para los íconos de tipo

### Backend (microservicio propio)
- **Framework:** [Express](https://expressjs.com/) sobre Node.js
- **Función:** expone un único endpoint `GET /api/pokemon/:query` que recibe el nombre o número del Pokémon, consulta `https://pokeapi.co/api/v2/pokemon/:query`, normaliza la respuesta (imagen, tipos, movimientos, altura, peso) y la retorna en JSON al front
- **CORS:** habilitado con el paquete `cors` para permitir las peticiones desde la app móvil

## 📲 Pantallas y Context

| Pantalla | Contenido |
|---|---|
| **Buscar** | Barra de búsqueda, imagen del Pokémon, nombre y tipos |
| **Info** | Altura, peso y lista de movimientos del Pokémon buscado |

Ambas pantallas consumen el mismo `PokemonContext`: la pantalla **Buscar** dispara la búsqueda contra el microservicio y guarda el resultado en el contexto; la pantalla **Info** solo lee ese estado, sin volver a pedir datos.

## 🚀 Cómo correr el proyecto

### 1. Backend (microservicio)

```bash
cd pokemon-microservice
npm install
npm start
```

El servidor queda escuchando en `http://localhost:3000`.

### 2. Frontend (app móvil)

Antes de correr la app, configura la IP local de tu máquina en `src/constants/api.ts`:

```ts
export const API_BASE_URL = 'http://TU_IP_LOCAL:3000';
```

> El celular y el PC deben estar en la misma red Wi-Fi. Usa `10.0.2.2` en vez de tu IP si pruebas en el emulador de Android Studio.

Luego:

```bash
npm install
npx expo start
```

En la salida podrás abrir la app en:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## 🛠️ Stack completo

| Capa | Tecnología |
|---|---|
| Frontend | Expo, React Native, TypeScript, Expo Router, Context API |
| Backend | Node.js, Express, CORS |
| Fuente de datos | [PokeAPI](https://pokeapi.co/) (consumida únicamente por el backend) |

## 🎓 Contexto académico

Proyecto desarrollado para la asignatura **Desarrollo en Ambientes Móviles**, con el objetivo de implementar una arquitectura de microservicio propio como intermediario entre el cliente móvil y una API pública, además del uso de Context API para el manejo de estado compartido entre pantallas.
