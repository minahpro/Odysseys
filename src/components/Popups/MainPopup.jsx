import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

function MainPopup({ children, open, close, title, contentClass }) {
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent
        className={`${contentClass} bg-white border-primary/30 dialogContent `}
      >
        <DialogTitle>
          <span className="text-primary font-jua text-xl">{title}</span>
        </DialogTitle>
        <div className="pt-4 w-full">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default MainPopup;
