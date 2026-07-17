function ButtonSvg() {
  return (
    <div className="absolute left-[628px] size-[20px] top-[24px]" data-name="Button → SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Button â SVG">
          <path d="M15 5L5 15" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M5 5L15 15" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="bg-white h-[69px] shrink-0 sticky top-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] h-[24px] justify-center leading-[0] left-[16px] not-italic text-[#101828] text-[16px] top-[34px] w-[32.584px]">
        <p className="leading-[24px]">Rice</p>
      </div>
      <ButtonSvg />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#fffbfa] h-[84px] relative rounded-[8px] shrink-0 w-[306px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#f9afa9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] h-[43px] justify-center leading-[24px] left-[calc(50%+1.3px)] not-italic text-[#101828] text-[16px] text-center top-[42px] w-[73.296px]">
        <p className="mb-0">ofado</p>
        <p className="text-[#4a5565]">+₦220.00</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[84px] relative rounded-[8px] shrink-0 w-[306px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] h-[43px] justify-center leading-[24px] left-[calc(50%+1.3px)] not-italic text-[#101828] text-[16px] text-center top-[42px] w-[73.296px]">
        <p className="mb-0">ofado</p>
        <p className="text-[#4a5565]">+₦220.00</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Button />
      <Button1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['SF_Pro_Text:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#101828] text-[16px] w-full">
        <p className="leading-[24px]">Select Size/Variant</p>
      </div>
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['SF_Pro_Text:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5565] text-[16px] w-full">
        <p className="leading-[24px]">foods</p>
      </div>
      <Frame2 />
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[60px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] h-[24px] justify-center leading-[0] left-[calc(50%-270.69px)] not-italic text-[#101828] text-[16px] text-center top-[30px] w-[46.616px]">
        <p className="leading-[24px]">Chess</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] h-[19px] justify-center leading-[0] left-[calc(50%+253.36px)] not-italic text-[#4a5565] text-[16px] text-center top-[30px] w-[87.67px]">
        <p className="leading-[24px]">+₦2,000.00</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['SF_Pro_Text:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#101828] text-[16px] w-full">
        <p className="leading-[24px]">Add-ons</p>
      </div>
      <Button2 />
    </div>
  );
}

function Svg() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[8px] shrink-0 size-[46px]" data-name="Button">
      <Svg />
    </div>
  );
}

function Svg1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[23px] top-1/2" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
        <g id="SVG">
          <path d="M4.79204 11.5H18.2087" id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.91667" />
          <path d="M11.5 4.79092V18.2076" id="Vector_2" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.91667" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[9.2px] shrink-0 size-[46px]" data-name="Button">
      <Svg1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[25px] items-center relative shrink-0 w-full">
      <Button3 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[16px] text-center w-[7.463px]">
        <p className="leading-[24px]">1</p>
      </div>
      <Button4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[149.463px]">
      <div className="flex flex-col font-['SF_Pro_Text:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#101828] text-[16px] w-full">
        <p className="leading-[24px]">Quantity</p>
      </div>
      <Frame4 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[26px] items-start relative shrink-0 w-[624px]">
      <Frame3 />
      <Frame />
      <Frame5 />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-[#e91835] font-['Inter:Semi_Bold',sans-serif] font-semibold h-[56px] leading-[0] left-[16px] not-italic right-[16px] rounded-[8px] text-[16px] text-center text-white top-[17px] whitespace-nowrap" data-name="Button">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[calc(50%-253px)] top-[28px]">
        <p className="leading-[24px]">Add to Cart</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[calc(50%+261.5px)] top-[28px]">
        <p className="leading-[24px]">₦1,720.00</p>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder1() {
  return (
    <div className="bg-white h-[89px] shrink-0 sticky top-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <Button5 />
    </div>
  );
}

export default function Mdodal() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[46px] items-center overflow-clip relative rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Mdodal">
      <BackgroundHorizontalBorder />
      <Frame6 />
      <BackgroundHorizontalBorder1 />
    </div>
  );
}