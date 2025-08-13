"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Edit2, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newText: string) => void;
}

export const TodoItem = ({ 
  id, 
  text, 
  completed, 
  onToggle, 
  onDelete, 
  onUpdate 
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  return (
    <Card 
      className={cn(
        "mb-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm",
        completed && "opacity-75"
      )}
    >
      <CardContent className="p-4 flex items-center gap-3">
        <Checkbox
          checked={completed}
          onCheckedChange={() => onToggle(id)}
          className="w-5 h-5 transition-colors duration-200"
        />
        
        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
            />
            <Button 
              size="sm" 
              onClick={handleSave}
              className="transition-all duration-200 hover:scale-105"
            >
              <Save className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleCancel}
              className="transition-all duration-200 hover:scale-105"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex-1 flex items-center gap-2">
            <span 
              className={cn(
                "flex-1 transition-all duration-300",
                completed ? "line-through text-gray-500" : ""
              )}
            >
              {text}
            </span>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setIsEditing(true)}
              className="transition-all duration-200 hover:scale-105 hover:bg-accent"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onDelete(id)}
              className="transition-all duration-200 hover:scale-105 hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};