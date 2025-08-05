import React from "react";
import { PromoCard } from "../cards";

function PromoBanner() {
  return (
    <section className="sm:pb-8 pb-4 lg:pt-20 pt-10">
      <div className="respons">
        <div data-aos="fade-up" className="grid md:grid-cols-2 gap-8">
          <PromoCard
            image="/images/gallery/zanzi2.png"
            title="Unforgettable Safari Deals"
            subtitle="Don't miss out"
            buttonText="Explore Safaris"
            buttonLink="/tours"
          />
          <PromoCard
            image="/images/gallery/zanzi3.png"
            title="All-Time Zanzibar Favourite"
            subtitle="In Zanzibar"
            buttonText="Zanzibar Trips"
            buttonLink="/tours/zanzibar-trips"
          />
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
