from app.repository.token_repository import revoke_token,is_token_revoked 

def revoke_refresh_token(token:str,db):
    return revoke_token(token,db)

def check_refresh_token(token:str,db):
    return is_token_revoked(token,db)