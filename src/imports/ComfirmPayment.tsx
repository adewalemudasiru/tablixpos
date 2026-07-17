import svgPaths from "./svg-0dm66gja4g";

function Container() {
  return (
    <div className="content-stretch flex flex-col h-[56.594px] items-start not-italic relative shrink-0 w-full" data-name="Container">
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
          <path d={svgPaths.p25024900} id="Vector" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p230c5e00} id="Vector_2" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M8 16H8.01333M24 16H24.0133" id="Vector_3" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[22.398px] left-[18px] top-[58px] w-[110px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[55.16px] not-italic text-[#e91835] text-[14px] text-center top-[0.5px] whitespace-nowrap">Cash</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#fffbfa] col-1 h-[98.398px] justify-self-stretch relative rounded-[10px] row-1 shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#f9afa9] border-solid inset-0 pointer-events-none rounded-[10px]" />
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
          <path d={svgPaths.p30f65280} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M2.66667 13.3333H29.3333" id="Vector_2" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[22.398px] left-[18px] top-[58px] w-[110px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[55.13px] not-italic text-[#111827] text-[14px] text-center top-[0.5px] whitespace-nowrap">Card</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="col-2 h-[98.398px] justify-self-stretch relative rounded-[10px] row-1 shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[10px]" />
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
          <path d={svgPaths.p26ab5000} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M16 24H16.0133" id="Vector_2" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[22.398px] left-[18px] top-[58px] w-[110px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[55.05px] not-italic text-[#111827] text-[14px] text-center top-[0.5px] whitespace-nowrap">Transfer</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="col-3 h-[98.398px] justify-self-stretch relative rounded-[10px] row-1 shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[10px]" />
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

function PrimitiveLabel() {
  return (
    <div className="content-stretch flex h-[19.5px] items-start relative shrink-0 w-[116.063px]" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] whitespace-nowrap">Cash Tendered</p>
    </div>
  );
}

function NumberInput() {
  return (
    <div className="bg-white h-[48px] relative rounded-[6.8px] shrink-0 w-[462px]" data-name="Number Input">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#9ca3af] text-[18px] text-center whitespace-nowrap">0.00</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel />
      <NumberInput />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-white content-stretch flex h-[40px] items-center justify-center left-0 px-[18px] py-[10px] rounded-[6.8px] top-0 w-[148.664px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">₦500.00</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-white content-stretch flex h-[40px] items-center justify-center left-[156.66px] px-[18px] py-[10px] rounded-[6.8px] top-0 w-[148.664px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">₦1,000.00</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-white content-stretch flex h-[40px] items-center justify-center left-[313.33px] px-[18px] py-[10px] rounded-[6.8px] top-0 w-[148.672px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">₦2,000.00</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-white content-stretch flex h-[40px] items-center justify-center left-0 px-[18px] py-[10px] rounded-[6.8px] top-[48px] w-[148.664px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">₦5,000.00</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-white content-stretch flex h-[40px] items-center justify-center left-[156.66px] px-[18px] py-[10px] rounded-[6.8px] top-[48px] w-[148.664px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">₦10,000.00</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-white content-stretch flex h-[40px] items-center justify-center left-[313.33px] px-[18px] py-[10px] rounded-[6.8px] top-[48px] w-[148.672px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">₦20,000.00</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[88px] relative shrink-0 w-full" data-name="Container">
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-center left-0 px-[18px] py-[10px] rounded-[6.8px] top-0 w-[148.664px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] text-center whitespace-nowrap">1</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-center left-[156.66px] px-[18px] py-[10px] rounded-[6.8px] top-0 w-[148.664px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] text-center whitespace-nowrap">2</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-center left-[313.33px] px-[18px] py-[10px] rounded-[6.8px] top-0 w-[148.672px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] text-center whitespace-nowrap">3</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-center left-0 px-[18px] py-[10px] rounded-[6.8px] top-[56px] w-[148.664px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] text-center whitespace-nowrap">4</p>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-center left-[156.66px] px-[18px] py-[10px] rounded-[6.8px] top-[56px] w-[148.664px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] text-center whitespace-nowrap">5</p>
    </div>
  );
}

function Button14() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-center left-[313.33px] px-[18px] py-[10px] rounded-[6.8px] top-[56px] w-[148.672px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] text-center whitespace-nowrap">6</p>
    </div>
  );
}

function Button15() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-center left-0 px-[18px] py-[10px] rounded-[6.8px] top-[112px] w-[148.664px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] text-center whitespace-nowrap">7</p>
    </div>
  );
}

function Button16() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-center left-[156.66px] px-[18px] py-[10px] rounded-[6.8px] top-[112px] w-[148.664px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] text-center whitespace-nowrap">8</p>
    </div>
  );
}

function Button17() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-center left-[313.33px] px-[18px] py-[10px] rounded-[6.8px] top-[112px] w-[148.672px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] text-center whitespace-nowrap">9</p>
    </div>
  );
}

function Button18() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-center left-0 px-[18px] py-[10px] rounded-[6.8px] top-[168px] w-[148.664px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] text-center whitespace-nowrap">0</p>
    </div>
  );
}

function Button19() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-center left-[156.66px] px-[18px] py-[10px] rounded-[6.8px] top-[168px] w-[148.664px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] text-center whitespace-nowrap">,</p>
    </div>
  );
}

function Button20() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-center left-[313.33px] px-[18px] py-[10px] rounded-[6.8px] top-[168px] w-[148.672px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] text-center whitespace-nowrap">.</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[216px] relative shrink-0 w-full" data-name="Container">
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
      <Button15 />
      <Button16 />
      <Button17 />
      <Button18 />
      <Button19 />
      <Button20 />
    </div>
  );
}

function Button21() {
  return (
    <div className="bg-white flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[6.8px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[18px] py-[10px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">Clear</p>
        </div>
      </div>
    </div>
  );
}

function Button22() {
  return (
    <div className="bg-white flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[6.8px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[18px] py-[10px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">← Delete</p>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Button21 />
      <Button22 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[464px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container5 />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[610.398px] items-start pt-[16px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Button23() {
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
      <Button23 />
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

export default function ComfirmPayment() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[25px] relative rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] size-full" data-name="comfirm payment">
      <Container />
      <Container1 />
      <Frame />
    </div>
  );
}