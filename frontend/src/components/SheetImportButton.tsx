'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { SheetImportDialog } from '@/components/SheetImportDialog';

export default function SheetImportButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImport = (file: File) => {
    console.log('Importing file:', file.name);
    // Here you would handle the file upload logic
    // For example, sending it to your API
    
    // Close the dialog after import
    setIsDialogOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsDialogOpen(true)}
        className="flex justify-between items-center px-4 py-2 rounded-md bg-[hsl(var(--purple))/20] hover:bg-[hsl(var(--purple))/30] text-[hsl(var(--purple))] border border-[hsl(var(--purple))/30]"
      >
        Import Sheet
        <Upload className="h-4 w-4 ml-2" />
      </button>
      
      <SheetImportDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        onImport={handleImport}
      />
    </>
  );
} 