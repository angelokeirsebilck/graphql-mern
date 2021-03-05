import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

const AUTHORS_QUERY = gql`
    query GetAuthors {
        authors {
            name
            id
        }
    }
`;

const AddBook = () => {
    const { loading, error, data } = useQuery(AUTHORS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <form id='add-book'>
            <div className='field'>
                <label>Book name:</label>
                <input type='text' />
            </div>
            <div className='field'>
                <label>Genre:</label>
                <input type='text' />
            </div>
            <div className='field'>
                <label>Author:</label>
                <select>
                    <option>Select author</option>
                    {data.authors.map((author) => {
                        return <option>{author.name}</option>;
                    })}
                </select>
            </div>
            <button>+</button>
        </form>
    );
};

export default AddBook;
