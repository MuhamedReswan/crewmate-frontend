// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Eye, FileText } from 'lucide-react';

// interface DocumentViewerProps {
//   aadharImageFront?: string;
//   aadharImageBack?: string;
//   documentType?: string;
// }

// export function DocumentViewer({ aadharImageFront, aadharImageBack, documentType = "Aadhar Card" }: DocumentViewerProps) {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   return (
//     <Card className="bg-surface border-border">
//       <CardHeader>
//         <CardTitle className="text-surface-foreground flex items-center gap-2">
//           <FileText className="h-5 w-5 text-primary" />
//           {documentType} Documents
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Front Side */}
//           <div className="space-y-3">
//             <h4 className="text-muted-foreground font-medium">Front Side</h4>
//             <div className="relative group">
//               {aadharImageFront ? (
//                 <div className="relative">
//                   <img
//                     src={aadharImageFront}
//                     alt="Document Front"
//                     className="w-full h-64 object-cover rounded-lg border border-border"
//                   />
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
//                     <Button
//                       size="sm"
//                       onClick={() => setSelectedImage(aadharImageFront)}
//                       className="bg-primary hover:bg-primary/90"
//                     >
//                       <Eye className="h-4 w-4 mr-2" />
//                       View Full
//                     </Button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="w-full h-48 bg-muted rounded-lg border border-dashed border-border flex items-center justify-center">
//                   <p className="text-muted-foreground text-sm">No document uploaded</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Back Side */}
//           <div className="space-y-3">
//             <h4 className="text-muted-foreground font-medium">Back Side</h4>
//             <div className="relative group">
//               {aadharImageBack ? (
//                 <div className="relative">
//                   <img
//                     src={aadharImageBack}
//                     alt="Document Back"
//                     className="w-full h-64 object-cover rounded-lg border border-border"
//                   />
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
//                     <Button
//                       size="sm"
//                       onClick={() => setSelectedImage(aadharImageBack)}
//                       className="bg-primary hover:bg-primary/90"
//                     >
//                       <Eye className="h-4 w-4 mr-2" />
//                       View Full
//                     </Button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="w-full h-48 bg-muted rounded-lg border border-dashed border-border flex items-center justify-center">
//                   <p className="text-muted-foreground text-sm">No document uploaded</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Full Image Dialog */}
//         <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
//           <DialogContent className="max-w-3xl bg-surface border-border">
//             <DialogHeader>
//               <DialogTitle className="text-surface-foreground">Document Preview</DialogTitle>
//             </DialogHeader>
//             {selectedImage && (
//               <div className="flex justify-center">
//                 <img
//                   src={selectedImage}
//                   alt="Document Full View"
//                   className="max-h-[70vh] max-w-full object-contain rounded-lg"
//                 />
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </CardContent>
//     </Card>
//   );
// }

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, FileText } from "lucide-react";

interface Document {
  label: string;
  url?: string;
}

interface DocumentViewerProps {
  title?: string; 
  documents: Document[]; 
}

export function DocumentViewer({ title = "Documents", documents }: DocumentViewerProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Card className="bg-surface border-border">
      <CardHeader>
        <CardTitle className="text-surface-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
<div
  className={
    documents.length === 1
      ? "flex justify-center" 
      : "grid grid-cols-1 md:grid-cols-2 gap-6"
  }
>          {documents.map((doc, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-muted-foreground font-medium">{doc.label}</h4>
              <div className="relative group">
                {doc.url ? (
                  <div className="relative">
                    <img
                      src={doc.url}
                      alt={`${doc.label}`}
                      className="w-full h-64 object-cover rounded-lg border border-border"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button
                        size="sm"
                        onClick={() => setSelectedImage(doc.url!)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Full
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-muted rounded-lg border border-dashed border-border flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">No document uploaded</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Full Image Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-3xl bg-surface border-border">
            <DialogHeader>
              <DialogTitle className="text-surface-foreground">Document Preview</DialogTitle>
            </DialogHeader>
            {selectedImage && (
              <div className="flex justify-center">
                <img
                  src={selectedImage}
                  alt="Document Full View"
                  className="max-h-[70vh] max-w-full object-contain rounded-lg"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
