import { useMemo, useState } from 'react'

export interface HeadlessOption {
  label: string
  value: string
}

export function useHeadlessSelect(options: HeadlessOption[], initialValues: string[] = []) {
  const [values, setValues] = useState<string[]>(initialValues)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query) return options
    const q = query.toLowerCase()
    return options.filter((option) => option.label.toLowerCase().includes(q))
  }, [options, query])

  function toggle(value: string): void {
    setValues((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  return { values, setValues, filtered, query, setQuery, toggle }
}
