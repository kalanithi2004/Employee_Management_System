from sqlalchemy import Column,String,Integer,ForeignKey,Float,Boolean,Date
from sqlalchemy.orm import relationship
from app.database.database import Base
# from app.models.department import Department

class Employee(Base):

    __tablename__="employees"
    id=Column(Integer,primary_key=True,index=True)
    employee_code=Column(String(20),unique=True,nullable=False)
    first_name=Column(String(50),nullable=False)
    last_name=Column(String(50),nullable=False)
    email=Column(String(100),unique=True,nullable=False)
    phone=Column(String(12),unique=True,nullable=False)
    salary=Column(Float,nullable=False)
    designation=Column(String(100),nullable=False)
    department_id=Column(Integer,ForeignKey("departments.id"))
    profile_image=Column(String(255),nullable=True)
    date_of_joining=Column(Date,nullable=False)
    is_active=Column(Boolean,default=True,nullable=False)

    department=relationship("Department",back_populates="employees")
