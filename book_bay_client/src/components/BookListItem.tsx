import { TfiTrash } from "react-icons/tfi";
import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { Book } from "../types";

type Props = {
    book: Book;
};

const REMOVE_BOOK = gql`
  mutation removeBook($removeBookId: ID) {
    removeBook(id: $removeBookId) {
      id
      title
    }
  }
`;

function BookListItem({ book }: Props) {
    const [removeBook, { data, loading, error }] = useMutation(REMOVE_BOOK);

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        removeBook({
            variables: {
                removeBookId: book.id,
            },
        });
    };

    if (data) {
        return (
            <article>
                <p>Removed "{data.removeBook.title}" from library!</p>
            </article>
        );
    }

    return (
        <article className="book-list-item">
            <Link to={`/book/${book.id}`}>
                <h2>{book.title}</h2>
            </Link>
            <Link to={`/author/${book.author.id}`}>
                <p>{book.author.name}</p>
            </Link>
            <button onClick={handleRemove}>
                <TfiTrash />
            </button>
        </article>
    );
}

export default BookListItem;