import svgPaths from "./svg-5utofykwue";

function Container() {
  return (
    <div className="content-stretch flex flex-col h-[56.594px] items-start not-italic relative shrink-0 w-[462px]" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28.6px] relative shrink-0 text-[#111827] text-[18px] tracking-[-0.55px] whitespace-nowrap">Complete Payment</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#696d77] text-[0px] w-[209px]">
        <span className="leading-[22.4px] text-[14px]">{`Total Amount: `}</span>
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] text-[#e91835] text-[18px]">₦301,488.37</span>
      </p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[57px] size-[32px] top-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p25024900} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p230c5e00} id="Vector_2" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M8 16H8.01333M24 16H24.0133" id="Vector_3" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[22.398px] left-[18px] top-[58px] w-[110px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[55.16px] not-italic text-[#374151] text-[14px] text-center top-[0.5px] whitespace-nowrap">Cash</p>
    </div>
  );
}

function Button() {
  return (
    <div className="col-1 h-[98.398px] justify-self-stretch relative rounded-[10px] row-1 shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon />
      <Paragraph />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[57px] size-[32px] top-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p30f65280} id="Vector" stroke="var(--stroke-0, #F04438)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M2.66667 13.3333H29.3333" id="Vector_2" stroke="var(--stroke-0, #F04438)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[22.398px] left-[18px] top-[58px] w-[110px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[55.13px] not-italic text-[#f04438] text-[14px] text-center top-[0.5px] whitespace-nowrap">Card</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#fffbfa] col-2 h-[98.398px] justify-self-stretch relative rounded-[10px] row-1 shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#f04438] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon1 />
      <Paragraph1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[57px] size-[32px] top-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p26ab5000} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M16 24H16.0133" id="Vector_2" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[22.398px] left-[18px] top-[58px] w-[110px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[55.05px] not-italic text-[#374151] text-[14px] text-center top-[0.5px] whitespace-nowrap">Transfer</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="col-3 h-[98.398px] justify-self-stretch relative rounded-[10px] row-1 shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon2 />
      <Paragraph2 />
    </div>
  );
}

function Container2() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[98.398px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[207px] size-[48px] top-[26px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Icon">
          <path d={svgPaths.p1c0f7b80} id="Vector" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M16 12H32" id="Vector_2" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M32 28V36" id="Vector_3" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M32 20H32.02" id="Vector_4" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M24 20H24.02" id="Vector_5" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M16 20H16.02" id="Vector_6" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M24 28H24.02" id="Vector_7" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M16 28H16.02" id="Vector_8" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M24 36H24.02" id="Vector_9" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M16 36H16.02" id="Vector_10" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[22.398px] left-[26px] top-[86px] w-[410px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[205.23px] not-italic text-[#e91835] text-[14px] text-center top-[0.5px] whitespace-nowrap">Insert or tap card on POS terminal</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[22.398px] left-[26px] top-[108.4px] w-[410px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[205.45px] not-italic text-[#e91835] text-[14px] text-center top-[0.5px] whitespace-nowrap">₦225,753.49</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#fffbfa] h-[156.797px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#fbd2cf] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon3 />
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[303.195px] items-start pt-[16px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[5px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[17px] py-[9px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">Cancel</p>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <Button3 />
      <div className="bg-[#e91835] flex-[1_0_0] min-h-px min-w-px relative rounded-[5px]" data-name="_Button base">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[16px] py-[10px] relative w-full">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Complete - ₦301,488.37</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[5px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
    </div>
  );
}

export default function PaymentMethod() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start px-[25px] py-[17px] relative rounded-[10px] size-full" data-name="payment method">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Container />
      <Container1 />
      <Frame />
    </div>
  );
}