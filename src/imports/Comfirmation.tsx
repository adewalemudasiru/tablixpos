import svgPaths from "./svg-7igu7hd4h2";

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-full" data-name="Text and supporting text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#111827] text-[18px] w-full">Confirmation</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#696d77] text-[14px] w-full">Are you sure you want to logout ?</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-h-px min-w-px relative" data-name="Content">
      <TextAndSupportingText />
      <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="_Modal actions">
        <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative rounded-[8px]" data-name="Button">
          <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]" data-name="_Button base">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center justify-center px-[18px] py-[10px] relative w-full">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#344054] text-[16px] whitespace-nowrap">Cancel</p>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative rounded-[8px]" data-name="Button">
          <div className="bg-[#f04438] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]" data-name="_Button base">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center justify-center px-[18px] py-[10px] relative w-full">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Yes, Logout</p>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[#f04438] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Comfirmation() {
  return (
    <div className="bg-white content-stretch flex gap-[24px] items-start overflow-clip p-[24px] relative rounded-[12px] shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.1),0px_8px_8px_-4px_rgba(16,24,40,0.04)] size-full" data-name="comfirmation">
      <div className="bg-[#fee4e2] relative rounded-[28px] shrink-0 size-[48px]" data-name="Featured icon">
        <div aria-hidden="true" className="absolute border-8 border-[#fef3f2] border-solid inset-[-4px] pointer-events-none rounded-[32px]" />
        <div className="absolute left-[12px] overflow-clip size-[24px] top-[12px]" data-name="alert-circle">
          <div className="absolute inset-[8.33%]" data-name="Icon">
            <div className="absolute inset-[-5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <path d={svgPaths.p2be53f00} id="Icon" stroke="var(--stroke-0, #D92D20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Content />
    </div>
  );
}