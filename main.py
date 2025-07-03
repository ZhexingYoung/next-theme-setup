from fastapi import FastAPI
from pydantic import BaseModel
import json
import os
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserReport(BaseModel):
    userId: str
    serviceOffering: dict
    pillarReports: dict

@app.post("/api/save-user-report")
async def save_user_report(data: UserReport):
    try:
        os.makedirs("user-exports", exist_ok=True)
        # 替换 userId 里的特殊字符
        user_id = data.userId.replace("/", "_").replace("\\", "_").replace(":", "_")
        file_path = f"user-exports/{user_id}.json"
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data.dict(), f, ensure_ascii=False, indent=2)
        print("写入成功：", file_path)
        return {"status": "success", "file": file_path}
    except Exception as e:
        print("保存失败：", e)
        return {"status": "error", "detail": str(e)}