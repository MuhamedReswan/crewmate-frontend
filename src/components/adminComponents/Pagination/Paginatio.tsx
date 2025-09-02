
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center mt-6 gap-2">
      {/* Prev button */}
      <button
        className="px-3 py-1 rounded-md border border-primary/50 text-white disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Page numbers (only show nearby pages) */}
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(
          (p) =>
            p >= Math.max(1, currentPage - 1) &&
            p <= Math.min(totalPages, currentPage + 1)
        )
        .map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded-md ${
              p === currentPage
                ? 'bg-primary text-white'
                : 'border border-primary/30 text-white'
            }`}
          >
            {p}
          </button>
        ))}

      {/* Next button */}
      <button
        className="px-3 py-1 rounded-md border border-primary/50 text-white disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
