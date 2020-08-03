from sqlalchemy import Table, Column, Float, Integer, String
from datetime import datetime, date
from app import db 

class Atms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    atm_code = db.Column(db.String(50), nullable=False)
    bank_name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255))
    city = db.Column(db.String(50))
    pincode = db.Column(db.Integer)
    district = db.Column(db.String(50))
    state = db.Column(db.String(50))
    rating = db.Column(db.Float)
    total_rating = db.Column(db.Integer)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    non_functional_cnt = db.Column(db.Integer)
    img = db.Column(db.String(100))
    feedbacks = db.relationship('AtmFeedback', backref = 'atm', lazy=True)

class AtmFeedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    atm_id = db.Column(db.Integer, db.ForeignKey('atms.id'), nullable=False)
    feedbacks = db.Column(db.String(255), nullable=False)

class Banks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ifsc_code = db.Column(db.String(50), nullable=False)
    bank_name = db.Column(db.String(255), nullable=False)
    mobile_no = db.Column(db.Integer)
    address = db.Column(db.String(255))
    city = db.Column(db.String(50))
    pincode = db.Column(db.Integer)
    district = db.Column(db.String(50))
    state = db.Column(db.String(50))
    rating = db.Column(db.Float)
    total_rating = db.Column(db.Integer)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    open_time = db.Column(db.String(100))
    close_time = db.Column(db.String(100))
    img = db.Column(db.String(100))

class BankMitras(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bank_name = db.Column(db.String(255), nullable=False)
    bank_mitra_code = db.Column(db.String(50), nullable=False)
    bank_mitra_name = db.Column(db.String(255), nullable=False)
    mobile_no = db.Column(db.Integer)
    address = db.Column(db.String(255))
    city = db.Column(db.String(50))
    pincode = db.Column(db.Integer)
    district = db.Column(db.String(50))
    state = db.Column(db.String(50))
    rating = db.Column(db.Float)
    total_rating = db.Column(db.Integer)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    img = db.Column(db.String(100))

class PostOffices(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_office_name = db.Column(db.String(255), nullable=False)
    mobile_no = db.Column(db.Integer)
    address = db.Column(db.String(255))
    city = db.Column(db.String(50))
    pincode = db.Column(db.Integer)
    district = db.Column(db.String(50))
    state = db.Column(db.String(50))
    rating = db.Column(db.Float)
    total_rating = db.Column(db.Integer)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

class CSCs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    csc_id = db.Column(db.String(100), nullable=False)
    csc_name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255))
    city = db.Column(db.String(50))
    pincode = db.Column(db.Integer)
    district = db.Column(db.String(50))
    state = db.Column(db.String(50))
    rating = db.Column(db.Float)
    total_rating = db.Column(db.Integer)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

class AtmRequests(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    distance = db.Column(db.Float, nullable=False)
    pincode = db.Column(db.Integer, nullable=False)

class AtmRequests_by_pincode(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    pin_code=db.Column(db.Integer,nullable=False)
    number_of_requests=db.Column(db.Integer,nullable=False)
    avg_dist=db.Column(db.Float,nullable=False)



