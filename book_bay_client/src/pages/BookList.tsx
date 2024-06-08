import { useQuery, gql } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import BookListItem from "../components/BookListItem";
import { Book } from "../types";

const GET_BOOKS = gql`
  query Query {
    books {
      id
      title
      year
      author {
        id
        name
      }
    }
  }
`;

function BookList() {
    const { loading, error, data, refetch } = useQuery(GET_BOOKS);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        refetch();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchResult = data.books.filter((book: Book) => {
            return (
                book.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                book.author.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
        });
        setFilteredBooks(searchResult);
    };

    const getBooksArray = () => {
        if (searchInputRef.current != null && searchInputRef.current.value.length > 1) {
            return filteredBooks;
        }
        return data.books;
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div>
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search: </label>
                <input
                    onChange={handleSearch}
                    ref={searchInputRef}
                    id="search"
                    type="text"
                    autoComplete="off"
                />
            </form>
            <div className="book-list">
                {getBooksArray().map((book: Book) => (
                    <BookListItem book={book} key={book.id} />
                ))}
            </div>
        </div>
    );
}

export default BookList;