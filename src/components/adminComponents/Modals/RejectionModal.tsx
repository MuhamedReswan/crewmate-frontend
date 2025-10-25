import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { VerificationRejectionModalProps } from '@/types/form.type';

 export default function VerificationRejectionModal({ isOpen, onClose, onSubmit }:VerificationRejectionModalProps) {
  const [reason, setReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const predefinedReasons = [
    'Document is not clear or readable',
    'Document appears to be tampered or edited',
    'Information does not match profile',
    'Document has expired',
    'Wrong document type submitted',
    'Photo quality is too low',
    'Other'
  ];

  const handleSubmit = () => {
    if (!selectedReason || (selectedReason === 'Other' && !reason.trim())) {
      return;
    }
    const finalReason = selectedReason === 'Other' ? reason : selectedReason;
    onSubmit(finalReason);
    handleReset();
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setReason('');
    setSelectedReason('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Reject Verification</h2>
              <p className="text-xs text-muted-foreground">Provide a reason for rejection</p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">
                Select a reason
              </label>
              <div className="space-y-1.5">
                {predefinedReasons.map((reasonOption) => (
                  <label
                    key={reasonOption}
                    className="flex items-center p-2.5 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={reasonOption}
                      checked={selectedReason === reasonOption}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="w-3.5 h-3.5 text-primary focus:ring-primary"
                    />
                    <span className="ml-2.5 text-xs text-foreground">{reasonOption}</span>
                  </label>
                ))}
              </div>
            </div>

            {selectedReason === 'Other' && (
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Additional details
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please specify the reason for rejection..."
                  rows={3}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-3 py-2 text-sm bg-background border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedReason || (selectedReason === 'Other' && !reason.trim())}
              className="flex-1 px-3 py-2 text-sm bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors font-medium disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

