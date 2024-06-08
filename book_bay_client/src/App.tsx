import { Route, Routes } from "react-router-dom";

import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import AuthorDetails from "./pages/AuthorDetails";
import AddBook from "./pages/AddBook";
import Navbar from "./components/Navbar";
import "./App.scss";

function App() {
    return (
        <div className="App">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/author/:id" element={<AuthorDetails />} />
                    <Route path="/add-book" element={<AddBook />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;