import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { UploadCloud, FileText, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { useStore } from '@/src/store/useStore';
import { Badge } from '@/src/components/ui/Badge';

export function DocumentsPage() {
  const { currentUser } = useStore();
  const [dragActive, setDragActive] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<{name: string; type: string; size: number; status: 'uploading' | 'completed'; docType: string}[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const documentTypes = [
    { value: 'id_card', label: 'National ID / Passport' },
    { value: 'proof_of_address', label: 'Proof of Address' },
    { value: 'payment_receipt', label: 'Payment Receipt' },
    { value: 'signed_contract', label: 'Signed Contract' },
    { value: 'other', label: 'Other Document' }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(f => 
      f.type === 'application/pdf' || 
      f.type === 'image/jpeg' || 
      f.type === 'image/png'
    );
    
    const newFiles = validFiles.map(f => ({
      name: f.name,
      type: f.type,
      size: f.size,
      status: 'uploading' as const,
      docType: selectedDocType
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    setTimeout(() => {
      setUploadedFiles(prev => prev.map(f => 
        newFiles.find(nf => nf.name === f.name) ? { ...f, status: 'completed' } : f
      ));
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Documents</h1>
        <p className="text-slate-500">Manage your KYC documents and property deeds securely.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>Upload PDF or image files for identification or property documents.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label htmlFor="docType" className="block text-sm font-medium text-slate-700 mb-2">
                Document Type <span className="text-red-500">*</span>
              </label>
              <select 
                id="docType"
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="" disabled>Select document type</option>
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div 
              className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
                !selectedDocType ? 'opacity-50 cursor-not-allowed border-slate-200 bg-slate-50' : 
                dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-slate-50'
              }`}
              onDragEnter={selectedDocType ? handleDrag : undefined}
              onDragLeave={selectedDocType ? handleDrag : undefined}
              onDragOver={selectedDocType ? handleDrag : undefined}
              onDrop={selectedDocType ? handleDrop : undefined}
            >
              <div className="mx-auto w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                <UploadCloud className={`h-8 w-8 ${selectedDocType ? 'text-emerald-500' : 'text-slate-400'}`} aria-hidden="true" />
              </div>
              <p className="text-sm font-medium text-slate-900 mb-1">
                {selectedDocType ? 'Drag and drop your files here' : 'Please select a document type first'}
              </p>
              <p className="text-xs text-slate-500 mb-6">Supports PDF, JPG, PNG (Max 10MB)</p>
              
              <input 
                id="fileUpload"
                ref={inputRef}
                type="file" 
                className="hidden" 
                multiple
                accept="application/pdf, image/jpeg, image/png"
                onChange={handleChange}
                disabled={!selectedDocType}
                aria-label="Upload documents"
              />
              <Button 
                onClick={() => inputRef.current?.click()} 
                variant="outline"
                disabled={!selectedDocType}
              >
                Browse Files
              </Button>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-8 space-y-3">
                <h4 className="text-sm font-medium text-slate-900 mb-3">Recent Uploads</h4>
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${file.type === 'application/pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                        {file.type === 'application/pdf' ? <FileText className="h-5 w-5" aria-hidden="true" /> : <ImageIcon className="h-5 w-5" aria-hidden="true" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 line-clamp-1">{file.name}</p>
                        <p className="text-xs text-slate-500">
                          {documentTypes.find(t => t.value === file.docType)?.label || 'Document'} • {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div>
                      {file.status === 'uploading' ? (
                        <span className="text-xs font-medium text-emerald-600 animate-pulse">Uploading...</span>
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-label="Upload completed" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Existing Documents List */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>My Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'National ID Card.jpg', type: 'image', date: '2 days ago', status: 'verified' },
                { name: 'Proof of Address.pdf', type: 'pdf', date: '2 days ago', status: 'verified' },
                { name: 'Allocation_Letter_Plot42.pdf', type: 'pdf', date: 'Pending', status: 'pending' }
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-slate-100 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full bg-white shadow-sm ${doc.type === 'pdf' ? 'text-red-500' : 'text-blue-500'}`}>
                      {doc.type === 'pdf' ? <FileText className="h-5 w-5" aria-hidden="true" /> : <ImageIcon className="h-5 w-5" aria-hidden="true" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-slate-900">{doc.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Uploaded {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={doc.status === 'verified' ? 'success' : 'warning'} className="hidden sm:inline-flex">
                      {doc.status.toUpperCase()}
                    </Badge>
                    <Button variant="ghost" size="sm" aria-label={`View ${doc.name}`}>View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
