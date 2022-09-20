from app.models.book import db, Book
from app.models.bookshelf import db,Bookshelf
from .books_list import books_list


# print(books_list)
def seed_books_bookshelves():
    b_list= []

    books_list_make = [b_list.append(Book(
        title=book['title'],
        author=book['author'],
        year=book['year'],
        image_url=book['image_url'],
        user_id=1,
        description=book['description'],
        banned=book['banned']
    )) for book in books_list]

    have_read_1 = Bookshelf(
      user_id=1,
      default=True,
      name="Have Read"
    )
    currently_reading_1 = Bookshelf(
      user_id=1,
      default=True,
      name="Currently Reading"
    )
    will_read_1 = Bookshelf(
      user_id=1,
      default=True,
      name="Will Read"
    )
    have_read_2 = Bookshelf(
      user_id=2,
      default=True,
      name="Have Read"
    )
    currently_reading_2 = Bookshelf(
      user_id=2,
      default=True,
      name="Currently Reading"
    )
    will_read_2 = Bookshelf(
      user_id=2,
      default=True,
      name="Will Read"
    )
    have_read_3 = Bookshelf(
      user_id=3,
      default=True,
      name="Have Read"
    )
    currently_reading_3 = Bookshelf(
      user_id=3,
      default=True,
      name="Currently Reading"
    )
    will_read_3 = Bookshelf(
      user_id=3,
      default=True,
      name="Will Read"
    )
    demo_shelf = Bookshelf(
        user_id=1,
        default=False,
        name="Demo Shelf"
    )
    test_shelf = Bookshelf(
        user_id=1,
        default=False,
        name="Test Shelf"
    )

    # Joining books to bookshelves
    bookshelves_list = [have_read_1,will_read_2,currently_reading_3,demo_shelf,test_shelf]

    for bookshelf in bookshelves_list:
        bookshelf.books.append(b_list[0])

    # Joining additional books to demos
    demo_list = [demo_shelf, test_shelf]

    for demo in demo_list:
        demo.books.append(b_list[10])
        demo.books.append(b_list[30])
        demo.books.append(b_list[7])

    # Adding books
    b_list_add = [db.session.add(book_instance) for book_instance in b_list]

    # Adding bookshelves
    bookshelves_list_2 = [have_read_1, will_read_2, currently_reading_3,
                        have_read_2, will_read_3, currently_reading_1,
                        have_read_3, will_read_1, currently_reading_2,
                        demo_shelf, test_shelf]

    bookshelves_list_add = [db.session.add(bookshelf_instance) for bookshelf_instance in bookshelves_list_2]

    db.session.commit()



# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_books_bookshelves():
    db.session.execute('TRUNCATE books RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE bookshelves RESTART IDENTITY CASCADE;')
    db.session.commit()
