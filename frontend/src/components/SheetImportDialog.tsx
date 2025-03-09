'use client';

import { Upload, FileSpreadsheet } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/Button';

interface SheetImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
}

export function SheetImportDialog({ isOpen, onClose, onImport }: SheetImportDialogProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onImport(files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1e293b] border-white/10 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Sheet</DialogTitle>
          <DialogDescription>
            Upload a CSV or Excel file containing your contacts.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed border-white/10 rounded-lg">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--purple))/15] mb-4">
            <FileSpreadsheet className="h-8 w-8 text-[hsl(var(--purple))]" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Upload Your File</h3>
          <p className="text-muted-foreground text-center text-sm mb-6">
            Drag and drop your CSV or Excel file here, or click to browse
          </p>
          <label className="flex items-center gap-2 px-4 py-2 rounded-md bg-[hsl(var(--purple))/20] text-[hsl(var(--purple))] border border-[hsl(var(--purple))/30] hover:bg-[hsl(var(--purple))/30] cursor-pointer">
            <Upload className="h-4 w-4" />
            <span>Select File</span>
            <input 
              type="file" 
              className="hidden" 
              accept=".csv,.xlsx,.xls" 
              onChange={handleFileChange}
            />
          </label>
        </div>
        
        <div className="mt-4 space-y-3">
          <h4 className="text-sm font-medium">File Requirements</h4>
          <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
            <li>CSV or Excel (.xlsx, .xls) format</li>
            <li>Maximum file size: 10MB</li>
            <li>Required columns: Name, Email</li>
            <li>Optional columns: Company, Position, LinkedIn URL</li>
          </ul>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 