from fastapi import APIRouter,Depends,File,UploadFile

from app.schemas.employee import EmployeeCreate ,EmployeeResponse,EmployeeUpdate
from sqlalchemy.orm import Session
from app.utils.token import get_current_token,require_admin
from app.models.user import User
from app.database.database import get_db
from app.services.employee_service import (add_employee,fetch_all_employee,
                                           update_employee_id,search_employees,
                                           delete_employee_id,fetch_limit_employee,
                                           fetch_employee_id,sort_empolyees,
                                           upload_employee_image,change_employee_status
                                           )

router=APIRouter(tags=["Employee"],dependencies=[Depends(get_current_token)])

@router.post("/employee")
def createempolyee( new_employee:EmployeeCreate,db:Session=Depends(get_db),current_user:User=Depends(require_admin)):
    return add_employee(new_employee,db)

@router.get("/employee",response_model=list[EmployeeResponse])
def get_all(db:Session=Depends(get_db)):
    return fetch_all_employee(db)

@router.put("/employee/{employee_id}",response_model=EmployeeResponse)
def update_employee(employee_id:int,employee:EmployeeUpdate,db:Session=Depends(get_db),current_user:User=Depends(require_admin)):
    return update_employee_id(employee_id,employee,db)

@router.delete("/employee/{employee_id}")
def delete_employee(employee_id:int,db:Session=Depends(get_db),current_user:User=Depends(require_admin)):
    return delete_employee_id(employee_id,db)

@router.get("/employee/search",response_model=list[EmployeeResponse])
def search(search:str,db:Session=Depends(get_db)):
    return search_employees(search,db)

@router.get("/employee/pagination",response_model=list[EmployeeResponse])
def get_limit_employee(skip:int=0,limit:int=10,db:Session=Depends(get_db)):
    return fetch_limit_employee(skip,limit,db)

@router.get("/employee/sort",response_model=list[EmployeeResponse])
def sort(order:str="asc",db:Session=Depends(get_db)):
    return sort_empolyees(order,db)

@router.get("/employee/{employee_id}",response_model=EmployeeResponse)
def get_employee(employee_id:int,db:Session=Depends(get_db)):
    return fetch_employee_id(employee_id,db)

@router.patch("/employee/{employee_id}")
def employee_status(employee_id:int,db:Session=Depends(get_db),current_user:User=Depends(require_admin)):
    return change_employee_status(employee_id,db)

@router.post("/employee/{employee_id}/upload")
async def upload_image(employee_id:int,file:UploadFile=File(...),
                 db:Session=Depends(get_db),current_user:User=Depends(require_admin)):
    
    return upload_employee_image(employee_id,file,db)
