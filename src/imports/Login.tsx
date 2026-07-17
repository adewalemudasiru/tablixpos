import svgPaths from "./svg-fida2v7zc7";
import imgFoodBg from "figma:asset/42d4565f995eeb2e203475eafd5ab4e6497c27a9.png";

function VuesaxBoldFlash() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/bold/flash">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.8 20.8">
        <g id="flash">
          <path d={svgPaths.p38f20500} fill="var(--fill-0, #E91835)" id="Vector" />
          <g id="Vector_2" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center not-italic relative shrink-0 text-center w-full whitespace-nowrap" data-name="Text and supporting text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#111827] text-[24px]">Welcome</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#3c424e] text-[14px]">Sign in to access your administrator system</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <TextAndSupportingText />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px not-italic relative text-[#696d77] text-[16px]">Enter email address</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative w-full">
          <Content />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Email</p>
      <Input />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center px-[30px] py-[20px] relative w-full">
          <Frame />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Input field">
            <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="_Input field base">
              <InputWithLabel />
            </div>
          </div>
          <div className="content-stretch flex items-start relative rounded-[8px] shrink-0 w-full" data-name="Button">
            <div className="bg-[#e91835] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]" data-name="_Button base">
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-center px-[20px] py-[12px] relative w-full">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Continue</p>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
            </div>
          </div>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#3c424e] text-[0px] text-[14px] whitespace-nowrap">
            <span className="leading-[22px]">{`New to Tablix? `}</span>
            <span className="decoration-solid leading-[22px] underline">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-center justify-center left-[130px] top-[113px] w-[537px]">
      <div className="content-stretch flex items-end relative shrink-0" data-name="tablix pos logo">
        <div className="relative shrink-0 size-[20.8px]" data-name="share">
          <VuesaxBoldFlash />
        </div>
        <div className="h-[26px] relative shrink-0 w-[84.209px]" data-name="tablix">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84.2086 26">
            <g id="tablix">
              <path d={svgPaths.p2d7fa700} fill="var(--fill-0, #080B12)" />
              <path d={svgPaths.p35636e00} fill="var(--fill-0, #080B12)" />
              <path d={svgPaths.p12c6bd40} fill="var(--fill-0, #080B12)" />
              <path d={svgPaths.p3859db80} fill="var(--fill-0, #080B12)" />
              <path d={svgPaths.p1cf71640} fill="var(--fill-0, #080B12)" />
              <path d={svgPaths.p1c17eb00} fill="var(--fill-0, #080B12)" />
            </g>
          </svg>
        </div>
      </div>
      <Frame1 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22px] not-italic relative shrink-0 text-[#111827] text-[14px] text-right whitespace-nowrap">Forget Password</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[36px] p-[20px] rounded-[10px] top-[65px]">
      <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[40px] text-white w-[301px]">
        <p className="mb-0">Simplify Sales,</p>
        <p>Amplify your business.</p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="bg-white relative size-full" data-name="login">
      <Frame2 />
      <div className="absolute h-[1058px] overflow-clip right-0 top-0 w-[583px]" data-name="food bg">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgFoodBg} />
          <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0" />
        </div>
        <Frame3 />
      </div>
    </div>
  );
}