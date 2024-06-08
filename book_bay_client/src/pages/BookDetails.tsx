import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const GET_BOOK = gql`
  query Query($bookId: ID) {
    book(id: $bookId) {
      title
      year
      author {
        id
        name
      }
    }
  }
`;

function BookDetails() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_BOOK, {
        variables: {
            bookId: id,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <section className="book-details">
            <h1>{data.book.title}</h1>
            <p>
                Author: <Link to={`/author/${data.book.author.id}`}>{data.book.author.name}</Link>
            </p>
            <p>Published year: {data.book.year}</p>
        </section>
    );
}

export default BookDetails;