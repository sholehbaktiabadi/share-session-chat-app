/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PORT: string
    readonly VITE_CHAT_API_URL: string
    readonly VITE_SOCKETIO_HOST: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }