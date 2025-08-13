"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <Card className="finance-card mb-3 todo-item-enter">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggle(id)}
            className="w-5 h-5"
          />
        </div>
        
        {isEditing ? (
          <div className="flex-1 flex gap-3">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="glass-input flex-1"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
            />
            <Button size="sm" onClick={handleSave} className="finance-button satisfying-click">
              <Save className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel} className="finance-button satisfying-click">
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex-1 flex items-center gap-3">
            <span className={cn(
              "flex-1 transition-all duration-300",
              completed ? "line-through text-slate-500 dark:text-slate-400" : "text-slate-900 dark:text-slate-100"
            )}>
              {text}
            </span>
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)} className="finance-button satisfying-click">
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onDelete(id)} className="finance-button satisfying-click">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};