import { gql, useMutation } from "@apollo/client";
import React, { useRef } from "react";

const ADD_BOOK = gql`
  mutation Mutation($title: String, $year: Int, $authorName: String) {
    addBook(title: $title, year: $year, authorName: $authorName) {
      title
    }
  }
`;

function AddBook() {
    const [addBook, { data, loading, error }] = useMutation(ADD_BOOK);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const authorInputRef = useRef<HTMLInputElement>(null);
    const yearInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Add some validation tests

        if (titleInputRef.current && authorInputRef.current && yearInputRef.current) {
            addBook({
                variables: {
                    title: titleInputRef.current.value,
                    authorName: authorInputRef.current.value,
                    year: parseInt(yearInputRef.current.value),
                },
            });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <section className="add-book">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input ref={titleInputRef} required id="title" type="text" />
                <label htmlFor="author">Author: </label>
                <input ref={authorInputRef} required id="author" type="text" />
                <label htmlFor="year">Published year: </label>
                <input
                    ref={yearInputRef}
                    required
                    id="year"
                    type="number"
                    min={0}
                    max={new Date().getFullYear()}
                />
                <button type="submit">Submit</button>
            </form>
            <p className="info-message">{data ? `Added: "${data.addBook.title}" to library!` : ""}</p>
        </section>
    );
}

export default AddBook;