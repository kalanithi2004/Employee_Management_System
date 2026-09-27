from pydantic import Field,BaseModel,EmailStr
# from typing import Optional
from app.schemas.department_info import DepartmentInfo

class EmployeeCreate(BaseModel):
   
    employee_code:str
    first_name:str
    last_name:str
    email:EmailStr
    phone:str
    salary:float
    designation:str
    department_id:int
    date_of_joining:str


class EmployeeResponse(BaseModel):
    id:int
    employee_code:str
    first_name:str
    last_name:str
    email:EmailStr
    phone:str
    salary:float
    designation:str
    profile_image:str |None=None
    department:DepartmentInfo 
    model_config={
        "from_attributes":True
    }

class EmployeeUpdate(BaseModel):
    first_name:str
    last_name:str
    email:EmailStr
    phone:str
    designation:str
    salary:float
    department_id:int 

class EmployeeInfo(BaseModel):
    id:int
    first_name:str
    last_name:str
    model_config={
        "from_attributes":True
    }