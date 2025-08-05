// *************** PROPS ******************
import { ActionButton, PrimaryButton } from "../buttons";
import Link from "next/link";

export const SideBanner1 = ({ title, sub, link, linkText, smallSub }) => (
  <div
    data-aos="fade-up"
    className="bg-highlight rounded-xl p-6 text-white relative overflow-hidden"
  >
    {/* Content */}
    <div className="relative z-10 space-y-4">
      <h3 className="font-bold">{title}</h3>

      <p className="text-sm leading-relaxed mb-3 text-textcolor">{sub} </p>

      <div className="flex flex-wrap gap-3 items-center justify-between">
        <Link
          href={link || "#"}
          className="text-sm px-6 font-medium py-2 rounded-full bg-primary text-black"
        >
          {linkText}
        </Link>
        <span className="text-sm px-4 py-1.5 bg-primary/10 rounded-full text-primary">
          {smallSub}
        </span>
      </div>
    </div>
  </div>
);

export const SideBanner2 = ({ title, sub, link, linkText }) => (
  <div
    data-aos="fade-up"
    className="bg-gradient-to-br from-secondary to-secondary rounded-xl p-6 text-black relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
    <div className="relative">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm mb-4">{sub}</p>
      <Link href={link || "#"}>
        <ActionButton className="bg-black text-primary hover:bg-highlight text-sm px-4 py-2">
          {linkText}
        </ActionButton>
      </Link>
    </div>
  </div>
);

export const SideBanner3 = ({ title, sub, link, linkText, Icon }) => (
  <div
    data-aos="fade-up"
    className="bg-primary/20 rounded-xl p-6 border border-primary/30"
  >
    <div className="text-center">
      <Icon className="h-8 w-8 text-secondary mx-auto mb-3" />
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-textcolor mb-4">{sub}</p>
      <Link href={link || "#"}>
        <PrimaryButton className="w-full bg-secondary hover:bg-primary text-sm py-2">
          {linkText}
        </PrimaryButton>
      </Link>
    </div>
  </div>
);

export const SideBanner4 = ({ title, sub, image, Icon, link, smallSub }) => (
  <div
    data-aos="fade-up"
    className="bg-highlight rounded-xl p-6 text-white relative overflow-hidden"
  >
    <img
      src={image || "/images/gallery/zanzi2.png"}
      alt=""
      className="absolute inset-0 opacity-25 object-cover"
    />

    {/* Time Indicator */}
    <div className="absolute  top-2 right-2 flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20">
      <span className="text-xs font-bold text-primary">{smallSub}</span>
    </div>

    {/* Content */}
    <Link href={link || "/"}>
      <div className="relative z-10 space-y-4 hover:scale-95 transitions">
        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-full bg-primary">
            <Icon className="w-4 h-4 text-black" />
          </div>
        </div>

        <h3 className="font-bold text-white">{title}</h3>

        <p className="text-sm leading-relaxed text-gray-300">{sub}</p>
      </div>
    </Link>
  </div>
);
