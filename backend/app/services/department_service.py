from fastapi import HTTPException,status
from app.models.department import Department
from app.repository.department_repository import (create_department,
                        delete_department,update_departments,
                        get_all_department,get_department_by_id,
                        get_department_by_name)

def new_department(department,db):
    if get_department_by_name(department,db):
        raise HTTPException(
            status_code=status.HTTP_409_BAD_REQUEST,
            detail="department_name already exists"
        )
    new_department=Department(
        department_name=department.department_name,
        description=department.description
    )
    return create_department(new_department,db)

def get_departments(db):
    return get_all_department(db)

def get_department_id(department_id,db):
    department=get_department_by_id(department_id,db)
    if department is None:
         raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="department not found"
        )
    return department

def update_department_by_id(department_id,department_data,db):
    department=get_department_by_id(department_id,db)
    if department is None:
         raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="department not found"
        )
    
    department.department_name=department_data.department_name,
    department.description=department_data.description
    return update_departments(department,db)

def delete_department_by_id(department_id,db):
    department=get_department_by_id(department_id,db)
    if department is None:
         raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="department not found"
        )
    return delete_department(department,department_id,db)


