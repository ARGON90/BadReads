// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllBooksThunk } from '../store/booksAlex';

// const BookById = () => {
//     console.log('INSIDE BOOKS LIST COMPONENT')

//     const dispatch = useDispatch();
//     const booksList = useSelector((state) => Object.values(state?.books))

//     useEffect(() => {
//         console.log('BOOKS LIST USE EFFECT')
//         dispatch(getAllBooksThunk())
//     }, [dispatch])

//     if (booksList.length < 1) return <div>Loading All Books...</div>
//     return (
//         <>
//             <h1>All Books List: </h1>
//             {booksList.map((book) =>
//                 <div key={book.id}>
//                     <img src={book.image_url} alt='Cover' style={{height: '100px'}}/>
//                     <div>{book.title}</div>
//                     <div>{book.author}</div>
//                 </div>

//             )}
//         </>
//     );
// }

// export default BookById;
