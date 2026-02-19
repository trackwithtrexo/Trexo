"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Sun, Moon, LogOut, Pencil, Check, X, KeyRound } from "lucide-react";

// ── shadcn ModeToggle ─────────────────────────────────────────────────────────
function ModeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-xl h-9 w-9 border-border">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [name, setName] = useState("John Doe");
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(name);

  // password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSaveName = () => {
    if (tempName.trim()) setName(tempName.trim());
    setEditingName(false);
  };

  const handleCancelName = () => {
    setTempName(name);
    setEditingName(false);
  };

  const handleChangePassword = () => {
    setPasswordError("");
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSaved(false), 2000);
  };

  return (
    <div className="w-full flex justify-center pt-10 px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-6 text-center">

        {/* Profile Pic */}
        <Avatar className="w-24 h-24 border-4 border-border shadow-md">
          <AvatarImage src="/avatar.png" alt="User" />
          <AvatarFallback className="text-2xl font-black bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Name — inline edit */}
        <div className="w-full space-y-1">
          {editingName ? (
            <div className="flex items-center gap-2">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveName();
                  if (e.key === "Escape") handleCancelName();
                }}
                autoFocus
                className="h-9 rounded-xl text-center font-bold text-base border-border bg-muted/40"
              />
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-emerald-500 hover:bg-emerald-500/10 shrink-0" onClick={handleSaveName}>
                <Check size={16} />
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-muted-foreground hover:bg-muted/60 shrink-0" onClick={handleCancelName}>
                <X size={16} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground">{name}</h2>
              <button
                onClick={() => { setTempName(name); setEditingName(true); }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Pencil size={14} />
              </button>
            </div>
          )}
          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
        </div>

        <Separator className="w-full" />

        {/* Actions */}
        <div className="w-full flex flex-col gap-3">

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-semibold text-foreground">Theme</span>
            <ModeToggle />
          </div>

          {/* Sign Out */}
          <Button
            variant="outline"
            className="w-full rounded-xl h-10 font-bold gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
           
          >
            <LogOut size={15} />
            Sign Out
          </Button>
        </div>

      </div>
    </div>
  );
}