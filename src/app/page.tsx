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
  createdAt: Date;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Learn React", completed: false, createdAt: new Date() },
    { id: "2", text: "Build a todo app", completed: false, createdAt: new Date() },
    { id: "3", text: "Deploy to production", completed: true, createdAt: new Date(Date.now() - 86400000) },
    { id: "4", text: "Review code", completed: false, createdAt: new Date(Date.now() - 172800000) },
    { id: "5", text: "Update documentation", completed: true, createdAt: new Date(Date.now() - 604800000) },
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
      createdAt: new Date(),
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Task Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Manage your productivity with style
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl glass-input hover:scale-105 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {isDark ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        <div className="finance-card rounded-2xl p-8 mb-8">
          <TodoForm onAdd={addTodo} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stat-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Tasks</h3>
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">📊</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {totalTodos}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              All tasks
            </div>
          </div>

          <div className="stat-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium">Active</h3>
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 font-bold">⚡</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {activeTodos}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Pending completion
            </div>
          </div>

          <div className="stat-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium">Completed</h3>
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-bold">✅</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {completedTodos}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Successfully finished
            </div>
          </div>
        </div>

        <div className="finance-card rounded-2xl p-6">
          <TodoFilters currentFilter={filter} onFilterChange={setFilter} />
          
          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <div className="text-4xl mb-4">📋</div>
                <div className="text-lg font-medium">No tasks found</div>
                <div className="text-sm">Add some tasks to get started</div>
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