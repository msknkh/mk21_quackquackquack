import json
import requests
from flask import Blueprint, jsonify, request
from app import app, db, ma, cors
from app.models import Atms, Banks, BankMitras, PostOffices, CSCs, AtmRequests, AtmFeedback
from app.utils.getJSON import getJSONFromFile
from app.utils import function
from app.utils.addData import update_data

main = Blueprint('main', __name__)

class AtmSchema(ma.Schema):
  class Meta:
    fields = ('id', 'atm_code', 'bank_name', 'address', 'city', 'pincode', 'district', 'state', 'rating', 'total_rating',
             'latitude', 'longitude', 'non_functional_cnt', 'img')

class BankSchema(ma.Schema):
  class Meta:
    fields = ('id', 'ifsc_code', 'bank_name', 'mobile_no', 'address', 'city', 'pincode', 'district', 'state', 'rating', 'total_rating',
             'latitude', 'longitude', 'open_time', 'close_time', 'img')

class BankMitraSchema(ma.Schema):
  class Meta:
    fields = ('id', 'bank_name', 'bank_mitra_code', 'bank_mitra_name', 'mobile_no','address', 'city', 'pincode', 'district', 'state', 'rating', 'total_rating',
             'latitude', 'longitude', 'img')

class PostOfficeSchema(ma.Schema):
  class Meta:
    fields = ('id', 'post_office_name', 'mobile_no', 'address', 'city', 'pincode', 'district', 'state', 'rating', 'total_rating',
             'latitude', 'longitude', 'img')

class CSCSchema(ma.Schema):
  class Meta:
    fields = ('id', 'csc_id', 'csc_name', 'address', 'city', 'pincode', 'district', 'state', 'rating', 'total_rating',
             'latitude', 'longitude', 'img')

class AtmRequestSchema(ma.Schema):
  class Meta:
    fields = ('id', 'latitude', 'longitude', 'distance', 'pincode')

atm_schema = AtmSchema()
atms_schema = AtmSchema(many=True)

bank_schema = BankSchema()
banks_schema = BankSchema(many=True)

bankmitra_schema = BankMitraSchema()
bankmitras_schema = BankMitraSchema(many=True)

postoffice_schema = PostOfficeSchema()
postoffices_schema = PostOfficeSchema(many=True)

csc_schema = CSCSchema()
cscs_schema = CSCSchema(many=True)

atmrequest_schema = AtmRequestSchema()
atmrequests_schema = AtmRequestSchema(many=True)

@main.route("/")
def helloWorld():
  return "Hello, cross-origin-world!"

@main.route('/show/<touch_pt_name>',methods=['GET'])
def fin_touch_pt_disp(touch_pt_name):
    fin_touch_pt_str=touch_pt_name
    print(request.query_string)
    lat=request.args.get('latitude')
    longi=request.args.get('longitude')

    df_lat_long=function.nearby(lat,longi,fin_touch_pt_str)
    print(fin_touch_pt_str)
    data = df_lat_long.to_json(orient="index")
    res = json.loads(data)
    print(type(res))
    json_list = []

    for key, value in res.items():
        json_list.append(value)

    return jsonify(json_list)

@main.route('/withdraw', methods=['GET'])
def withdraw():
    lat=request.args.get('latitude')
    longi=request.args.get('longitude')
    df_atms = function.nearby(lat,longi,"atms")
    df_banks =  function.nearby(lat,longi,"banks")
    df_bankmitras = function.nearby(lat,longi,"bankmitras")
    json_list = []

    data = df_atms.to_json(orient="index")
    res = json.loads(data)

    for key, value in res.items():
        json_list.append(value)

    data = df_banks.to_json(orient="index")
    res = json.loads(data)

    for key, value in res.items():
        json_list.append(value)

    data = df_bankmitras.to_json(orient="index")
    res = json.loads(data)

    for key, value in res.items():
        json_list.append(value)

    return jsonify(json_list)

@main.route('/deposit', methods=['GET'])
def deposit():
    lat=request.args.get('latitude')
    longi=request.args.get('longitude')
    df_bankmitras = function.nearby(lat,longi,"bankmitras")
    df_po = function.nearby(lat,longi,"postoffices")
    json_list = []

    data = df_bankmitras.to_json(orient="index")
    res = json.loads(data)

    for key, value in res.items():
        json_list.append(value)

    data = df_po.to_json(orient="index")
    res = json.loads(data)

    for key, value in res.items():
        json_list.append(value)

    return jsonify(json_list)

@main.route('/update_rating', methods=['POST'])
def update_rating():
    req_data = request.get_json()
    name = req_data['name']
    Id = req_data['id']
    rating = req_data['rating']
    feedback = req_data['feedback']

    if(name == "Atm"):
      isNonfunctional = req_data['nonfunctional']
      data = Atms.query.filter_by(id = Id).first()
      if(isNonfunctional):
        data.non_functional_cnt += 1
      newFeedback = AtmFeedback(atm_id = Id, feedbacks = feedback)
      db.session.add(newFeedback)
    elif(name == 'Bank'):
      data = Banks.query.filter_by(id = Id).first()
    elif(name == 'PostOffice'):
      data = PostOffices.query.filter_by(id = Id).first()
    elif(name == 'BankMitra'):
      data = BankMitras.query.filter_by(id = Id).first()
    elif(name == 'CSC'):
      data = CSCs.query.filter_by(id = Id).first()

    new_rating = (data.total_rating * data.rating + rating)/(data.total_rating + 1)
    data.total_rating = data.total_rating + 1
    data.rating = new_rating

    db.session.commit()
    return "Updated"

@main.route('/AtmRequest', methods=['POST'])
def makeAtmRequest():
    req_data = request.get_json()
    lat = req_data['latitude']
    longi = req_data['longitude']
    dist = req_data['distance']
    URL = 'https://revgeocode.search.hereapi.com/v1/revgeocode?at=' + str(lat) + ',' + str(longi) + '&apikey=OwndCFRt10BJiEJFbKHyLfeN2vDahEi3PtNJVquM3G4'
    resp = requests.get(url = URL)
    data = resp.json()
    pin = data['items'][0]['address']['postalCode']

    if(pin != '' or pin != null):
      new_request = AtmRequests(latitude=lat, longitude=longi, distance=dist, pincode = pin)
      db.session.add(new_request)
      db.session.commit()

    req_list = AtmRequests.query.all()
    res = atmrequests_schema.dump(req_list)
    return jsonify(res)


@main.route('/addData', methods=['GET'])
def addData():
    update_data()
    return "Added Successfully"

@main.route('/<touch_pt_name>', methods=['GET'])
def getData(touch_pt_name):
     if(touch_pt_name == 'Atms'):
      atm_list = Atms.query.all()
      result = atms_schema.dump(atm_list)
      return jsonify(result)
     elif(touch_pt_name == 'Banks'):
      bank_list = Banks.query.all()
      result = banks_schema.dump(bank_list)
      return jsonify(result)
     elif(touch_pt_name == 'BankMitras'):
      bm_list = BankMitras.query.all()
      result = bankmitras_schema.dump(bm_list)
      return jsonify(result)
     elif(touch_pt_name == 'PostOffices'):
      po_list = PostOffices.query.all()
      result = postoffices_schema.dump(po_list)
      return jsonify(result)
     elif(touch_pt_name == 'CSCs'):
      csc_list = CSCs.query.all()
      result = cscs_schema.dump(csc_list)
      return jsonify(result)
   

