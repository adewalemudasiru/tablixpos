/**
 * MobileSheet — reusable drag-to-dismiss bottom sheet for mobile.
 * Only renders on mobile (md:hidden equivalent via CSS).
 */

import React, { useRef, useEffect, type ReactNode } from "react";
import { colors } from "./ds";

interface MobileSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxHeight?: string;
}

export function MobileSheet({ open, onClose, children, maxHeight = "85vh" }: MobileSheetProps) {
  const sheetRef          = useRef<HTMLDivElement>(null);
  const dragStartY        = useRef(0);
  const currentTranslateY = useRef(0);
  const isDragging        = useRef(false);

  // Animate in
  useEffect(() => {
    if (open && sheetRef.current) {
      sheetRef.current.style.transform = "translateY(100%)";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (sheetRef.current) {
            sheetRef.current.style.transition = "transform 0.32s cubic-bezier(0.32,0.72,0,1)";
            sheetRef.current.style.transform  = "translateY(0%)";
          }
        });
      });
    }
  }, [open]);

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.style.transition = "transform 0.28s cubic-bezier(0.32,0.72,0,1)";
      sheetRef.current.style.transform  = "translateY(100%)";
      setTimeout(onClose, 280);
    } else {
      onClose();
    }
  };

  const onDragStart = (clientY: number) => {
    isDragging.current        = true;
    dragStartY.current        = clientY;
    currentTranslateY.current = 0;
    if (sheetRef.current) sheetRef.current.style.transition = "none";
  };

  const onDragMove = (clientY: number) => {
    if (!isDragging.current || !sheetRef.current) return;
    const delta = Math.max(0, clientY - dragStartY.current);
    currentTranslateY.current = delta;
    sheetRef.current.style.transform = `translateY(${delta}px)`;
  };

  const onDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (currentTranslateY.current > 120) {
      closeSheet();
    } else {
      if (sheetRef.current) {
        sheetRef.current.style.transition = "transform 0.3s cubic-bezier(0.32,0.72,0,1)";
        sheetRef.current.style.transform  = "translateY(0)";
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        style={{ backdropFilter: "blur(2px)" }}
        onClick={closeSheet}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 right-0 bg-white flex flex-col"
        style={{
          borderRadius: "20px 20px 0 0",
          maxHeight,
          transform: "translateY(100%)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
        }}
      >
        {/* Drag handle */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing shrink-0"
          onMouseDown={(e) => onDragStart(e.clientY)}
          onMouseMove={(e) => onDragMove(e.clientY)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={(e) => onDragStart(e.touches[0].clientY)}
          onTouchMove={(e) => onDragMove(e.touches[0].clientY)}
          onTouchEnd={onDragEnd}
        >
          <div className="w-10 h-1 rounded-full" style={{ background: colors.border }} />
        </div>

        {/* Scrollable content wrapper */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
