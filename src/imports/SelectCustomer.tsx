import svgPaths from "./svg-kloj8r3rqd";

function TextInput() {
  return (
    <div className="bg-white h-[40px] relative rounded-[6.8px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#9ca3af] text-[14px] whitespace-nowrap">Search by name, phone, or email...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p32ddfd00} id="Vector" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#fffbfa] relative rounded-[5px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#fbd2cf] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start justify-between px-[10px] py-[5px] relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] not-italic relative shrink-0 text-[#111827] text-[12px] whitespace-nowrap">Walk-in Customer</p>
        <Icon />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[22.4px] min-h-px min-w-px not-italic relative text-[12px] whitespace-nowrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#111827]">Allen Ace</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#3c424e]">09012059519</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[5px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start justify-between px-[10px] py-[5px] relative w-full">
        <Frame3 />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[22.4px] min-h-px min-w-px not-italic relative text-[12px] whitespace-nowrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#111827]">Allen Ace</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#3c424e]">09012059519</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[5px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start justify-between px-[10px] py-[5px] relative w-full">
        <Frame4 />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[22.4px] min-h-px min-w-px not-italic relative text-[12px] whitespace-nowrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#111827]">Allen Ace</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#3c424e]">09012059519</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative rounded-[5px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start justify-between px-[10px] py-[5px] relative w-full">
        <Frame5 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <TextInput />
      <Frame />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center justify-center px-[17px] py-[9px] relative rounded-[6.8px] shrink-0 w-[80.289px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">Cancel</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[227px]">
      <Button4 />
      <div className="bg-[#e91835] relative rounded-[8px] shrink-0" data-name="_Button base">
        <div className="content-stretch flex items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit]">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Add Customer</p>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[74px] items-end justify-center min-h-px min-w-px relative">
      <Frame1 />
      <Frame6 />
    </div>
  );
}

export default function SelectCustomer() {
  return (
    <div className="bg-white relative rounded-[10px] size-full" data-name="Select customer">
      <div className="content-stretch flex items-center overflow-clip p-[17px] relative rounded-[inherit] size-full">
        <Frame2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}