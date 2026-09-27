from app.models.department import Department
from sqlalchemy.orm import Session
def create_department(department:Department,db:Session):
    db.add(department)
    db.commit()
    db.refresh(department)
    return department

def delete_department(department:Department,department_id,db:Session):
    db.delete(department)
    db.commit()
    return {"message":f"Department{department_id} deleted successfully"}

def update_departments(department:Department,db):
    db.commit()
    db.refresh(department)
    return department

def get_all_department(db:Session):
    return db.query(Department).all()

def get_department_by_id(department_id,db:Session):
    return db.query(Department).filter(Department.id==department_id).first()

def get_department_by_name(department_name,db:Session):
    return db.query(Department).filter(Department.department_name==department_name).first()