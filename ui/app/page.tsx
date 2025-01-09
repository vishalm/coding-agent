"use client";
import React from "react";
import Wrapper from "./components/wrapper";
import Link from 'next/link'

export default function Home() {

  return (
    <>
    <Wrapper>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to Coding Agent</h1>
      <p className="text-lg mt-4">Get started by asking a question</p>
      <Link href="/chat">
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        Start Chat
      </button>
      </Link>
      </div>
    {/* <div
    style={
      {
        "--copilot-kit-primary-color": "#222222",
      } as CopilotKitCSSProperties
    }>
    <CopilotChat
     labels={{
       title: "Your Assistant",
       initial: "Hi! 👋 How can I assist you today?",
       }}
    />
    </div> */}
    </Wrapper>
    </>
  );
}
