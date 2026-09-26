import { useContext } from 'react'
import { NavigationContext } from '@/components/NavigationProvider'

export function useNavigation() {
  return useContext(NavigationContext)
}