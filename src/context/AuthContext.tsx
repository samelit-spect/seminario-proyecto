import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { Usuario } from '../types'
import { auth } from '../services/firebaseClient'

interface AuthContextValue {
  usuario: Usuario | null
  cargando: boolean
  login: (email: string, password: string) => Promise<void>
  registro: (nombre: string, email: string, password: string) => Promise<void>
  loginConGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [cargando, setCargando] = useState(true)

  // Escucha cambios de sesión
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fireUser) => {
      if (fireUser) {
        setUsuario({
          uid: fireUser.uid,
          nombre: fireUser.displayName || fireUser.email?.split('@')[0] || 'Usuario',
          email: fireUser.email || '',
          rol: 'cliente',
        })
      } else {
        setUsuario(null)
      }
      setCargando(false)
    })
    return () => unsub()
  }, [])

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const registro = async (nombre: string, email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (nombre) await updateProfile(cred.user, { displayName: nombre })
  }

  const loginConGoogle = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
  }

  const logout = async () => {
    await signOut(auth)
  }

  const value = useMemo<AuthContextValue>(
    () => ({ usuario, cargando, login, registro, loginConGoogle, logout }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [usuario, cargando]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}