# 后端集成文档

## 概述
前端已完成JSON生成和API调用逻辑，等待后端实现对应的API接口。

## API接口规范

### 1. 保存用户报告 API
```
POST http://127.0.0.1:8000/api/save-user-report
```

**请求头：**
```
Content-Type: application/json
```

**请求体格式：**
```json
{
  "serviceOffering": {
    "industry": { "text": "Technology" },
    "business-challenge": { "text": "Scaling operations" },
    "service-type": {
      "question": "How would you describe what you offer?",
      "question_id": "R1",
      "anwser": "Service",
      "anwserselete": "a",
      "additionalText": ""
    }
    // ... 更多Service Offering题目 (R1-R18)
  },
  "Base camp for success (go to market GTM)": {
    "target-niche": {
      "question_id": "question_00",
      "category": "go to market",
      "question": "We know exactly which niche sector(s)...",
      "anwser": "Strongly Agree",
      "score": 2
    }
    // ... 更多题目
  },
  "Tracking the climb (Performance Metrics PM)": {
    // 类似结构
  },
  "Scaling essentials (Commercial Essentials CE)": {
    // 类似结构
  },
  "Streamlining the climb (Optimal Processes OP)": {
    // 类似结构
  },
  "Assembling the team (People, Structure & Culture PSC)": {
    // 类似结构
  },
  "Toolbox for success (Systems & Tools ST)": {
    // 类似结构
  }
}
```

**期望响应：**
```json
{
  "status": "success",
  "message": "Report saved successfully",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. LLM建议 API
```
POST /api/llm-advice
```

**请求体：**
```json
{
  "userId": "user@example.com",
  "assessmentData": {
    // 完整的评估数据（同上）
  }
}
```

**期望响应：**
```json
{
  "advice": "Based on your assessment results, I provide the following business recommendations:\n\n🎯 **Key Findings**\nYour business performs well...",
  "timestamp": "2024-01-15T10:35:00Z",
  "confidence_score": 0.85
}
```

## 数据结构详解

### Service Offering 部分
- **题目编号**：R1, R2, R3... R18
- **选项字母**：a, b, c... (对应选项顺序)
- **文本题**：industry, business-challenge
- **选择题**：其他16题

### 其他问卷部分
- **题目编号**：统一使用 question_00, question_01 等前缀
- **分数映射**：
  - Strongly Disagree: -2
  - Disagree: -1
  - N/A: 0
  - Agree: 1
  - Strongly Agree: 2

### 分类信息
- **Go To Market (GTM)**: question_00
- **Performance Metrics (PM)**: question_01
- **Commercial Essentials (CE)**: question_02
- **Optimal Processes (OP)**: question_03
- **People Structure Culture (PSC)**: question_04
- **Systems Tools (ST)**: question_05

## 前端调用逻辑

### 触发时机
1. 用户完成所有评估步骤
2. 生成标准化JSON格式
3. 自动下载JSON文件
4. POST到后端API
5. 设置完成标记
6. 跳转到dashboard

### 错误处理
- 网络错误不影响用户体验
- 控制台显示详细日志
- 继续执行后续流程

## 测试方法

### 1. 使用测试页面
访问：`http://localhost:3000/test-backend.html`

### 2. 浏览器开发者工具
- 按F12打开
- 查看Console标签页
- 完成评估后观察日志

### 3. 预期日志
```
🚀 开始发送数据到后端...
📤 发送的数据: {完整的JSON数据}
📥 后端响应状态: 200
✅ 数据成功发送到后端
```

## 技术细节

### JSON生成逻辑
- 位置：`components/assessment-flow.tsx` 第165行
- 函数：`generateNewJsonFormat()`
- 处理：标准化所有问卷数据

### API调用逻辑
- 位置：`components/assessment-flow.tsx` 第383行
- 方法：`fetch()` POST请求
- 错误处理：try-catch包装

### 数据验证
- 只处理有答案的题目
- 跳过空答案或未选择的题目
- 确保必要字段存在

## 开发建议

### 1. 后端实现步骤
1. 创建FastAPI应用
2. 实现 `/api/save-user-report` 接口
3. 实现 `/api/llm-advice` 接口
4. 添加CORS支持
5. 添加数据验证

### 2. 示例FastAPI代码
```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any

app = FastAPI()

# 添加CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AssessmentData(BaseModel):
    serviceOffering: Dict[str, Any]
    # ... 其他字段

@app.post("/api/save-user-report")
async def save_user_report(data: AssessmentData):
    # 处理数据
    return {"status": "success", "message": "Report saved"}

@app.post("/api/llm-advice")
async def generate_llm_advice(data: Dict[str, Any]):
    # 调用LLM服务
    return {
        "advice": "Your personalized business advice...",
        "timestamp": "2024-01-15T10:35:00Z"
    }
```

### 3. 启动命令
```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

## 注意事项

1. **端口配置**：确保后端运行在 `127.0.0.1:8000`
2. **CORS设置**：允许前端域名访问
3. **数据验证**：验证必要字段存在
4. **错误处理**：返回适当的HTTP状态码
5. **日志记录**：记录API调用和错误信息

## 联系信息
如有问题，请查看前端控制台日志或使用测试页面进行调试。 