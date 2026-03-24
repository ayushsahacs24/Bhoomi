import svgPaths from "./svg-wvg5xpx726";
import imgAvatar from "figma:asset/cfe753633a073c55eeee417a70d9d8af308497c4.png";
import imgAvatar1 from "figma:asset/054dfe02e425078fdd66113858fbed2e929f9c10.png";

function StateLayer() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center relative shrink-0 w-full" data-name="State-layer">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute inset-[16.67%]" data-name="icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p3997600} fill="var(--fill-0, #49454F)" id="icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shrink-0 w-[40px]" data-name="Content">
      <StateLayer />
    </div>
  );
}

function TitleHeader() {
  return (
    <div className="bg-[#fef7ff] h-[48px] relative shrink-0 w-full" data-name="Title header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <div className="content-stretch flex items-center justify-center relative shrink-0 size-[48px]" data-name="Icon button - standard">
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="overflow-clip pointer-events-none relative rounded-[1000px] shrink-0 size-[96px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[1000px] size-full" src={imgAvatar} />
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute bg-[#ece6f0] inset-0" />
        <img alt="" className="absolute max-w-none mix-blend-luminosity object-contain size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Item 01">
      <Avatar />
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[#1d1b20] text-[14px] text-center text-ellipsis tracking-[0.1px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Label
      </p>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="overflow-clip pointer-events-none relative rounded-[1000px] shrink-0 size-[96px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[1000px] size-full" src={imgAvatar} />
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute bg-[#ece6f0] inset-0" />
        <img alt="" className="absolute max-w-none mix-blend-luminosity object-contain size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Item 02">
      <Avatar1 />
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[#1d1b20] text-[14px] text-center text-ellipsis tracking-[0.1px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Label
      </p>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="overflow-clip pointer-events-none relative rounded-[1000px] shrink-0 size-[96px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[1000px] size-full" src={imgAvatar} />
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute bg-[#ece6f0] inset-0" />
        <img alt="" className="absolute max-w-none mix-blend-luminosity object-contain size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Item 03">
      <Avatar2 />
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[20px] min-w-full overflow-hidden relative shrink-0 text-[#1d1b20] text-[14px] text-center text-ellipsis tracking-[0.1px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Label
      </p>
    </div>
  );
}

function Avatar3() {
  return (
    <div className="overflow-clip pointer-events-none relative rounded-[1000px] shrink-0 size-[96px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[1000px] size-full" src={imgAvatar} />
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute bg-[#ece6f0] inset-0" />
        <img alt="" className="absolute max-w-none mix-blend-luminosity object-contain size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Item 04">
      <Avatar3 />
    </div>
  );
}

function Image() {
  return (
    <div className="absolute inset-0 rounded-[1000px]" data-name="Image">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[1000px]">
        <div className="absolute bg-[#ece6f0] inset-0 rounded-[1000px]" />
        <img alt="" className="absolute max-w-none mix-blend-luminosity object-contain rounded-[1000px] size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function Avatar4() {
  return (
    <div className="overflow-clip relative rounded-[1000px] shrink-0 size-[96px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[1000px] size-full" src={imgAvatar} />
      <Image />
    </div>
  );
}

function Item4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Item 05">
      <Avatar4 />
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute inset-0 rounded-[1000px]" data-name="Image">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[1000px]">
        <div className="absolute bg-[#ece6f0] inset-0 rounded-[1000px]" />
        <img alt="" className="absolute max-w-none mix-blend-luminosity object-contain rounded-[1000px] size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function Avatar5() {
  return (
    <div className="overflow-clip relative rounded-[1000px] shrink-0 size-[96px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[1000px] size-full" src={imgAvatar} />
      <Image1 />
    </div>
  );
}

function Item5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Item 06">
      <Avatar5 />
    </div>
  );
}

function Image2() {
  return (
    <div className="absolute inset-0 rounded-[1000px]" data-name="Image">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[1000px]">
        <div className="absolute bg-[#ece6f0] inset-0 rounded-[1000px]" />
        <img alt="" className="absolute max-w-none mix-blend-luminosity object-contain rounded-[1000px] size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function Avatar6() {
  return (
    <div className="overflow-clip relative rounded-[1000px] shrink-0 size-[96px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[1000px] size-full" src={imgAvatar} />
      <Image2 />
    </div>
  );
}

function Item6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Item 07">
      <Avatar6 />
    </div>
  );
}

function Image3() {
  return (
    <div className="absolute inset-0 rounded-[1000px]" data-name="Image">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[1000px]">
        <div className="absolute bg-[#ece6f0] inset-0 rounded-[1000px]" />
        <img alt="" className="absolute max-w-none mix-blend-luminosity object-contain rounded-[1000px] size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function Avatar7() {
  return (
    <div className="overflow-clip relative rounded-[1000px] shrink-0 size-[96px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[1000px] size-full" src={imgAvatar} />
      <Image3 />
    </div>
  );
}

function Item7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Item 08">
      <Avatar7 />
    </div>
  );
}

function Carousel() {
  return (
    <div className="relative shrink-0 w-full" data-name="Carousel">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-start pl-[16px] relative w-full">
          <Item />
          <Item1 />
          <Item2 />
          <Item3 />
          <Item4 />
          <Item5 />
          <Item6 />
          <Item7 />
        </div>
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-[#fef7ff] content-stretch flex flex-col items-start pb-[16px] relative size-full" data-name="Section 1">
      <TitleHeader />
      <Carousel />
    </div>
  );
}