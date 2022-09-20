import { useEffect, useState } from "react"
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooksThunk } from '../../store/booksAlex'
import '../CSS/SearchBar.css'

const SearchBookBar = ({ setSearchBar}) => {
    
    const history = useHistory()
    const dispatch = useDispatch()
    const books = useSelector(state => state.books)
    const [filterBooks, setFilterBooks] = useState([])
    const [searchable, setSearchable] = useState('')

    useEffect(() => {
        const fetchBooks = async () => {
            await dispatch(getAllBooksThunk())
        }
        fetchBooks().catch(console.error)
    }, [dispatch])

    const handleBookFilter = (e) => {
        const findBook = e.target.value
        setSearchable(findBook)
        const findTitle = Object.values(books).filter(book => {
            return book.title.toLowerCase().includes(findBook.toLowerCase())
        })
        if (findBook === '') {
            setFilterBooks([])
        } else {
            setFilterBooks(findTitle)
        }
    }


    const handleSubmit = () => {
        history.push(`/books/${searchable}`)
        setFilterBooks([])
        setSearchBar(false)
    }

    return (
        <div className='searchBarDiv'>
            <form className='searchBarInput'
                onSubmit={handleSubmit}>
                <input
                type='text'
                value={searchable}
                onChange={handleBookFilter}
                placeholder='Search books'
                />
            </form>
    
        <div className='bookResultsDiv'>
            {filterBooks && (
                filterBooks.slice(0, 5).map((book, idx) => (
                    <NavLink to={`/books/${book.id}`}>
                        <div className='searchBookBarResult'
                            key={idx} 
                            onClick={() => setSearchBar(false)}>
                                <div className="searchBarTitle">{book.title} <br></br></div>
                                <div className='searchBarAuthor'>by {book.author}</div>
                            </div>
                    </NavLink>
                ))
            )}
        </div>
        </div>
    )
}

export default SearchBookBar
