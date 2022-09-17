from app.models.review import db, Review

def seed_reviews():
  for i in range(46):
    db.session.add(Review(
      user_id=1,
      book_id=i+1,
      review="This book was great.",
      stars=4
    ))

  db.session.commit()

def undo_reviews():
  db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
  db.session.commit()
