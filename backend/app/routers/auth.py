from fastapi import APIRouter,Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.auth_services import  register_user,login_user,user_role,user_status,refresh_tokens,get_all_users_service
from app.schemas.user import UserRespone,UserCreate,RoleUpdate
from app.schemas.token import TokenResponse,RefreshTokenResponse
from app.models.user import User
from app.utils.token import require_admin,get_current_token
from app.services.token_services import revoke_refresh_token


router=APIRouter()
@router.post("/register",
          response_model=UserRespone)
def register(newuser:UserCreate,db:Session=Depends(get_db)):
    return register_user(newuser,db)

@router.post("/login",response_model=TokenResponse)
def login(form_data:OAuth2PasswordRequestForm=Depends(),
              db:Session=Depends(get_db)):
   return login_user(form_data,db)

@router.get("/users", response_model=list[UserRespone])
def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    return get_all_users_service(db)

@router.post("/refresh",response_model=RefreshTokenResponse)
def refresh_access_token(refresh_token:str,db:Session=Depends(get_db)):
    return refresh_tokens(refresh_token,db)

@router.patch("/{user_id}/role")
def update_user_role(user_id:int,role_data:RoleUpdate,
                     db:Session=Depends(get_db)
                     ,current_user:User=Depends(require_admin)):
    return user_role(user_id,role_data,db)

@router.patch("/{user_id}/status")
def update_user_status(user_id:int, db:Session=Depends(get_db)
                     ,current_user:User=Depends(require_admin)):
    return user_status(user_id,db)

@router.post("/logout")
def logout(refresh_token:str,db:Session=Depends(get_db),current_user:User=Depends(get_current_token)):
    revoke_refresh_token(refresh_token,db)
    return {"message":"logged out sceessfully"}