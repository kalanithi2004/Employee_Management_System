from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.database.database import Base,engine
from app.middleware.middleware import log_request
from fastapi.middleware.cors import CORSMiddleware
from app.exceptions.handler import global_exception_handler

from app.routers import auth,employee,department
app=FastAPI(title="Employee Management System API",version="1.0.0",
            description="REST API for managing employees, departments, authentication, and roles.")
app.mount("/uploads",StaticFiles(directory="uploads"),
          name="uploads")
app.middleware("http")(log_request)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(Exception,global_exception_handler)
Base.metadata.create_all(bind=engine)
app.include_router(auth.router,tags=["login"])
app.include_router(employee.router,tags=["Employee"])
app.include_router(department.router,tags=["Department"])
