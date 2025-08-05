import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

import { ArrowRight, Calendar, MapPin, Phone, Users } from "lucide-react";

// Glass Button (for backdrop blur sections)
export function GlassButton({
  children,
  className = "",
  icon: Icon,
  ...props
}) {
  return (
    <Button
      className={`bg-primary/70 border border-primary text-black px-10 py-5 rounded-full font-semibold text-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-xl ${className}`}
      {...props}
    >
      {Icon && <Icon className="inline-block w-5 h-5 mr-2" />}
      {children}
    </Button>
  );
}

// Primary CTA Button
export function PrimaryButton({ children, className = "", ...props }) {
  return (
    <Button
      className={`bg-primary text-accent px-6 py-6 text-md rounded font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 ${className}`}
      {...props}
    >
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}

// Secondary Button
export function SecondaryButton({ children, className = "", ...props }) {
  return (
    <Button
      className={`bg-accent text-primary px-6 py-6 text-md rounded font-semibold hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

// Small Action Button
export function ActionButton({
  children,
  className = "",
  icon: Icon,
  ...props
}) {
  return (
    <Button
      className={`bg-primary hover:bg-secondary px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${className}`}
      {...props}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </Button>
  );
}

// Tour Card Button
export function TourButton({ children, className = "", ...props }) {
  return (
    <Button
      className={`bg-secondary hover:bg-primary text-bgcolor px-6 py-4 rounded-full font-bold transition-all duration-300 w-full ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

// Icon Button
export function OutlineButton({ children, className = "", ...props }) {
  return (
    <Button
      className={` text-accent border border-accent px-6 py-6 text-md rounded font-semibold hover:bg-accent hover:text-primary transition-all duration-300 transform hover:scale-105 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export const ButtonLink = ({ name, href, alt }) => {
  return (
    <>
      <Button
        asChild
        variant="pro-primary"
        className="rounded-none px-5 bg-primary text-white uppercase"
      >
        <Link alt={alt} href={href}>
          {name}
        </Link>
      </Button>
    </>
  );
};

export const ButtonLink2 = ({ name, className, href, alt }) => {
  return (
    <>
      <Button
        asChild
        variant="pro-secondary"
        className={`rounded-none px-5 bg-secondary text-white uppercase ${className}`}
      >
        <Link alt={alt} href={href}>
          {name}
        </Link>
      </Button>
    </>
  );
};

export const CTAButton = ({ children, className = "", ...props }) => {
  return (
    <Button
      className={`bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-bgcolor font-jua font-bold px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 btn-glow ${className}`}
      {...props}
    >
      {children}
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  );
};

export const BookNowButton = ({ className = "", ...props }) => {
  return (
    <PrimaryButton className={`${className}`} {...props}>
      <Calendar className="mr-2 h-4 w-4" />
      Book Now
    </PrimaryButton>
  );
};

export const ViewDetailsButton = ({ className = "", ...props }) => {
  return (
    <SecondaryButton className={`${className}`} {...props}>
      View Details
      <ArrowRight className="ml-2 h-4 w-4" />
    </SecondaryButton>
  );
};

export const PlanTripButton = ({ className = "" }) => {
  return (
    <Link
      href={"/plan-your-safari"}
      className={`bg-transparent border-2 flex items-center border-primary text-primary hover:bg-primary hover:text-bgcolor font-jua font-bold px-6 py-2 rounded-full transitions ${className}`}
    >
      <MapPin className="mr-2 h-4 w-4" />
      Plan a Trip
    </Link>
  );
};

export const GroupTourButton = ({ className = "", ...props }) => {
  return (
    <SecondaryButton className={`${className}`} {...props}>
      <Users className="mr-2 h-4 w-4" />
      Group Tours
    </SecondaryButton>
  );
};
