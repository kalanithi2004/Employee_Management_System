from fastapi import HTTPException,status,File,UploadFile
import os,shutil
from app.models.employee import Employee
from app.repository.employee_repository import( create_employee,get_all_employee,
                                               get_employee_by_code,search_eployee,
                                               get_employee_by_email,delete_employee,
                                               get_employee_by_id, update_employee,
                                               limit_employee,sort_empolyee,
                                               update_profile_image,update_employee_status)
def add_employee(new_employee,db):
    if get_employee_by_email(new_employee,db):
        raise HTTPException(
            status_code=status.HTTP_409_BAD_REQUEST,
            detail="Email already exists"
        )
    if get_employee_by_code(new_employee,db):
        raise HTTPException(
            status_code=status.HTTP_409_BAD_REQUEST,
            detail="Employee code already exists"
        )
    employee=Employee(
        employee_code=new_employee.employee_code,
        first_name=new_employee.first_name,
        last_name=new_employee.last_name,
        email=new_employee.email,
        phone=new_employee.phone,
        salary=new_employee.salary,
        designation=new_employee.designation,
        department_id=new_employee.department_id,
        date_of_joining=new_employee.date_of_joining
    )
    return create_employee(employee,db)

def fetch_all_employee(db):
    return get_all_employee(db)

def fetch_employee_id(employee_id,db):
    employee= get_employee_by_id(employee_id,db)
    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    return employee

def update_employee_id(employee_id,updateemployee,db):
    employee=get_employee_by_id(employee_id,db)
    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    employee.first_name=updateemployee.first_name,
    employee.last_name=updateemployee.last_name,
    employee.email=updateemployee.email,   
    employee.phone=updateemployee.phone,
    employee.designation=updateemployee.designation,
    employee.salary=updateemployee.salary,
    employee.department_id=updateemployee.department_id
        
    return update_employee(employee,db)

def change_employee_status(employee_id,db):
    employee=get_employee_by_id(employee_id,db)
    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    employee.is_active = not employee.is_active 
    return update_employee_status(employee,db)
    
def delete_employee_id(employee_id,db):
    employee=get_employee_by_id(employee_id,db)
    if employee is None:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )
    return delete_employee(employee,employee_id,db)

def search_employees(search:str,db):
    return search_eployee(search,db)

def fetch_limit_employee(skip,limit,db):
    return limit_employee(skip,limit,db)
        
def sort_empolyees(order,db):
    return sort_empolyee(order,db)

async def upload_employee_image(employee_id,file,db):
    employee=get_employee_by_id(employee_id,db)
    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    allowed_extensions=[".jpg",".jpeg",".png"]
    extension=os.path.splitext(file.filename)[1].lower()
    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_NOT_FOUND,
            detail="Only JPG, JPEG and PNG files are allowed"
        ) 
    contents= await file.read()
    if len(contents) > 2*1024 *1024:
        raise HTTPException(
            status_code=status.HTTP_400_NOT_FOUND,
            detail="File size must be less than 2 MB"
        )
    file.file.seek(0)

    if employee.profile_image:
        old_file = f"uploads/{employee.profile_image}"
        if os.path.exists(old_file):
            os.remove(old_file)
    file_path=f"uploads/{file.filename}"
    with open(file_path,"wb") as buffer:
        shutil.copyfileobj(file.file,buffer)

    return update_profile_image(employee,file.filename,db)

