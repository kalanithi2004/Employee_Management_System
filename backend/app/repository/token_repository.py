from sqlalchemy.orm import Session
from app.models.token import RevokedToken

def revoke_token(token:str,db:Session):
    revokend_token=RevokedToken(token=token)
    db.add(revokend_token)
    db.commit()
    db.refresh(revokend_token)
    return revokend_token

def is_token_revoked(token:str,db:Session):
    return db.query(RevokedToken).filter(RevokedToken.token==token).first()
