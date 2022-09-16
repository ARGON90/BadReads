# from flask_login import UserMixin
# from flask_sqlalchemy import SQLAlchemy
# from werkzeug.security import generate_password_hash, check_password_hash

# db = SQLAlchemy()


# class User(db.Model, UserMixin):
#     __tablename__ = "users"

#     id = db.Column(db.Integer, primary_key=True, nullable=False)
#     firstName = db.Column(db.String(50), nullable=False)
#     lastName = db.Column(db.String(50), nullable=False)
#     email = db.Column(db.Email, nullable=False, unique=True)
#     # is email a valid type?
#     password = db.Column(db.String(50), nullable=False)
#     created_at = db.Column(db.DateTime(50), nullable=False)
#     updated_at = db.Column(db.DateTime(50), nullable=False)
#     # DateTime or Date?

#     # relationships?
#     # orders = db.relationship("Order", back_populates="employee")

#     @property
#     def password(self):
#         return self.hashed_password

#     @password.setter
#     def password(self, password):
#         self.hashed_password = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password, password)


# class Book(db.Model):
#     __tablename__ = "books"

#     id = db.Column(db.Integer, primary_key=True, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#     bookshelf_id = db.Column(db.Integer, db.ForeignKey("bookshelves.id"), nullable=False)
#     title = db.Column(db.String(50), nullable=False)
#     year = db.Column(db.Integer, nullable=False)
#     author = db.Column(db.String(50), nullable=False)
#     description = db.Column(db.String(1000), nullable=False)
#     title = db.Column(db.String(50), nullable=False)
#     img_url = db.Column(db.String(1000), nullable=False)
#     created_at = db.Column(db.DateTime(50), nullable=False)
#     updated_at = db.Column(db.DateTime(50), nullable=False)
