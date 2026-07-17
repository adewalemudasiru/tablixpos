import imgFoodBg from "figma:asset/42d4565f995eeb2e203475eafd5ab4e6497c27a9.png";

function FoodBg() {
  return (
    <div className="-translate-x-1/2 absolute h-[813px] left-1/2 top-0 w-[447.995px]" data-name="food bg">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgFoodBg} />
        <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0" />
      </div>
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center not-italic relative shrink-0 text-center w-full whitespace-nowrap" data-name="Text and supporting text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#111827] text-[24px]">Welcome</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#3c424e] text-[14px]">Choose account type to continue</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
      <TextAndSupportingText />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex h-[45px] items-start relative rounded-[8px] shrink-0 w-full" data-name="Button">
        <div className="bg-[#e91835] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8px]" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center px-[18px] py-[10px] relative size-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Owner</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
      <div className="content-stretch flex h-[45px] items-start relative rounded-[8px] shrink-0 w-full" data-name="Button">
        <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8px]" data-name="_Button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center px-[18px] py-[10px] relative size-full">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22px] not-italic relative shrink-0 text-[#e91835] text-[16px] whitespace-nowrap">Sales Person</p>
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
    <div className="-translate-x-1/2 absolute bg-white bottom-0 content-stretch flex flex-col gap-[33px] h-[361px] items-center left-1/2 p-[15px] rounded-tl-[24px] rounded-tr-[24px] w-[360px]">
      <Frame />
      <Frame2 />
    </div>
  );
}

export default function CashierLogin() {
  return (
    <div className="bg-white relative size-full" data-name="cashier login">
      <FoodBg />
      <Frame1 />
      <div className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[25px] not-italic text-[24px] text-white top-[348px] w-[301px]">
        <p className="mb-0">Simplify Sales,</p>
        <p>Amplify your business.</p>
      </div>
    </div>
  );
}