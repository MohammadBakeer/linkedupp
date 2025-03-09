'use client';

import React, { useState, useRef } from 'react';
import { Plus, FileSpreadsheet, Check, Upload, ArrowLeft, Edit, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
// Mock useToast hook to avoid TypeScript errors
const useToast = () => ({
  toast: ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
    console.log(`Toast: ${title} - ${description}`);
    return { id: '1', dismiss: () => {}, update: () => {} };
  }
});
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Sheet = {
  id: string;
  name: string;
  dateCreated: Date;
  isActive: boolean;
};

export default function SheetManagerClient() {
  const router = useRouter();
  const { toast } = useToast();
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [editingSheetId, setEditingSheetId] = useState<string | null>(null);
  const [newSheetName, setNewSheetName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateSheet = () => {
    router.push('/console/sheet-editor');
  };

  const handleImportSheet = () => {
    setIsImportDialogOpen(true);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      const newSheet: Sheet = {
        id: crypto.randomUUID(),
        name: file.name.replace(/\.[^/.]+$/, ""),
        dateCreated: new Date(),
        isActive: sheets.length === 0,
      };
      
      setSheets([...sheets, newSheet]);
      
      toast({
        title: "Sheet Imported",
        description: `${file.name} has been imported successfully.`,
      });
      
      setIsImportDialogOpen(false);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const openRenameDialog = (sheet: Sheet) => {
    setEditingSheetId(sheet.id);
    setNewSheetName(sheet.name);
    setIsRenameDialogOpen(true);
  };

  const handleRenameSheet = () => {
    if (newSheetName.trim() === '') {
      toast({
        title: "Invalid Name",
        description: "Sheet name cannot be empty.",
        variant: "destructive"
      });
      return;
    }
    
    setSheets(sheets.map(sheet => 
      sheet.id === editingSheetId 
        ? { ...sheet, name: newSheetName } 
        : sheet
    ));
    
    toast({
      title: "Sheet Renamed",
      description: "Sheet has been renamed successfully.",
    });
    
    setIsRenameDialogOpen(false);
  };

  const setActiveSheet = (sheetId: string) => {
    setSheets(sheets.map(sheet => ({
      ...sheet,
      isActive: sheet.id === sheetId
    })));
    
    toast({
      title: "Sheet Activated",
      description: "The selected sheet is now active.",
    });
  };

  const handleEditSheet = (sheetId: string) => {
    router.push(`/console/sheet-editor?id=${sheetId}`);
  };

  return (
    <>
      {/* Top navigation bar */}
      <header className="border-b border-white/10 backdrop-blur-md bg-[#020817] sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.push('/console')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">
              <span className="text-[hsl(var(--purple))]">Sheet</span> Manager
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-10 flex-1">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Your Sheets
          </h2>
          <p className="text-muted-foreground">
            Create, import, or manage your contact sheets here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Existing Sheets */}
          {sheets.map((sheet) => (
            <div 
              key={sheet.id}
              className={`group card-glow ${sheet.isActive ? 'glow-purple' : ''} relative overflow-hidden rounded-xl border border-white/10 bg-[#1e293b] p-6 hover:bg-[#1e293b]/80 transition-all`}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--purple))/15]">
                      <FileSpreadsheet className="h-6 w-6 text-[hsl(var(--purple))]" />
                    </div>
                    <div className="flex gap-2 items-center">
                      {sheet.isActive && (
                        <Badge className="bg-[hsl(var(--purple))]">Active</Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 opacity-70 hover:opacity-100"
                        onClick={() => openRenameDialog(sheet)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{sheet.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Created on {sheet.dateCreated.toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button 
                    className="flex-1 justify-center bg-[hsl(var(--cyan))/20] hover:bg-[hsl(var(--cyan))/30] text-[hsl(var(--cyan))] border border-[hsl(var(--cyan))/30]"
                    onClick={() => handleEditSheet(sheet.id)}
                  >
                    Edit Sheet
                    <Edit className="h-4 w-4 ml-2" />
                  </Button>
                  
                  {!sheet.isActive && (
                    <Button 
                      className="flex-1 justify-center bg-[hsl(var(--purple))/20] hover:bg-[hsl(var(--purple))/30] text-[hsl(var(--purple))] border border-[hsl(var(--purple))/30]"
                      onClick={() => setActiveSheet(sheet.id)}
                    >
                      Set Active
                      <Check className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* "Add Sheet" cards - Only show as many as needed */}
          {sheets.length < 3 && (
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#1e293b] p-6 hover:bg-[#1e293b]/80 transition-all">
              <div className="flex flex-col h-full">
                <h3 className="mb-4 text-xl font-semibold text-white">Add New Sheet</h3>
                <div className="flex flex-col gap-4 mt-4">
                  <Button 
                    className="justify-between bg-[hsl(var(--cyan))/20] hover:bg-[hsl(var(--cyan))/30] text-[hsl(var(--cyan))] border border-[hsl(var(--cyan))/30]"
                    onClick={handleCreateSheet}
                  >
                    Create New Sheet
                    <Plus className="h-4 w-4 ml-2" />
                  </Button>
                  <Button 
                    className="justify-between bg-[hsl(var(--purple))/20] hover:bg-[hsl(var(--purple))/30] text-[hsl(var(--purple))] border border-[hsl(var(--purple))/30]"
                    onClick={handleImportSheet}
                  >
                    Import Sheet
                    <Upload className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 max-w-lg mx-auto mt-16 text-center">
          <h3 className="text-xl font-semibold text-[hsl(var(--cyan))]">How It Works</h3>
          <p className="text-muted-foreground">
            You can create up to 3 contact sheets. Select one sheet to be active at a time. 
            The active sheet will be used for your email campaigns.
          </p>
        </div>
      </main>

      {/* Import Sheet Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Sheet</DialogTitle>
            <DialogDescription>
              Select a CSV or Excel file to import as a contact sheet.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Label htmlFor="sheet-file" className="text-left">
              File
            </Label>
            <Input
              id="sheet-file"
              type="file"
              accept=".csv,.xlsx,.xls"
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
            <p className="text-sm text-muted-foreground">
              Supported formats: CSV, Excel (.xlsx, .xls)
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Sheet Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Sheet</DialogTitle>
            <DialogDescription>
              Enter a new name for your sheet.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Label htmlFor="sheet-name" className="text-left">
              Sheet Name
            </Label>
            <Input
              id="sheet-name"
              value={newSheetName}
              onChange={(e) => setNewSheetName(e.target.value)}
              placeholder="Enter sheet name"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameSheet}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 