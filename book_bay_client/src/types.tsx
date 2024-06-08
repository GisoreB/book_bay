type Author = {
    id: string;
    name: string;
    birth_year: number | null;
    nationality: string | null;
    books: [Book] | [];
};

type Book = {
    id: string;
    title: string;
    year: number;
    author: Author;
};

export type { Author, Book };