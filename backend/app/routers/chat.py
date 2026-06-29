import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.config import OPENROUTER_API_KEY, OPENROUTER_MODEL

router = APIRouter()

SYSTEM_PROMPT = (
    "You are QServ AI, a friendly and helpful assistant for QServ, a home services marketplace in Qatar. "
    "You help users find services like cleaning, plumbing, electrical, painting, pest control, AC & cooling, "
    "handyman, moving & packing, maid service, chefs, salon & grooming, and more. "
    "Keep responses concise and helpful. If the user asks about booking, guide them to browse services at /services. "
    "If they ask about becoming a professional, point them to /become-a-professional. "
    "Be warm and professional. You are not a real estate assistant."
)


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


class ChatResponse(BaseModel):
    reply: str


@router.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not OPENROUTER_API_KEY:
        return ChatResponse(reply="AI chat is not configured. Please set OPENROUTER_API_KEY.")

    openrouter_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in request.messages:
        openrouter_messages.append({"role": msg.role, "content": msg.content})

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:3000",
                },
                json={
                    "model": OPENROUTER_MODEL,
                    "messages": openrouter_messages,
                    "temperature": 0.7,
                    "max_tokens": 500,
                },
            )
            data = resp.json()
            reply = data["choices"][0]["message"]["content"]
            return ChatResponse(reply=reply)
    except Exception:
        raise HTTPException(status_code=502, detail="Failed to get AI response. Please try again.")
