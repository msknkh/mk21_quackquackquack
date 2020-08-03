import numpy as np
import pandas as pd
from flask import jsonify
from app import app, db, ma 
from app.models import Atms, BankMitras, Banks, PostOffices, CSCs

fin_touch_pt_1=['ATM','BM']
fin_touch_pt_2=['Bank','PO','CSC']

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

def haversine_distance(lat1,lon1,lat2,lon2):
    r = 6371
    phi1=np.radians(lat1)
    phi2=np.radians(lat2)
    delta_phi=np.radians(lat2-lat1)
    delta_lamba=np.radians(lat2-lat1)
    a=np.sin(delta_phi/2)**2 + np.cos(phi1)*np.cos(phi2)*np.sin(delta_lamba/2)**2
    res=r*(2*np.arctan2(np.sqrt(a),np.sqrt(1-a)))
    print(res)
    return np.round(res,5)

def grid_sieve(df_lat_long,lat,longi,fin_touch_pt):
    lat_low_1=lat-0.1
    lat_low_2=lat-0.25
    lat_high_1=lat+0.1
    lat_high_2=lat+0.25
    long_low_1=longi-0.1
    long_low_2=longi-0.25
    long_high_1=longi+0.1
    long_high_2=longi+0.25

   
    if fin_touch_pt in fin_touch_pt_1:
        df_lat_long=df_lat_long[(df_lat_long['latitude']>lat_low_1) & (df_lat_long['latitude']<lat_high_1) & (df_lat_long['longitude']>long_low_1) & (df_lat_long['longitude']<long_high_1)]
    else:
        df_lat_long=df_lat_long[(df_lat_long['latitude']>lat_low_2) & (df_lat_long['latitude']<lat_high_2) & (df_lat_long['longitude']>long_low_2) & (df_lat_long['longitude']<long_high_2)]
    
    return df_lat_long

def dist_sieve(df_lat_long,lat,longi,fin_touch_pt):
    distances_km = []
    for row in df_lat_long.itertuples(index=False):
        distances_km.append(haversine_distance(lat,longi, row.latitude, row.longitude))

    df_lat_long['user_distance']=distances_km
    
    if fin_touch_pt in fin_touch_pt_1:
       df_lat_long=df_lat_long[df_lat_long['user_distance']<10]
    else:
       df_lat_long=df_lat_long[df_lat_long['user_distance']<25]

    return df_lat_long

def get_data(fin_touch_pt):
    if fin_touch_pt=='Atms':
       atm_list = Atms.query.all()
       result = atms_schema.dump(atm_list)
    elif(fin_touch_pt == 'Banks'):
       bank_list = Banks.query.all()
       result = banks_schema.dump(bank_list)
    elif(fin_touch_pt == 'BankMitras'):
       bm_list = BankMitras.query.all()
       result = bankmitras_schema.dump(bm_list)
    elif(fin_touch_pt == 'PostOffices'):
       po_list = PostOffices.query.all()
       result = postoffices_schema.dump(po_list)
    elif(fin_touch_pt == 'CSCs'):
       csc_list = CSCs.query.all()
       result = cscs_schema.dump(csc_list)
    
    df_fetched = pd.DataFrame(result)
    return df_fetched


def nearby(lat,longi,fin_touch_pt):
   df_lat_long=get_data(fin_touch_pt)

    #Filter according to degrees
   df_lat_long=grid_sieve(df_lat_long,float(lat),float(longi),fin_touch_pt)     
   print(df_lat_long)
    #Filter Harvesian Distance 
   df_lat_long=dist_sieve(df_lat_long,float(lat),float(longi),fin_touch_pt)

   return df_lat_long