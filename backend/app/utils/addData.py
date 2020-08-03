from app.models import Atms, Banks, BankMitras, PostOffices, CSCs
from app import db
from app.utils.getJSON import getJSONFromFile

def update_data():
    atm_entries = []
    data = getJSONFromFile('Atms')
    for atm in data["atm_details"]:
        new_entry = Atms(atm_code=atm['atm_code'],
                        bank_name=atm['bank_name'],
                        address=atm['address'],
                        city=atm['city'],
                        pincode=atm['pincode'],
                        district=atm['district'],
                        state=atm['state'],
                        rating=atm['rating'],
                        total_rating=atm['total_rating'],
                        latitude=atm['latitude'],
                        longitude=atm['longitude'],
                        non_functional_cnt=atm['non_functional_cnt'],
                        img=atm['img']
                        )
        atm_entries.append(new_entry)
    db.session.add_all(atm_entries)
    
    bank_entries = []
    data = getJSONFromFile('Banks')
    for bank in data["bank_details"]:
        new_entry = Banks(ifsc_code=bank['ifsc_code'],
                        bank_name=bank['bank_name'],
                        mobile_no=bank['mobile_no'],
                        address=bank['address'],
                        city=bank['city'],
                        pincode=bank['pincode'],
                        district=bank['district'],
                        state=bank['state'],
                        rating=bank['rating'],
                        total_rating=bank['total_rating'],
                        latitude=bank['latitude'],
                        longitude=bank['longitude'],
                        open_time=bank['open_time'],
                        close_time=bank['close_time'],
                        img=bank['img']
                        )
        bank_entries.append(new_entry)
    db.session.add_all(bank_entries)

    bm_entries = []
    data = getJSONFromFile('BankMitras')
    for bm in data["bm_details"]:
        new_entry = BankMitras(bank_name=bm['bank_name'],
                        bank_mitra_code=bm['bank_mitra_code'],
                        bank_mitra_name=bm['bank_mitra_name'],
                        mobile_no=bm['mobile_no'],
                        address=bm['address'],
                        city=bm['city'],
                        pincode=bm['pincode'],
                        district=bm['district'],
                        state=bm['state'],
                        rating=bm['rating'],
                        total_rating=bm['total_rating'],
                        latitude=bm['latitude'],
                        longitude=bm['longitude'],
                        img=bm['img']
                        )
        bm_entries.append(new_entry)
    db.session.add_all(bm_entries)

    po_entries = []
    data = getJSONFromFile('PostOffices')
    for po in data["po_details"]:
        new_entry = PostOffices(
                        post_office_name=po['post_office_name'],
                        mobile_no=po['mobile_no'],
                        address=po['address'],
                        city=po['city'],
                        pincode=po['pincode'],
                        district=po['district'],
                        state=po['state'],
                        rating=po['rating'],
                        total_rating=po['total_rating'],
                        latitude=po['latitude'],
                        longitude=po['longitude']
                        )
        po_entries.append(new_entry)
    db.session.add_all(po_entries)

    csc_entries = []
    data = getJSONFromFile('CSCs')
    for csc in data["csc_details"]:
        new_entry = CSCs(csc_id=csc['csc_id'],
                        csc_name=csc['csc_name'],
                        address=csc['address'],
                        city=csc['city'],
                        pincode=csc['pincode'],
                        district=csc['district'],
                        state=csc['state'],
                        rating=csc['rating'],
                        total_rating=csc['total_rating'],
                        latitude=csc['latitude'],
                        longitude=csc['longitude']
                        )
        csc_entries.append(new_entry)
    db.session.add_all(csc_entries)
    db.session.commit()

