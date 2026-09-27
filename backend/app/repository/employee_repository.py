from sqlalchemy.orm import Session,joinedload
from sqlalchemy import asc,desc
from app.models.employee import Employee
# from app.schemas.employee import EmployeeCreate
def create_employee(new_employee:Employee,db:Session):
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee

def update_employee(employee:Employee,db):
    db.commit()
    db.refresh(employee)
    return employee

def update_employee_status(employee,db):
    db.commit()
    db.refresh(employee)
    return employee


def delete_employee(employee,employee_id ,db):
    db.delete(employee)
    db.commit()
    return {"message":"Employee deleted successfully",
            "employee_id":employee_id}

def update_profile_image(employee,filename,db):
    employee.profile_image=filename
    db.commit()
    db.refresh(employee)
    return employee

def get_employee_by_code(employee:Employee,db:Session):
    return db.query(Employee).filter(Employee.employee_code==employee.employee_code).first()

def get_employee_by_email(employee:Employee,db:Session):
    return db.query(Employee).filter(Employee.email==employee.email).first()

def get_employee_by_id(employee_id:int,db:Session):
    return db.query(Employee).filter(Employee.id==employee_id).first()

def get_all_employee(db:Session):
    return db.query(Employee).all()

def get_all_employee_with_department(db):
    return db.query(Employee).options(joinedload(Employee.department)).all()

def search_eployee(search,db):
    return db.query(Employee).filter(Employee.first_name.ilike(f"%{search}%")).all()

def limit_employee(skip,limit,db):
    return db.query(Employee).offset(skip).limit(limit).all()

def sort_empolyee(order,db):
    if order =="desc":
        return db.query(Employee).order_by(desc(Employee.salary)).all()
    return db.query(Employee).order_by(asc(Employee.salary)).all()