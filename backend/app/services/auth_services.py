from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from jose import jwt,JWTError
from app.core.config import SECRET_KEY,ALGORITHM
from app.schemas.user import UserRespone,UserCreate,UserLogin
from app.models.user import User
from app.utils.hash import hash_password,verify_password
from app.utils.token import create_access_token,create_refresh_token,verify_token
from app.repository.user_repository import (get_user_by_username,get_user_by_id,
                                            get_user_by_email,create_user,update_user,
                                            update_status,get_all_users)
from app.services.token_services import check_refresh_token

def register_user(new_user:UserCreate,db:Session):
    if get_user_by_username(new_user.name,db):
        raise HTTPException(
            status_code=409,
            detail="username already exists"
        ) 
    if get_user_by_email(new_user.email,db):
        raise HTTPException(
            status_code=409,
            detail="email already exists"
        ) 
    user=User(
        name=new_user.name,
        email=new_user.email,
        hashed_password=hash_password(new_user.password)
       )
    return create_user(user,db)

def login_user(form_data,db:Session):
    user=get_user_by_email(form_data.username,db)

    if not user :
        raise HTTPException(
            status_code=404,
            detail="user email not found"
        )
    if not user.is_active :
        raise HTTPException(
            status_code=403,
            detail="User account is inactive"
        )
    if verify_password(form_data.password,user.hashed_password):
        access_token=create_access_token({"sub":user.email})
        refresh_token=create_refresh_token({"sub":user.email})
        return {"access_token":access_token,
                "refresh_token":refresh_token,
                "token_type":"bearer"}
    
    raise HTTPException(
            status_code=404,
            detail="user password incorret"
        )

def refresh_tokens(refresh_token,db):
    try: 
        payload=verify_token(refresh_token)
        if payload is None:
            raise HTTPException(
            status_code=401,
            detail="Invalid refresh token"
        ) 
        if payload.get("type")!= "refresh":
            raise HTTPException(
            status_code=401,
            detail="Invalid  token type"
        ) 
        if check_refresh_token(refresh_token,db):
            raise HTTPException(
            status_code=401,
            detail="Refresh  token has been revoked"
        ) 
        email=payload.get("sub")
        
        new_access_token=create_access_token({"sub":email})
        return {"access_token":new_access_token,
                "token_type":"bearer"}
    
    except JWTError :
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired refresh token"
        ) 

def user_role(user_id,role_data,db):
    user=get_user_by_id(user_id,db)
    if not user:
       raise HTTPException(
            status_code=404,
            detail="user  not found"
        )
    if role_data.role not in ["admin","employee"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid role"
        ) 
    user.role= role_data.role
    return update_user(user,db)
    
def user_status(user_id, db):
    user=get_user_by_id(user_id,db)
    if not user:
       raise HTTPException(
            status_code=404,
            detail="user  not found"
        )
    user.is_active= not user.is_active
    return update_status(user,db)

def get_all_users_service(db):
    return get_all_users(db)