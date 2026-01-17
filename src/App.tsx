import { Routes, Route } from 'react-router-dom'
import Home from "@/pages/Home"
import Account from "@/pages/Account"
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <Toaster position="bottom-right" />
    </>
  )
}

export default App
