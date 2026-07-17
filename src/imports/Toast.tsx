import svgPaths from "./svg-8mjvgfw7nc";

export default function Toast() {
  return (
    <div className="bg-[#ecfdf3] border border-[#bffcd9] border-solid relative rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] size-full" data-name="Toast">
      <div className="absolute content-stretch flex flex-col h-[19.5px] items-start left-[39px] top-[16px] w-[231.688px]" data-name="Container">
        <div className="flex-[1_0_0] min-h-px min-w-px relative w-[231.688px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
            <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#008a2e] text-[13px] top-px tracking-[-0.0762px] whitespace-nowrap">OTP Verified Successfully</p>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex items-center left-[13px] pl-[-1px] size-[16px] top-[17.75px]" data-name="Container">
        <div className="relative shrink-0 size-[20px]" data-name="Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <g id="Icon">
              <path clipRule="evenodd" d={svgPaths.p19773c80} fill="var(--fill-0, #008A2E)" fillRule="evenodd" id="Vector" />
            </g>
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#ecfdf3] content-stretch flex items-center justify-center left-[-7px] p-px rounded-[10px] size-[20px] top-[-7px]" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#bffcd9] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="relative shrink-0 size-[12px]" data-name="Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <g id="Icon">
              <path d="M9 3L3 9" id="Vector" stroke="var(--stroke-0, #008A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
              <path d="M3 3L9 9" id="Vector_2" stroke="var(--stroke-0, #008A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}