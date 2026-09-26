"use client"

import { createContext, useContext, useState, useCallback } from 'react'

export const NavigationContext = createContext({
  activeSection: '',
  setActiveSection: (id: string) => {},
})

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState('hero')
  
  const setActive = useCallback((id: string) => {
    setActiveSection(id)
  }, [])
  
  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection: setActive }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => useContext(NavigationContext)