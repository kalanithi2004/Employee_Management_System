from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import Depends,HTTPException,status
from fastapi.security import OAuth2PasswordBearer
from app.core.config import SECRET_KEY,ALGORITHM,ACCESS_TOKEN_EXPIRE_MINUTES,REFRESH_TOKEN_EXPIRE_DAYS
from app.database.database import get_db
from sqlalchemy.orm import Session
from app.models.user import User



def create_access_token(data:dict):
    to_encode=data.copy()
    expire_time=datetime.utcnow()+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp":expire_time,
                     "type":"access"})
    jwt_token=jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
    return jwt_token

def create_refresh_token(data:dict):
    to_encode=data.copy()
    expire=datetime.utcnow()+timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp":expire,
                      "type":"refresh"})
    jwt_token=jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
    return jwt_token

def verify_token(token:str):
    try:
         return jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        
    except JWTError:
         raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired  token"
        )

oauth2_scheme=OAuth2PasswordBearer(tokenUrl="login")    

def get_current_token(token:str=Depends(oauth2_scheme),db:Session=Depends(get_db)):

    payload=verify_token(token)
    if payload is None:
         raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    if payload.get("type")!= "access":
            raise HTTPException(
            status_code=401,
            detail="Invalid  token type"
        ) 
    email=payload.get("sub")
    user=db.query(User).filter(User.email==email).first()
    if user is None:
         raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found "
        )
    if not user.is_active:
       raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )  
    return user
         
def require_admin(current_user:User=Depends(get_current_token)):
    if current_user.role !="admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required "
        ) 
    return current_user
    
