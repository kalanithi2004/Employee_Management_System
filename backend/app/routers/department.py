from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.models.user import User
from app.database.database import get_db
from app.utils.token import get_current_token,require_admin
from app.schemas.department import DepartmentResponse,DepartmentCreate
from app.services.department_service import (new_department,
                             get_departments,get_department_id,
                             update_department_by_id,delete_department_by_id)

router=APIRouter(tags=["Department"],dependencies=[Depends(get_current_token)])

@router.post("/department",response_model=DepartmentResponse)
def create_department(department:DepartmentCreate,db:Session=Depends(get_db),current_user:User=Depends(require_admin)):
    return new_department(department,db)

@router.get("/department",response_model=list[DepartmentResponse] )
def get_department_all(db:Session=Depends(get_db)):
    return get_departments(db)

@router.get("/department/{department_id}",response_model=DepartmentResponse)
def get_departments_id(department_id:int,db:Session=Depends(get_db)):
    return get_department_id(department_id,db)

@router.put("/department/{department_id}",response_model=DepartmentResponse)
def update_department(department_id:int,department_data: DepartmentCreate,db:Session=Depends(get_db),current_user:User=Depends(require_admin)):
    return update_department_by_id(department_id,department_data,db)

@router.delete("/department/{department_id}")
def delete_department(department_id:int,db:Session=Depends(get_db),current_user:User=Depends(require_admin)):
    return delete_department_by_id(department_id,db)