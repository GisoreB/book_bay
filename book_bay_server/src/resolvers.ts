import { Database, Entity } from "fakebase";

const db = new Database("./data/");
const booksTable = db.table("books");
const authorsTable = db.table("authors");

interface Book extends Entity {
    title: string;
    authorId: string;
}

interface Author extends Entity {
    id: string;
    name: string;
    birth_year: number;
    books: [Book];
}

const resolvers = {
    Mutation: {
        addBook: async (_, args: { title: string; authorName: string; year: number }) => {
            const existingBooks = await booksTable.findAll((book: Book) => {
                return book.title.toLowerCase() === args.title.toLowerCase();
            });

            const existingAuthor = await authorsTable.findOne((author: Author) => {
                return author.name.toLowerCase() === args.authorName.toLowerCase();
            });

            if (existingBooks && existingAuthor) {
                const sameBook = existingBooks.find((book: Book) => book.authorId === existingAuthor.id);
                if (sameBook) {
                    return sameBook;
                }
            }

            let authorIdString = "";
            if (existingAuthor) {
                authorIdString = existingAuthor.id;
            } else {
                const newAuthor = await authorsTable.create({ name: args.authorName });
                authorIdString = newAuthor.id;
            }

            return await booksTable.create({
                title: args.title,
                year: args.year,
                authorId: authorIdString,
            });
        },
        removeBook: async (_, args: { id: string }) => await booksTable.delete(args.id),
    },
    Query: {
        book: async (_, args: { id: string }) => await booksTable.findById(args.id),
        books: async () => await booksTable.findAll(),
        booksByTitle: async (_, args: { title: string }) => {
            return await booksTable.findAll((book: Book) => {
                return book.title.toLowerCase().includes(args.title.toLowerCase());
            });
        },
        author: async (_, args: { id: string }) => await authorsTable.findById(args.id),
        authors: async () => await authorsTable.findAll(),
        authorsByName: async (_, args: { name: string }) => {
            return await authorsTable.findAll((author: Author) => {
                return author.name.toLowerCase().includes(args.name.toLowerCase());
            });
        },
    },
    Book: {
        author: async (parent: { authorId: string }) => await authorsTable.findById(parent.authorId),
    },
    Author: {
        books: async (parent: { id: string }) =>
            await booksTable.findAll((book: Book) => book.authorId === parent.id),
    },
};

export default resolvers;