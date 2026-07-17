import svgPaths from "./svg-q5mnlx1vq1";
import imgContainer from "figma:asset/6d0a98d10ec9f4569905a9b0a47a3368d25c9b61.png";
import imgContainer1 from "figma:asset/cbd129ef50b39b96024c4b299af5391b57f83e53.png";
import imgContainer2 from "figma:asset/48e39375442806674bc611732bba8ab1053c5d72.png";
import imgContainer3 from "figma:asset/ba32cd786fd0fd91fa561790b2b45e4a7984f1a0.png";

function VuesaxLinearMenu() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/menu">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="menu">
          <path d="M3.75 8.75H26.25" id="Vector" stroke="var(--stroke-0, #292D32)" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M3.75 15H26.25" id="Vector_2" stroke="var(--stroke-0, #292D32)" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M3.75 21.25H26.25" id="Vector_3" stroke="var(--stroke-0, #292D32)" strokeLinecap="round" strokeWidth="1.5" />
          <g id="Vector_4" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function VuesaxBoldFlash() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/bold/flash">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
        <g id="flash">
          <path d={svgPaths.p30add40} fill="var(--fill-0, #E91835)" id="Vector" />
          <g id="Vector_2" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex items-end relative shrink-0" data-name="Logo">
      <div className="relative shrink-0 size-[33px]" data-name="share">
        <VuesaxBoldFlash />
      </div>
      <div className="h-[33.346px] relative shrink-0 w-[108px]" data-name="tablix">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 108 33.3458">
          <g id="tablix">
            <path d={svgPaths.p3c956500} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p7108500} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p134ade00} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p207b6121} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p25a44800} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p3bbdf480} fill="var(--fill-0, #111827)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[30px]" data-name="menu">
        <VuesaxLinearMenu />
      </div>
      <Logo />
    </div>
  );
}

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
      <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
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

function Heading1() {
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
        <Heading1 />
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

function Heading2() {
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
        <Heading2 />
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

function Heading3() {
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
        <Heading3 />
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

function Heading4() {
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
        <Heading4 />
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

function Frame2() {
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

function Heading5() {
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
        <Heading5 />
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

function Heading6() {
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
        <Heading6 />
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

function Heading7() {
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
        <Heading7 />
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

function Heading8() {
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
        <Heading8 />
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

function Frame4() {
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

function Heading9() {
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
        <Heading9 />
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

function Heading10() {
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
        <Heading10 />
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

function Heading11() {
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
        <Heading11 />
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

function Heading12() {
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
        <Heading12 />
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

function Frame5() {
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

function Heading13() {
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
        <Heading13 />
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

function Heading14() {
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
        <Heading14 />
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

function Heading15() {
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
        <Heading15 />
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

function Heading16() {
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
        <Heading16 />
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

function Frame6() {
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

function Frame7() {
  return (
    <div className="h-[839px] relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start overflow-x-clip overflow-y-auto relative size-full">
        <Frame2 />
        <Frame4 />
        <Frame5 />
        <Frame6 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[24px] items-start left-[179px] overflow-x-auto overflow-y-clip p-[17px] rounded-[14px] top-[101px] w-[909px]" data-name="Container">
      <div className="h-[37px] relative shrink-0 w-[875px]" data-name="New Search">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
          <InputWithLabel />
        </div>
      </div>
      <Frame7 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[#111827] text-[18px] top-0 tracking-[-0.4395px] whitespace-nowrap">Shopping Cart</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[69px] relative shrink-0 w-[383px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[16px] px-[16px] relative size-full">
        <Heading />
      </div>
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Customer</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] whitespace-nowrap">Walk-in Customer</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative w-full">
          <Content1 />
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="chevron-down">
            <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Icon">
              <div className="absolute inset-[-16.67%_-8.33%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 6.66667">
                  <path d={svgPaths.p1b1fa300} id="Icon" stroke="var(--stroke-0, #696D77)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputWithLabel1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Input with label">
      <Input1 />
    </div>
  );
}

function Container36() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[349px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start pt-[16px] px-[16px] relative size-full">
        <PrimitiveLabel />
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-[317px]" data-name="_Input dropdown base">
          <InputWithLabel1 />
        </div>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[109px] items-start p-px relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container36 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[16px] top-[16px] w-[351px]">
      <Container35 />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[58.102px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#3c424e] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Subtotal:</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[46.516px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic right-[20px] text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] translate-x-full whitespace-nowrap">₦0</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[28.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#3c424e] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">VAT:</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[53.383px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic right-[20px] text-[#111827] text-[14px] top-[0.5px] tracking-[-0.1504px] translate-x-full whitespace-nowrap">₦0</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[28px] relative shrink-0 w-[107.445px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic right-[29px] text-[#e91835] text-[20px] top-0 tracking-[-0.4492px] translate-x-full whitespace-nowrap">₦0</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex h-[28px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">Total:</p>
      <Text4 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col h-[37px] items-start pt-[9px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-solid border-t inset-0 pointer-events-none" />
      <Container41 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-[317px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative w-full">
        <Container38 />
        <Container39 />
        <Container40 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[16px] p-[18px] rounded-[5px] top-[695px] w-[351px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Frame />
    </div>
  );
}

function Container34() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[383px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Frame1 />
        <Container37 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[69px] relative shrink-0 w-[383px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[17px] px-[16px] relative size-full">
        <div className="bg-[#e91835] relative rounded-[5px] shrink-0 w-full" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center px-[16px] py-[10px] relative w-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">CHECKOUT</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[5px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function Crt() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[977px] items-start left-[1128px] top-0 w-[384px]" data-name="Crt">
      <Container33 />
      <Container34 />
      <Container42 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[16.67%_14.88%_20.23%_16.67%]" data-name="Group">
      <div className="absolute inset-[-4.23%_-3.89%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.7084 16.4242">
          <g id="Group">
            <path d={svgPaths.pa7e7cc0} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.27968" />
            <path d={svgPaths.p1096d900} id="Vector_2" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeWidth="1.27968" />
            <path d={svgPaths.p1281a680} id="Vector_3" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.27968" />
            <path d={svgPaths.p226b1c00} id="Vector_4" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeWidth="1.27968" />
            <path d={svgPaths.p104b3280} id="Vector_5" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.27968" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function VuesaxLinearCategory() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/category-2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="category-2">
          <path d={svgPaths.p35c27000} id="Vector" stroke="var(--stroke-0, #292D32)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
          <path d={svgPaths.p5ac0310} id="Vector_2" stroke="var(--stroke-0, #292D32)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
          <path d={svgPaths.p335f3460} id="Vector_3" stroke="var(--stroke-0, #292D32)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
          <path d={svgPaths.p438b800} id="Vector_4" stroke="var(--stroke-0, #292D32)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
          <g id="Vector_5" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

export default function Dashbaord() {
  return (
    <div className="bg-[#f9fafb] relative size-full" data-name="Dashbaord">
      <div className="absolute bg-white content-stretch flex h-[69px] items-center left-0 pl-[24px] pr-[40px] py-[20px] top-0 w-[1128px]" data-name="Header">
        <div aria-hidden="true" className="absolute border-[#d0d5dd] border-b border-solid inset-0 pointer-events-none" />
        <Frame3 />
      </div>
      <Container />
      <Crt />
      <div className="absolute backdrop-blur-[8px] bg-white content-stretch flex flex-col gap-[15px] items-center justify-center left-[28px] p-[15px] rounded-[8px] top-[101px] w-[123px]" data-name="food side bar">
        <div className="bg-[#e91835] content-stretch flex flex-col gap-[12px] h-[77px] items-center px-[21px] py-[9px] relative rounded-[5px] shadow-[0px_2px_4px_0px_rgba(233,24,53,0.1)] shrink-0 w-[102px]" data-name="Nav menu">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu">
            <div className="absolute inset-[8.33%_8.33%_53.51%_53.51%]" data-name="Vector">
              <div className="absolute inset-[-10.92%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1576 11.1576">
                  <path d={svgPaths.p101eb340} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[13.75%_8.33%_8.33%_8.5%]" data-name="Vector">
              <div className="absolute inset-[-5.35%_-5.01%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.9606 20.7">
                  <path d={svgPaths.p154bb180} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[64.58%_64.58%_9.17%_8.75%]" data-name="Vector">
              <div className="absolute inset-[-15.87%_-15.63%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.4 8.3">
                  <path d="M1 7.3L7.4 1" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-1/2 left-1/2 right-[20.83%] top-[20.83%]" data-name="Vector">
              <div className="absolute inset-[-14.29%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                  <path d="M8 1L1 8" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
            <p className="leading-[15.75px]">All Menu</p>
          </div>
          <div className="-translate-y-1/2 absolute bg-white h-[38px] left-0 rounded-[20px] top-[calc(50%+0.5px)] w-[5px]" data-name="Indicator" />
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[12px] h-[77px] items-center px-[21px] py-[9px] relative rounded-[5px] shrink-0 w-[102px]" data-name="Nav menu">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="ri:drinks-line">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[19px] left-[calc(50%-0.36px)] top-[calc(50%+0.5px)] w-[17.273px]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.2727 19">
                <path d={svgPaths.p37afff80} fill="var(--fill-0, #111827)" id="Vector" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">
            <p className="leading-[15.75px]">Beverages</p>
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[12px] h-[77px] items-center px-[21px] py-[9px] relative rounded-[5px] shrink-0 w-[102px]" data-name="Nav menu">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="circum:burger">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[15px] left-[calc(50%-0.49px)] top-[calc(50%+0.5px)] w-[17.018px]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0182 15">
                <path d={svgPaths.p3a65cf70} fill="var(--fill-0, #111827)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[25.51%_47.92%_70.32%_47.92%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 1">
                <path d={svgPaths.p3c51c570} fill="var(--fill-0, #111827)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[32.6%_63.24%_63.24%_32.6%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 1">
                <path d={svgPaths.p3c51c570} fill="var(--fill-0, #111827)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[32.6%_32.6%_63.24%_63.23%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 1">
                <path d={svgPaths.p3c51c570} fill="var(--fill-0, #111827)" id="Vector" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">
            <p className="leading-[15.75px]">Burger</p>
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[12px] h-[77px] items-center px-[21px] py-[9px] relative rounded-[5px] shrink-0 w-[102px]" data-name="Nav menu">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="ri:drinks-line">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[19px] left-[calc(50%-0.36px)] top-[calc(50%+0.5px)] w-[17.273px]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.2727 19">
                <path d={svgPaths.p37afff80} fill="var(--fill-0, #111827)" id="Vector" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">
            <p className="leading-[15.75px]">Drinks</p>
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[12px] h-[77px] items-center px-[21px] py-[9px] relative rounded-[5px] shrink-0 w-[102px]" data-name="Nav menu">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="material-symbols-light:rice-bowl-outline-rounded">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.5px)] size-[17px] top-[calc(50%+0.5px)]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
                <g id="Vector">
                  <mask fill="white" id="path-1-inside-1_3_1514">
                    <path d={svgPaths.p29003d80} />
                  </mask>
                  <path d={svgPaths.p2972b80} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_3_1514)" />
                </g>
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">
            <p className="leading-[15.75px]">{`Rice & Grains`}</p>
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[12px] h-[77px] items-center px-[21px] py-[9px] relative rounded-[5px] shrink-0 w-[102px]" data-name="Nav menu">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="lsicon:soup-outline">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[16px] left-[calc(50%-0.33px)] top-1/2 w-[17.333px]" data-name="Vector">
              <div className="absolute inset-[-2.78%_-2.56%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.2222 16.8889">
                  <path d={svgPaths.p32f24a00} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.888889" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">
            <p className="leading-[15.75px]">{`Soup & Stew`}</p>
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[12px] h-[77px] items-center px-[21px] py-[9px] relative rounded-[5px] shrink-0 w-[102px]" data-name="Nav menu">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="streamline:chicken-grilled-stream">
            <Group />
          </div>
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">
            <p className="leading-[15.75px]">Protein</p>
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[12px] h-[77px] items-center px-[21px] py-[9px] relative rounded-[5px] shrink-0 w-[102px]" data-name="Nav menu">
          <div className="relative shrink-0 size-[24px]" data-name="category-2">
            <VuesaxLinearCategory />
          </div>
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">
            <p className="leading-[15.75px]">Other Menu</p>
          </div>
        </div>
      </div>
    </div>
  );
}