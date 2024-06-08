import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Book } from "../types";

const GET_AUTHOR = gql`
  query Query($authorId: ID) {
    author(id: $authorId) {
      name
      birth_year
      nationality
      books {
        id
        title
      }
    }
  }
`;

function AuthorDetails() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_AUTHOR, {
        variables: {
            authorId: id,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <section className="author-details">
            <h1>{data.author.name}</h1>
            {data.author.birth_year && <p>Birth year: {data.author.birth_year}</p>}
            {data.author.nationality && <p>Nationality: {data.author.nationality}</p>}
            <br />
            <h2>All books by author:</h2>
            <ul>
                {data.author.books.map((book: Book) => (
                    <li key={book.id}>
                        <Link to={`/book/${book.id}`}>{book.title}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default AuthorDetails;