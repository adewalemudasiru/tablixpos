import svgPaths from "./svg-noyhmrk1s3";
import imgContainer from "figma:asset/6d0a98d10ec9f4569905a9b0a47a3368d25c9b61.png";
import imgContainer1 from "figma:asset/cbd129ef50b39b96024c4b299af5391b57f83e53.png";
import imgContainer2 from "figma:asset/48e39375442806674bc611732bba8ab1053c5d72.png";
import imgContainer3 from "figma:asset/ba32cd786fd0fd91fa561790b2b45e4a7984f1a0.png";

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="search">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
              <path d={svgPaths.p36596e80} id="Icon" stroke="var(--stroke-0, #696D77)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#696d77] text-[16px] whitespace-nowrap">Search</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[14px] py-[10px] relative size-full">
          <Content />
        </div>
      </div>
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Input with label">
      <Input />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Fiesta Fried Rice</p>
    </div>
  );
}

function VuesaxLinearAdd() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container2 />
        <Heading />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦3,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer1} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Asun Rice</p>
    </div>
  );
}

function VuesaxLinearAdd1() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container4 />
        <Heading1 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦2,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd1 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer2} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Friend Plantain</p>
    </div>
  );
}

function VuesaxLinearAdd2() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container6 />
        <Heading2 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦1,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd2 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer3} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">{`Asun `}</p>
    </div>
  );
}

function VuesaxLinearAdd3() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container8 />
        <Heading3 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦3,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd3 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container1 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container3 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container5 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container7 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer1} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Asun Rice</p>
    </div>
  );
}

function VuesaxLinearAdd4() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container10 />
        <Heading4 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦2,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd4 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer1} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Asun Rice</p>
    </div>
  );
}

function VuesaxLinearAdd5() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container12 />
        <Heading5 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦2,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd5 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer1} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Asun Rice</p>
    </div>
  );
}

function VuesaxLinearAdd6() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container14 />
        <Heading6 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦2,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd6 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer1} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Asun Rice</p>
    </div>
  );
}

function VuesaxLinearAdd7() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container16 />
        <Heading7 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦2,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd7 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container9 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container11 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container13 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container15 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer1} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Asun Rice</p>
    </div>
  );
}

function VuesaxLinearAdd8() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container18 />
        <Heading8 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦2,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd8 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer1} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Asun Rice</p>
    </div>
  );
}

function VuesaxLinearAdd9() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container20 />
        <Heading9 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦2,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd9 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer1} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Asun Rice</p>
    </div>
  );
}

function VuesaxLinearAdd10() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container22 />
        <Heading10 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦2,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd10 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer1} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Asun Rice</p>
    </div>
  );
}

function VuesaxLinearAdd11() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container24 />
        <Heading11 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦2,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd11 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container17 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container19 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container21 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container23 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer1} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Asun Rice</p>
    </div>
  );
}

function VuesaxLinearAdd12() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container26 />
        <Heading12 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦2,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd12 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer1} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Asun Rice</p>
    </div>
  );
}

function VuesaxLinearAdd13() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container28 />
        <Heading13 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦2,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd13 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer1} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Asun Rice</p>
    </div>
  );
}

function VuesaxLinearAdd14() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container30 />
        <Heading14 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦2,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd14 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[145.664px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgContainer1} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Heading15() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Asun Rice</p>
    </div>
  );
}

function VuesaxLinearAdd15() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <path d="M5 10H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 15V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
        <Container32 />
        <Heading15 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">₦2,500</p>
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add to Cart</p>
              <div className="relative shrink-0 size-[20px]" data-name="add">
                <VuesaxLinearAdd15 />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container25 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container27 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container29 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-[207px]" data-name="Product">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <Container31 />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-[839px] relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start overflow-x-clip overflow-y-auto relative size-full">
        <Frame />
        <Frame1 />
        <Frame2 />
        <Frame3 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start overflow-clip p-[17px] relative rounded-[14px] size-full" data-name="Container">
      <div className="h-[37px] relative shrink-0 w-[875px]" data-name="New Search">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
          <InputWithLabel />
        </div>
      </div>
      <Frame4 />
    </div>
  );
}