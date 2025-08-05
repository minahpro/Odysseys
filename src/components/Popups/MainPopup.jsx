import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

function MainPopup({ children, open, close, title, contentClass }) {
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent
        className={`${contentClass} bg-black border-primary/30 dialogContent `}
      >
        <DialogTitle>
          <span className="text-white text-lg font-bold">{title}</span>
        </DialogTitle>
        <div className="pt-4 w-full">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default MainPopup;
