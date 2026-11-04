import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PhoneFrame } from './components/PhoneFrame'
import { Sheets } from './components/Sheets'
import { landing } from './content/landing'
import { protoPath } from './lib/proto'
import { Day0Connect } from './screens/Day0Connect'
import { Day0Goal } from './screens/Day0Goal'
import { Day1Intro } from './screens/Day1Intro'
import { Day1Sort } from './screens/Day1Sort'
import { Day2Budget } from './screens/Day2Budget'
import { Day3Goal } from './screens/Day3Goal'
import { Day4Recap } from './screens/Day4Recap'
import { Day5Tags } from './screens/Day5Tags'
import { Day6Plans } from './screens/Day6Plans'
import { Day7Fixes } from './screens/Day7Fixes'
import { Hub } from './screens/Hub'
import { CaseStudy } from './screens/CaseStudy'
import { Landing } from './screens/Landing'
import { AppStateProvider, useAppState } from './state/AppState'
import { useEffect } from 'react'

function Toast() {
  const { toast } = useAppState()
  if (!toast) return null
  return (
    <div className="toast" role="status">
      {toast}
    </div>
  )
}

function PageMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title =
      pathname === '/'
        ? landing.meta.title
        : pathname === '/case'
          ? 'Your First Week · unofficial case study'
          : 'Your First Week · unofficial concept'
  }, [pathname])
  return null
}

function PrototypeShell() {
  return (
    <AppStateProvider>
      <PhoneFrame>
        <Routes>
          <Route index element={<Day0Goal />} />
          <Route path="connect" element={<Day0Connect />} />
          <Route path="week" element={<Hub />} />
          <Route path="day/1" element={<Day1Intro />} />
          <Route path="day/1/sort" element={<Day1Sort />} />
          <Route path="day/2" element={<Day2Budget />} />
          <Route path="day/3" element={<Day3Goal />} />
          <Route path="day/4" element={<Day4Recap />} />
          <Route path="day/5" element={<Day5Tags />} />
          <Route path="day/6" element={<Day6Plans />} />
          <Route path="day/7" element={<Day7Fixes />} />
          <Route path="*" element={<Navigate to={protoPath()} replace />} />
        </Routes>
        <Sheets />
        <Toast />
      </PhoneFrame>
    </AppStateProvider>
  )
}

function LegacyPrototypeRedirect() {
  const { pathname, search } = useLocation()
  return <Navigate to={`${protoPath()}${pathname}${search}`} replace />
}

export default function App() {
  return (
    <>
      <PageMeta />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/case" element={<CaseStudy />} />
        <Route path="/prototype/*" element={<PrototypeShell />} />
        <Route path="/connect" element={<LegacyPrototypeRedirect />} />
        <Route path="/week" element={<LegacyPrototypeRedirect />} />
        <Route path="/day/*" element={<LegacyPrototypeRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
