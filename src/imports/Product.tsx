import svgPaths from "./svg-atdwszhom7";

export default function Product() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] size-full" data-name="Product">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="relative shrink-0 w-full" data-name="Container">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
          <div className="bg-[#f3f4f6] h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center pr-[0.008px] relative size-full">
                <div className="relative shrink-0 size-[32px]" data-name="Icon">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g id="Icon">
                      <path d={svgPaths.p362f5e00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d={svgPaths.p26b4fb80} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d={svgPaths.pb3be080} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
            <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Asun Rice</p>
          </div>
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦2,500</p>
          <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
                <div className="relative shrink-0 size-[20px]" data-name="add">
                  <div className="absolute contents inset-0" data-name="vuesax/linear/add">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <g id="add">
                        <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
          </div>
        </div>
      </div>
    </div>
  );
}