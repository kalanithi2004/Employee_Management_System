import time
from fastapi import Request

async def log_request(request:Request,call_next):
    start=time.time()
    response= await call_next(request)
    end =time.time()
    print(f"{request.method} {request.url}")
    print(f"Time: {end - start:.4f} sec")

    return response