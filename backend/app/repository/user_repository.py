from sqlalchemy.orm import Session
from app.models.user import User


def get_user_by_username(name:str,db:Session):
    return db.query(User).filter(User.name==name).first()

def get_user_by_email(email:str,db:Session):
    return db.query(User).filter(User.email==email).first()

def get_user_by_id(user_id,db):
    return db.query(User).filter(User.id==user_id).first()

def create_user(user:User,db:Session):
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def update_user(user,db):
    db.commit()
    db.refresh(user)
    return {"message":"Role updated successfully",
            "userr_id":user.id,
            "role":user.role}

def update_status(user,db):
    db.commit()
    db.refresh(user)
    return {"message":"User status updated successfully",
            "userr_id":user.id,
            "is_active":user.is_active}

def get_all_users(db: Session):
    return db.query(User).all()
