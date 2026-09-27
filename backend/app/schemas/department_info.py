
from pydantic import BaseModel,ConfigDict

class DepartmentInfo(BaseModel):
    id:int
    department_name:str
    model_config=ConfigDict( from_attributes= True)