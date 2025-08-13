"use client";

import { useState, useEffect } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { TodoForm } from "@/components/todo-form";
import { TodoItem } from "@/components/todo-item";
import { TodoFilters } from "@/components/todo-filters";
import { TodoStats } from "@/components/todo-stats";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Learn React", completed: false },
    { id: "2", text: "Build a todo app", completed: false },
    { id: "3", text: "Deploy to production", completed: true },
  ]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold mb-2">Todo App</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-card border hover:bg-accent transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? "🌙" : "☀️"}
            </button>
          </div>
          <p className="text-muted-foreground">
            Organize your tasks efficiently
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-sm border p-6 transition-all duration-300 hover:shadow-md">
          <TodoForm onAdd={addTodo} />
          
          <TodoStats 
            total={totalTodos} 
            completed={completedTodos} 
            active={activeTodos} 
          />
          
          <TodoFilters currentFilter={filter} onFilterChange={setFilter} />
          
          <div className="space-y-2">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No todos found
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                />
              ))
            )}
          </div>
        </div>

        <MadeWithDyad />
      </div>
    </div>
  );
}