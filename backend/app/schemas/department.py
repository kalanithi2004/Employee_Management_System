from pydantic import BaseModel,ConfigDict
from app.schemas.employee import EmployeeInfo
class DepartmentCreate(BaseModel):
    department_name:str
    description:str | None=None

class DepartmentResponse(DepartmentCreate):
    id:int
    employees:list[EmployeeInfo]=[]
    model_config= ConfigDict( from_attributes= True)
    

