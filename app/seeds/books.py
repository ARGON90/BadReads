from app.models import db, Book
from books_list import books_list


# print(books_list)
def seed_books():
    b_list= []

    books_list_make = [b_list.append(Book(
        title=book['title'],
        author=book['author'],
        year=book['year'],
        image_url=book['image_url'],
        description=book['description']
    )) for book in books_list]

    b_list_add = [db.session.add(book_instance) for book_instance in b_list]

    db.session.commit()



# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_books():
    db.session.execute('TRUNCATE books RESTART IDENTITY CASCADE;')
    db.session.commit()
