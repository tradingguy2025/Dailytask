"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-3">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="glass-input flex-1 transition-all duration-300"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(e);
          }}
        />
        <Button 
          type="submit" 
          size="sm" 
          disabled={!text.trim()}
          className="finance-button transition-all duration-300 hover:scale-105 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};