from sqlalchemy import Column,String,Integer
from sqlalchemy.orm import relationship
from app.database.database import Base
# from app.models.employee import Employee

class Department(Base):
    __tablename__="departments"

    id=Column(Integer,primary_key=True,index=True)
    department_name=Column(String(100),unique=True,nullable=False)
    description=Column(String(300),nullable=True)
    employees=relationship("Employee",back_populates="department")