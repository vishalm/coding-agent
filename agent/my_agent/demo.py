"""Demo"""

import os
from dotenv import load_dotenv
load_dotenv() # pylint: disable=wrong-import-position

from fastapi import FastAPI
import uvicorn
from copilotkit.integrations.fastapi import add_fastapi_endpoint
from copilotkit import CopilotKitSDK, LangGraphAgent
from my_agent.agent import graph


app = FastAPI()
sdk = CopilotKitSDK(
    agents=[
        LangGraphAgent(
            name="coding_assistant",
            description="An agent that can generate or review code.",
            graph=graph,
        )
    ],
)

add_fastapi_endpoint(app, sdk, "/copilotkit")

def main():
    """Run the uvicorn server."""
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("my_agent.demo:app", host="localhost", port=port, reload=True)