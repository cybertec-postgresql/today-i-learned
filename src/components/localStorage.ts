import { useState, useEffect } from "react"

export const useLocalStorage = <V>(
  key: string,
  initialValue: V
): [V, (value: V) => void] => {
  const [storedValue, setValue] = useState<V>(initialValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)

      setValue(item !== null ? JSON.parse(item) : initialValue)
    } catch (e) {
      console.log(e)
    }
  })

  const setLocalStorage = (value: V) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))

      setValue(value)
    } catch (e) {
      console.error(e)
    }
  }

  return [storedValue, setLocalStorage]
}
