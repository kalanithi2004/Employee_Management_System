from sqlalchemy import Column,Integer,String,Boolean
from app.database.database import Base

class User(Base):
    __tablename__="employee_users"
    id=Column(Integer,primary_key=True,index=True)
    name=Column(String(50),unique=True,nullable=False)
    email=Column(String(100),unique=True,nullable=False)
    hashed_password=Column(String(300),nullable=False)
    role=Column(String(20),default="employee",nullable=False)
    is_active=Column(Boolean,default=True,nullable=False)
    