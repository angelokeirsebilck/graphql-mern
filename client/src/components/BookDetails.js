import React from 'react';
import { useQuery, gql } from '@apollo/client';

const BOOK_QUERY = gql`
    query GetBook($id: ID!) {
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;

const BookDetails = ({ id }) => {
    const { loading, error, data } = useQuery(BOOK_QUERY, {
        variables: { id },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p></p>;

    if (data.book) {
        return (
            <div>
                <h2>{data.book.name}</h2>
                <p>{data.book.genre}</p>
                <p>{data.book.author.name}</p>
                <p>All books by this author:</p>
                <ul className='other-books'>
                    {data.book.author.books.map((item) => {
                        return <li key={item.id}>{item.name}</li>;
                    })}
                </ul>
            </div>
        );
    } else {
        return <div>No book selected...</div>;
    }
};

export default BookDetails;
