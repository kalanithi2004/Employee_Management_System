from pydantic import BaseModel,EmailStr,ConfigDict

class UserCreate(BaseModel):

    name:str
    email:EmailStr
    password:str

class UserLogin(BaseModel):
    email:str
    password:str

class UserRespone(BaseModel):
    id:int
    name:str
    email:EmailStr
    role:str
    is_active:bool

    model_config = ConfigDict(from_attributes=True)

class RoleUpdate(BaseModel):
    role:str