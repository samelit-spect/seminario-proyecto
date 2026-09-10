import { BrowserRouter, Route, Routes } from 'react-router-dom'

function Home() {
  return <div className="p-8 text-center text-2xl font-bold">TechStore - Home</div>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App