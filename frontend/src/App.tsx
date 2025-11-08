import { Contact } from "lucide-react"
import BookForm from "./components/BookForm"
import Hero from "./components/Hero"
import MenuDisplay from "./components/MenuDisplay"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

function App() {

  return (
    <>
      <NavBar />
      <Hero />
      <MenuDisplay />
      <BookForm />
      <Contact />
      <Footer />
    </>
  )
}

export default App
