import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from '@/routes/__root'
import { ComingSoon } from '@/routes/coming-soon'
import { Home } from '@/routes/index'

/**
 * Every page of the site. A page is a file in src/routes; it is listed here
 * with its address. Addresses that have no page yet fall through to ComingSoon.
 */
export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<ComingSoon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
