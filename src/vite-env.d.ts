/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENMAP_WEATHER_API_KEY: string
  readonly VITE_OPENMAP_API_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 