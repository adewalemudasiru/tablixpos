import svgPaths from "./svg-vui7v1dlg8";

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

function Frame2() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[30px]" data-name="menu">
        <VuesaxLinearMenu />
      </div>
      <Logo />
    </div>
  );
}

function VuesaxOutlineShoppingCart() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/shopping-cart">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="shopping-cart">
          <g id="Vector">
            <mask fill="white" id="path-1-inside-1_27_11160">
              <path d={svgPaths.p15340980} />
            </mask>
            <path d={svgPaths.p15340980} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p2b5be270} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_27_11160)" />
          </g>
          <g id="Vector_2">
            <mask fill="white" id="path-3-inside-2_27_11160">
              <path d={svgPaths.p118ea280} />
            </mask>
            <path d={svgPaths.p118ea280} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p3904eb70} fill="var(--stroke-0, #111827)" mask="url(#path-3-inside-2_27_11160)" />
          </g>
          <g id="Vector_3">
            <mask fill="white" id="path-5-inside-3_27_11160">
              <path d={svgPaths.p17627600} />
            </mask>
            <path d={svgPaths.p17627600} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p872af0} fill="var(--stroke-0, #111827)" mask="url(#path-5-inside-3_27_11160)" />
          </g>
          <g id="Vector_4">
            <mask fill="white" id="path-7-inside-4_27_11160">
              <path d={svgPaths.p1dd27980} />
            </mask>
            <path d={svgPaths.p1dd27980} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p2506af00} fill="var(--stroke-0, #111827)" mask="url(#path-7-inside-4_27_11160)" />
          </g>
          <g id="Vector_5" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[20px]" data-name="shopping-cart">
        <VuesaxOutlineShoppingCart />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">POS</p>
    </div>
  );
}

function VuesaxLinearGraph() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/graph">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="graph">
          <path d={svgPaths.p194dae80} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p1bc80800} id="Vector_2" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" id="Vector_3" opacity="0" stroke="var(--stroke-0, #111827)" />
        </g>
      </svg>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[20px]" data-name="graph">
        <VuesaxLinearGraph />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Reports</p>
    </div>
  );
}

function VuesaxOutlineBox() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/box">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="box">
          <g id="Vector">
            <mask fill="white" id="path-1-inside-1_27_11235">
              <path d={svgPaths.p11b2fc80} />
            </mask>
            <path d={svgPaths.p11b2fc80} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p20f72500} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_27_11235)" />
          </g>
          <g id="Vector_2">
            <mask fill="white" id="path-3-inside-2_27_11235">
              <path d={svgPaths.p31c0c700} />
            </mask>
            <path d={svgPaths.p31c0c700} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p2dd20e00} fill="var(--stroke-0, #111827)" mask="url(#path-3-inside-2_27_11235)" />
          </g>
          <g id="Vector_3">
            <mask fill="white" id="path-5-inside-3_27_11235">
              <path d={svgPaths.p86f5700} />
            </mask>
            <path d={svgPaths.p86f5700} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p186df600} fill="var(--stroke-0, #111827)" mask="url(#path-5-inside-3_27_11235)" />
          </g>
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" fill="var(--fill-0, #111827)" id="Vector_4" opacity="0" stroke="var(--stroke-0, #111827)" />
        </g>
      </svg>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[20px]" data-name="box">
        <VuesaxOutlineBox />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Inventory</p>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="category-2">
        <div className="absolute inset-[8.33%_8.33%_53.51%_53.51%]" data-name="Vector">
          <div className="absolute inset-[-13.1%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.63131 9.63131">
              <g id="Vector">
                <path d={svgPaths.p2a23dac0} fill="var(--fill-0, #E91835)" />
                <path d={svgPaths.p2a23dac0} stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
        <div className="absolute inset-[13.75%_8.33%_8.33%_8.5%]" data-name="Vector">
          <div className="absolute inset-[-6.42%_-6.01%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.6338 17.5833">
              <g id="Vector">
                <path d={svgPaths.pa6ead40} fill="var(--fill-0, #E91835)" />
                <path d={svgPaths.p399ba7d0} stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
        <div className="absolute inset-[64.58%_64.58%_9.17%_8.75%]" data-name="Vector">
          <div className="absolute inset-[-19.05%_-18.75%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.33333 7.25">
              <g id="Vector">
                <path d="M1 6.25L6.33333 1Z" fill="var(--fill-0, #E91835)" />
                <path d="M1 6.25L6.33333 1" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/2 left-1/2 right-[20.83%] top-[20.83%]" data-name="Vector">
          <div className="absolute inset-[-17.14%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.83333 7.83333">
              <g id="Vector">
                <path d="M6.83333 1L1 6.83333Z" fill="var(--fill-0, #E91835)" />
                <path d="M6.83333 1L1 6.83333" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#e91835] text-[14px] whitespace-nowrap">Menu</p>
    </div>
  );
}

function VuesaxOutlineProfile2User() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/profile-2user">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="profile-2user">
          <g id="Vector">
            <mask fill="white" id="path-1-inside-1_27_11147">
              <path d={svgPaths.p33208d80} />
            </mask>
            <path d={svgPaths.p33208d80} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p29c19f00} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_27_11147)" />
          </g>
          <g id="Vector_2">
            <mask fill="white" id="path-3-inside-2_27_11147">
              <path d={svgPaths.p19e57c40} />
            </mask>
            <path d={svgPaths.p19e57c40} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p21141000} fill="var(--stroke-0, #111827)" mask="url(#path-3-inside-2_27_11147)" />
          </g>
          <g id="Vector_3">
            <mask fill="white" id="path-5-inside-3_27_11147">
              <path d={svgPaths.p1cf7e280} />
            </mask>
            <path d={svgPaths.p1cf7e280} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p362bba00} fill="var(--stroke-0, #111827)" mask="url(#path-5-inside-3_27_11147)" />
          </g>
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" fill="var(--fill-0, #111827)" id="Vector_4" opacity="0" stroke="var(--stroke-0, #111827)" />
          <path d={svgPaths.p2d5b7000} fill="var(--fill-0, #111827)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[20px]" data-name="profile-2user">
        <VuesaxOutlineProfile2User />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Customers</p>
    </div>
  );
}

function VuesaxOutlineGraph() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/graph">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="graph">
          <g id="Vector">
            <mask fill="white" id="path-1-inside-1_27_11226">
              <path d={svgPaths.p9e91f80} />
            </mask>
            <path d={svgPaths.p9e91f80} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p258fea80} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_27_11226)" />
          </g>
          <g id="Vector_2">
            <mask fill="white" id="path-3-inside-2_27_11226">
              <path d={svgPaths.p14883f00} />
            </mask>
            <path d={svgPaths.p14883f00} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p9f7a400} fill="var(--stroke-0, #111827)" mask="url(#path-3-inside-2_27_11226)" />
          </g>
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" fill="var(--fill-0, #111827)" id="Vector_3" opacity="0" stroke="var(--stroke-0, #111827)" />
        </g>
      </svg>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[20px]" data-name="graph">
        <VuesaxOutlineGraph />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Staff</p>
    </div>
  );
}

function VuesaxOutlineDocumentText() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/document-text">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="document-text">
          <g id="Vector">
            <mask fill="white" id="path-1-inside-1_27_11181">
              <path d={svgPaths.p3d7b9f80} />
            </mask>
            <path d={svgPaths.p3d7b9f80} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p103b7d00} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_27_11181)" />
          </g>
          <g id="Vector_2">
            <mask fill="white" id="path-3-inside-2_27_11181">
              <path d={svgPaths.p17c44e00} />
            </mask>
            <path d={svgPaths.p17c44e00} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p38c19000} fill="var(--stroke-0, #111827)" mask="url(#path-3-inside-2_27_11181)" />
          </g>
          <g id="Vector_3">
            <mask fill="white" id="path-5-inside-3_27_11181">
              <path d={svgPaths.p228a900} />
            </mask>
            <path d={svgPaths.p228a900} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p37bc5600} fill="var(--stroke-0, #111827)" mask="url(#path-5-inside-3_27_11181)" />
          </g>
          <g id="Vector_4">
            <mask fill="white" id="path-7-inside-4_27_11181">
              <path d={svgPaths.pd0c4240} />
            </mask>
            <path d={svgPaths.pd0c4240} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p17321880} fill="var(--stroke-0, #111827)" mask="url(#path-7-inside-4_27_11181)" />
          </g>
          <g id="Vector_5" opacity="0" />
          <g id="Vector_6" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[20px]" data-name="document-text">
        <VuesaxOutlineDocumentText />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Expenses</p>
    </div>
  );
}

function VuesaxOutlineDocumentText1() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/document-text">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="document-text">
          <g id="Vector">
            <mask fill="white" id="path-1-inside-1_27_11181">
              <path d={svgPaths.p3d7b9f80} />
            </mask>
            <path d={svgPaths.p3d7b9f80} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p103b7d00} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_27_11181)" />
          </g>
          <g id="Vector_2">
            <mask fill="white" id="path-3-inside-2_27_11181">
              <path d={svgPaths.p17c44e00} />
            </mask>
            <path d={svgPaths.p17c44e00} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p38c19000} fill="var(--stroke-0, #111827)" mask="url(#path-3-inside-2_27_11181)" />
          </g>
          <g id="Vector_3">
            <mask fill="white" id="path-5-inside-3_27_11181">
              <path d={svgPaths.p228a900} />
            </mask>
            <path d={svgPaths.p228a900} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p37bc5600} fill="var(--stroke-0, #111827)" mask="url(#path-5-inside-3_27_11181)" />
          </g>
          <g id="Vector_4">
            <mask fill="white" id="path-7-inside-4_27_11181">
              <path d={svgPaths.pd0c4240} />
            </mask>
            <path d={svgPaths.pd0c4240} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p17321880} fill="var(--stroke-0, #111827)" mask="url(#path-7-inside-4_27_11181)" />
          </g>
          <g id="Vector_5" opacity="0" />
          <g id="Vector_6" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[20px]" data-name="document-text">
        <VuesaxOutlineDocumentText1 />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">{`Billing & Subscription`}</p>
    </div>
  );
}

function VuesaxOutlineSetting() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/setting-2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="setting-2">
          <g id="Vector">
            <mask fill="white" id="path-1-inside-1_27_11142">
              <path d={svgPaths.p26866280} />
            </mask>
            <path d={svgPaths.p26866280} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p370217f0} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_27_11142)" />
          </g>
          <g id="Vector_2">
            <mask fill="white" id="path-3-inside-2_27_11142">
              <path d={svgPaths.p872e500} />
            </mask>
            <path d={svgPaths.p872e500} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p1589fc80} fill="var(--stroke-0, #111827)" mask="url(#path-3-inside-2_27_11142)" />
          </g>
          <path d="M19.5 0.5V19.5H0.5V0.5H19.5Z" fill="var(--fill-0, #111827)" id="Vector_3" opacity="0" stroke="var(--stroke-0, #111827)" />
        </g>
      </svg>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[20px]" data-name="setting-2">
        <VuesaxOutlineSetting />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Settings</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0">
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[248px]" data-name="Nav Item with sub nav">
        <div className="content-stretch flex gap-[105px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="Nav Item">
          <Content />
        </div>
      </div>
      <div className="content-stretch flex gap-[105px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="Nav Item">
        <Content1 />
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[248px]" data-name="Nav Item with sub nav">
        <div className="content-stretch flex gap-[105px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="Nav Item">
          <Content2 />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[248px]" data-name="Nav Item with sub nav">
        <div className="bg-[#fffbfa] content-stretch flex gap-[105px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="Nav Item">
          <Content3 />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[248px]" data-name="Nav Item with sub nav">
        <div className="content-stretch flex gap-[105px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="Nav Item">
          <Content4 />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[248px]" data-name="Nav Item with sub nav">
        <div className="content-stretch flex gap-[105px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="Nav Item">
          <Content5 />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[248px]" data-name="Nav Item with sub nav">
        <div className="content-stretch flex gap-[105px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="Nav Item">
          <Content6 />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[248px]" data-name="Nav Item with sub nav">
        <div className="content-stretch flex gap-[105px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="Nav Item">
          <Content7 />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[248px]" data-name="Nav Item with sub nav">
        <div className="content-stretch flex gap-[105px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="Nav Item">
          <Content8 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-white h-[908px] left-0 top-[69px] w-[285px]" data-name="Sidebar">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[20px] relative rounded-[inherit] size-full">
        <Frame1 />
      </div>
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-full whitespace-nowrap" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#0a0a0a] text-[18px] tracking-[0.3955px]">Menu Management</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#4a5565] text-[16px] tracking-[-0.3125px]">Track stock levels and suppliers</p>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[16px] px-[4px] relative shrink-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#e91835] text-[14px] whitespace-nowrap">Menu Item</p>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[16px] px-[4px] relative shrink-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Category</p>
    </div>
  );
}

function Tabs() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start left-0 top-0" data-name="Tabs">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0" data-name="_Tab button base">
        <Content9 />
        <div className="bg-[#e91835] h-[2px] shrink-0 w-full" data-name="Bottom border" />
      </div>
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0" data-name="_Tab button base">
        <Content10 />
        <div className="h-[2px] shrink-0 w-full" data-name="Bottom border" />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pcddfd00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 17.5L13.9167 13.9167" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-[#fcfcfd] flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[8px]" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10px] py-[4px] relative size-full">
          <Icon />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Search menu items...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 10V2" id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p23ad1400} id="Vector_2" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p19411800} id="Vector_3" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white relative rounded-[6.8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center px-[12px] py-[8px] relative">
        <Icon1 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">Import</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p23ad1400} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p26e09a00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 2V10" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white relative rounded-[6.8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center px-[12px] py-[8px] relative">
        <Icon2 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">Export</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[36px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] h-full items-center relative">
        <Button />
        <Button1 />
        <div className="bg-[#e91835] relative rounded-[8px] shrink-0" data-name="_Button base">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit]">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">+ Add Menu</p>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[213px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Name</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[194px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Price</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[194px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Variant</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[187px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Add-ons</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[186px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-right tracking-[-0.1504px] whitespace-nowrap">Status</p>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="content-stretch flex items-center justify-end px-[15px] py-[12px] relative shrink-0 w-[190px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-right tracking-[-0.1504px] whitespace-nowrap">Action</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="bg-white content-stretch flex items-center relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
      <HeaderCell5 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="content-stretch flex flex-col h-[44px] items-start justify-between relative shrink-0 w-full" data-name="Table Header">
      <TableRow />
    </div>
  );
}

function TableCell() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[213px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Rice</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[194px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">₦1000.00</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[194px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[187px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[186px]" data-name="Table Cell">
      <div className="content-stretch flex items-start mix-blend-multiply relative shrink-0" data-name="Badge">
        <div className="bg-[#ecfdf3] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center whitespace-nowrap">Available</p>
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p38f39800} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p85cdd00} id="Vector_2" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white content-stretch flex gap-[14px] h-[31px] items-center px-[10px] py-[6px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon3 />
      <Icon4 />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="content-stretch flex flex-col h-[65px] items-end p-[16px] relative shrink-0 w-[190px]" data-name="Table Cell">
      <Button2 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[1177px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <TableRow1 />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[213px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Rice</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[194px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">₦1000.00</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[194px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[187px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[186px]" data-name="Table Cell">
      <div className="content-stretch flex items-start mix-blend-multiply relative shrink-0" data-name="Badge">
        <div className="bg-[#ecfdf3] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center whitespace-nowrap">Available</p>
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p38f39800} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p85cdd00} id="Vector_2" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white content-stretch flex gap-[14px] h-[31px] items-center px-[10px] py-[6px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon5 />
      <Icon6 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="content-stretch flex flex-col h-[65px] items-end p-[16px] relative shrink-0 w-[190px]" data-name="Table Cell">
      <Button3 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[1177px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
    </div>
  );
}

function Body1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <TableRow2 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1177px]" data-name="Table">
      <TableHeader />
      <Body />
      <Body1 />
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div className="overflow-auto size-full">
        <div className="content-stretch flex flex-col items-start px-px relative w-full">
          <Table />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[1179px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[16px] w-full">
        <p className="leading-[24px]">Snacks (2)</p>
      </div>
      <BackgroundBorderShadow />
    </div>
  );
}

function HeaderCell6() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[213px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Name</p>
    </div>
  );
}

function HeaderCell7() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[194px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Price</p>
    </div>
  );
}

function HeaderCell8() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[194px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Variant</p>
    </div>
  );
}

function HeaderCell9() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[187px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Add-ons</p>
    </div>
  );
}

function HeaderCell10() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[186px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-right tracking-[-0.1504px] whitespace-nowrap">Status</p>
    </div>
  );
}

function HeaderCell11() {
  return (
    <div className="content-stretch flex items-center justify-end px-[15px] py-[12px] relative shrink-0 w-[190px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-right tracking-[-0.1504px] whitespace-nowrap">Action</p>
    </div>
  );
}

function TableRow3() {
  return (
    <div className="bg-white content-stretch flex items-center relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <HeaderCell6 />
      <HeaderCell7 />
      <HeaderCell8 />
      <HeaderCell9 />
      <HeaderCell10 />
      <HeaderCell11 />
    </div>
  );
}

function TableHeader1() {
  return (
    <div className="content-stretch flex flex-col h-[44px] items-start justify-between relative shrink-0 w-full" data-name="Table Header">
      <TableRow3 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[213px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Pepsi</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[194px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">₦1000.00</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[194px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[187px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[186px]" data-name="Table Cell">
      <div className="content-stretch flex items-start mix-blend-multiply relative shrink-0" data-name="Badge">
        <div className="bg-[#ecfdf3] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center whitespace-nowrap">Available</p>
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p38f39800} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p85cdd00} id="Vector_2" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white content-stretch flex gap-[14px] h-[31px] items-center px-[10px] py-[6px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon7 />
      <Icon8 />
    </div>
  );
}

function TableCell17() {
  return (
    <div className="content-stretch flex flex-col h-[65px] items-end p-[16px] relative shrink-0 w-[190px]" data-name="Table Cell">
      <Button4 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[1177px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
    </div>
  );
}

function Body2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <TableRow4 />
    </div>
  );
}

function TableCell18() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[213px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Coke</p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[194px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">₦1000.00</p>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[194px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[187px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[186px]" data-name="Table Cell">
      <div className="content-stretch flex items-start mix-blend-multiply relative shrink-0" data-name="Badge">
        <div className="bg-[#ecfdf3] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center whitespace-nowrap">Available</p>
        </div>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p38f39800} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p85cdd00} id="Vector_2" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white content-stretch flex gap-[14px] h-[31px] items-center px-[10px] py-[6px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon9 />
      <Icon10 />
    </div>
  );
}

function TableCell23() {
  return (
    <div className="content-stretch flex flex-col h-[65px] items-end p-[16px] relative shrink-0 w-[190px]" data-name="Table Cell">
      <Button5 />
    </div>
  );
}

function TableRow5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[1177px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <TableCell18 />
      <TableCell19 />
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
    </div>
  );
}

function Body3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <TableRow5 />
    </div>
  );
}

function TableCell24() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[213px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Eva Water</p>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[194px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">₦1000.00</p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[194px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[187px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[186px]" data-name="Table Cell">
      <div className="content-stretch flex items-start mix-blend-multiply relative shrink-0" data-name="Badge">
        <div className="bg-[#ecfdf3] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center whitespace-nowrap">Available</p>
        </div>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p38f39800} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p85cdd00} id="Vector_2" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white content-stretch flex gap-[14px] h-[31px] items-center px-[10px] py-[6px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon11 />
      <Icon12 />
    </div>
  );
}

function TableCell29() {
  return (
    <div className="content-stretch flex flex-col h-[65px] items-end p-[16px] relative shrink-0 w-[190px]" data-name="Table Cell">
      <Button6 />
    </div>
  );
}

function TableRow6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[1177px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
      <TableCell28 />
      <TableCell29 />
    </div>
  );
}

function Body4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <TableRow6 />
    </div>
  );
}

function Table1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1177px]" data-name="Table">
      <TableHeader1 />
      <Body2 />
      <Body3 />
      <Body4 />
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div className="overflow-auto size-full">
        <div className="content-stretch flex flex-col items-start px-px relative w-full">
          <Table1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[1179px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[16px] w-full">
        <p className="leading-[24px]">Drinks (2)</p>
      </div>
      <BackgroundBorderShadow1 />
    </div>
  );
}

function HeaderCell12() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[213px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Name</p>
    </div>
  );
}

function HeaderCell13() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[194px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Price</p>
    </div>
  );
}

function HeaderCell14() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[194px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Variant</p>
    </div>
  );
}

function HeaderCell15() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[187px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Add-ons</p>
    </div>
  );
}

function HeaderCell16() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[186px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-right tracking-[-0.1504px] whitespace-nowrap">Status</p>
    </div>
  );
}

function HeaderCell17() {
  return (
    <div className="content-stretch flex items-center justify-end px-[15px] py-[12px] relative shrink-0 w-[190px]" data-name="Header Cell">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-right tracking-[-0.1504px] whitespace-nowrap">Action</p>
    </div>
  );
}

function TableRow7() {
  return (
    <div className="bg-white content-stretch flex items-center relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <HeaderCell12 />
      <HeaderCell13 />
      <HeaderCell14 />
      <HeaderCell15 />
      <HeaderCell16 />
      <HeaderCell17 />
    </div>
  );
}

function TableHeader2() {
  return (
    <div className="content-stretch flex flex-col h-[44px] items-start justify-between relative shrink-0 w-full" data-name="Table Header">
      <TableRow7 />
    </div>
  );
}

function TableCell30() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[213px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Fish</p>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[194px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">₦1000.00</p>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[194px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[187px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[186px]" data-name="Table Cell">
      <div className="content-stretch flex items-start mix-blend-multiply relative shrink-0" data-name="Badge">
        <div className="bg-[#ecfdf3] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center whitespace-nowrap">Available</p>
        </div>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p38f39800} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p85cdd00} id="Vector_2" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white content-stretch flex gap-[14px] h-[31px] items-center px-[10px] py-[6px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon13 />
      <Icon14 />
    </div>
  );
}

function TableCell35() {
  return (
    <div className="content-stretch flex flex-col h-[65px] items-end p-[16px] relative shrink-0 w-[190px]" data-name="Table Cell">
      <Button7 />
    </div>
  );
}

function TableRow8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[1177px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <TableCell30 />
      <TableCell31 />
      <TableCell32 />
      <TableCell33 />
      <TableCell34 />
      <TableCell35 />
    </div>
  );
}

function Body5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <TableRow8 />
    </div>
  );
}

function TableCell36() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[213px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">Tourkey</p>
    </div>
  );
}

function TableCell37() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[194px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">₦1000.00</p>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[194px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell39() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[187px]" data-name="Table Cell">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="content-stretch flex h-[65px] items-center px-[16px] py-[18px] relative shrink-0 w-[186px]" data-name="Table Cell">
      <div className="content-stretch flex items-start mix-blend-multiply relative shrink-0" data-name="Badge">
        <div className="bg-[#ecfdf3] content-stretch flex items-center justify-center px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#027a48] text-[12px] text-center whitespace-nowrap">Available</p>
        </div>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p38f39800} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p85cdd00} id="Vector_2" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-white content-stretch flex gap-[14px] h-[31px] items-center px-[10px] py-[6px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon15 />
      <Icon16 />
    </div>
  );
}

function TableCell41() {
  return (
    <div className="content-stretch flex flex-col h-[65px] items-end p-[16px] relative shrink-0 w-[190px]" data-name="Table Cell">
      <Button8 />
    </div>
  );
}

function TableRow9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[1177px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <TableCell36 />
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
      <TableCell40 />
      <TableCell41 />
    </div>
  );
}

function Body6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <TableRow9 />
    </div>
  );
}

function Table2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1177px]" data-name="Table">
      <TableHeader2 />
      <Body5 />
      <Body6 />
    </div>
  );
}

function BackgroundBorderShadow2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div className="overflow-auto size-full">
        <div className="content-stretch flex flex-col items-start px-px relative w-full">
          <Table2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[1179px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[16px] w-full">
        <p className="leading-[24px]">Protein</p>
      </div>
      <BackgroundBorderShadow2 />
    </div>
  );
}

function Content11() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#e91835] text-[14px] text-center whitespace-nowrap">1</p>
    </div>
  );
}

function Content12() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">2</p>
    </div>
  );
}

function Content13() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">3</p>
    </div>
  );
}

function Content14() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">...</p>
    </div>
  );
}

function Content15() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">8</p>
    </div>
  );
}

function Content16() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">9</p>
    </div>
  );
}

function Content17() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">10</p>
    </div>
  );
}

function PaginationNumbers() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Pagination numbers">
      <div className="bg-[#feeceb] overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
        <Content11 />
      </div>
      <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
        <Content12 />
      </div>
      <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
        <Content13 />
      </div>
      <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
        <Content14 />
      </div>
      <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
        <Content15 />
      </div>
      <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
        <Content16 />
      </div>
      <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
        <Content17 />
      </div>
    </div>
  );
}

function PageButtons() {
  return (
    <div className="relative shrink-0 w-full" data-name="Page buttons">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[16px] pt-[11px] px-[24px] relative w-full">
          <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
            <div className="bg-white relative rounded-[8px] shrink-0" data-name="_Button base">
              <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit]">
                <div className="overflow-clip relative shrink-0 size-[20px]" data-name="arrow-left">
                  <div className="absolute inset-[20.83%]" data-name="Icon">
                    <div className="absolute inset-[-7.16%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3367 13.3367">
                        <path d={svgPaths.p5abdf00} id="Icon" stroke="var(--stroke-0, #0C111C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0c111c] text-[14px] whitespace-nowrap">Previous</p>
              </div>
              <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
            </div>
          </div>
          <PaginationNumbers />
          <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
            <div className="bg-white relative rounded-[8px] shrink-0" data-name="_Button base">
              <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit]">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0c111c] text-[14px] whitespace-nowrap">Next</p>
                <div className="overflow-clip relative shrink-0 size-[20px]" data-name="arrow-right">
                  <div className="absolute inset-[20.83%]" data-name="Icon">
                    <div className="absolute inset-[-7.16%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3367 13.3367">
                        <path d={svgPaths.p1d776f00} id="Icon" stroke="var(--stroke-0, #0C111C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pq() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start p-[24px] right-0 top-[69px] w-[1227px]" data-name="pq">
      <Container />
      <div className="h-[38px] relative shrink-0 w-full" data-name="Horizontal tabs">
        <div className="absolute bg-[#e4e7ec] bottom-0 h-px left-0 right-0" data-name="Divider" />
        <Tabs />
      </div>
      <div className="bg-white content-stretch flex gap-[12px] h-[58px] items-start p-[11px] relative rounded-[14px] shrink-0 w-[1179px]" data-name="Table Header">
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.06)]" />
        <TextInput />
        <Container1 />
      </div>
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <div className="content-stretch flex flex-col h-[68px] items-start relative shrink-0 w-[1169px]" data-name="Pagination">
        <PageButtons />
      </div>
    </div>
  );
}

export default function MenuManagement() {
  return (
    <div className="bg-white relative size-full" data-name="Menu Management">
      <div className="absolute bg-white content-stretch flex h-[69px] items-center left-0 pl-[24px] pr-[40px] py-[20px] top-0 w-[1512px]" data-name="Header">
        <div aria-hidden="true" className="absolute border-[#d0d5dd] border-b border-solid inset-0 pointer-events-none" />
        <Frame2 />
      </div>
      <Sidebar />
      <Pq />
    </div>
  );
}