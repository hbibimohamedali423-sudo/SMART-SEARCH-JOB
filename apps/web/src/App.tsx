import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLanguageDir } from '@/lib/i18n'

import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/features/home/pages/HomePage'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const dir = getLanguageDir(i18n.language)
    document.documentElement.dir = dir
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App
