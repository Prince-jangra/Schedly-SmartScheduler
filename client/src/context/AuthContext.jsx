import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  const login = useCallback((newToken, user) => {
    localStorage.setItem('token', newToken)
    if (user != null) {
      localStorage.setItem('user', JSON.stringify(user))
    }
    setToken(newToken)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
  }, [])

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [token, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
