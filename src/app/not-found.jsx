import { NoDataFound } from "@/components/Loadings/ErrorComp";
import React from "react";

export default function NotFound() {
  return (
    <section className="h-screen respons flex-all">
      <NoDataFound text="Page Not Found" />
    </section>
  );
}
