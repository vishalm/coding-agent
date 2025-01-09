"use client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import { cn } from "@/lib/utils"
import { Role, TextMessage } from "@copilotkit/runtime-client-gql"
import { Loader2, Send } from 'lucide-react'
import { useEffect, useRef, useState } from "react"
import { Textarea } from "./ui/textarea"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


export default function ChatInterface({
  isLoading,
  appendMessage,
  visibleMessages
}: {
  isLoading: boolean
  appendMessage: (message: TextMessage) => void
  visibleMessages: TextMessage[]
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState("")

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }



  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      appendMessage(new TextMessage({
        content: inputValue,
        role: Role.User
      }))
      setInputValue("")
    }
  }



  return (
    <Card className="bg-[#cdcdd5] dark:bg-[#191A19] flex flex-col overflow-hidden">
      <CardContent className="flex flex-col h-[calc(100vh-200px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full p-4 space-y-4">
        {visibleMessages.map((message) => message.content && (
          <div
            key={message.id}
            className={cn("flex items-start gap-2 group", {
              "justify-end": (message.role === "user"),
            })}
          >
            {(message.role === "assistant") && (
              <Avatar className="w-8 h-8">
                <AvatarImage src="/rdj.jpg" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn("relative rounded-2xl px-4 py-2 mb-2 max-w-md text-sm", {
                "bg-secondary text-secondary-foreground": (message.role === "assistant"),
                "bg-primary text-primary-foreground": (message.role === "user"),
              })}
            >
              {message.role !== "system" && formatMessageWithCode(message.content)}
            </div>
            {(message.role === "user") && (
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://avatar.iran.liara.run/public/17" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/rdj.jpg" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="bg-secondary text-secondary-foreground rounded-2xl px-4 py-2 max-w-md text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="relative p-4 pt-2">
        <div className="relative w-full">
          <Textarea
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.slice(0, 85))}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            className="w-full min-h-[70px] max-h-[150px] pr-24"
            style={{ "scrollbarWidth": "none" }}
          />
          <div className="absolute bottom-5 right-5 flex gap-2">
            <Button
              onClick={handleSendMessage}
              size="icon"
              effect="shineHover"
              className="rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

function formatMessageWithCode(content: string) {
  const parts = content.split(/(```[\s\S]*?```)/);
  return (
    <div className="space-y-2">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const code = part.slice(3, -3);
          const language = code.split('\n')[0].trim();
          const codeContent = code.substring(language.length).trim();
          
          return (
            <SyntaxHighlighter
            key={index}
            language={language || 'javascript'}
            style={oneDark}
            className="rounded-md text-sm"
            >
              {codeContent}
            </SyntaxHighlighter>
          );
        }
        return (
          <p key={index} className="text-sm">{part}</p>
        );
      })}
    </div>
  );
}