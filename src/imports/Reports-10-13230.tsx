import svgPaths from "./svg-re625692x";

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

function Frame4() {
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
            <mask fill="white" id="path-1-inside-1_10_9024">
              <path d={svgPaths.p15340980} />
            </mask>
            <path d={svgPaths.p15340980} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p2b5be270} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_10_9024)" />
          </g>
          <g id="Vector_2">
            <mask fill="white" id="path-3-inside-2_10_9024">
              <path d={svgPaths.p118ea280} />
            </mask>
            <path d={svgPaths.p118ea280} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p3904eb70} fill="var(--stroke-0, #111827)" mask="url(#path-3-inside-2_10_9024)" />
          </g>
          <g id="Vector_3">
            <mask fill="white" id="path-5-inside-3_10_9024">
              <path d={svgPaths.p17627600} />
            </mask>
            <path d={svgPaths.p17627600} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p872af0} fill="var(--stroke-0, #111827)" mask="url(#path-5-inside-3_10_9024)" />
          </g>
          <g id="Vector_4">
            <mask fill="white" id="path-7-inside-4_10_9024">
              <path d={svgPaths.p1dd27980} />
            </mask>
            <path d={svgPaths.p1dd27980} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p2506af00} fill="var(--stroke-0, #111827)" mask="url(#path-7-inside-4_10_9024)" />
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

function VuesaxBoldGraph() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/bold/graph">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="graph">
          <path d={svgPaths.p10463200} fill="var(--fill-0, #E91835)" id="Vector" />
          <path d={svgPaths.p100e4d00} fill="var(--fill-0, #E91835)" id="Vector_2" />
          <path d="M0 20L20 20L20 0L0 0L0 20Z" fill="var(--fill-0, #E91835)" id="Vector_3" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[20px]" data-name="graph">
        <VuesaxBoldGraph />
      </div>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#e91835] text-[14px] whitespace-nowrap">Reports</p>
    </div>
  );
}

function VuesaxOutlineBox() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/box">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="box">
          <g id="Vector">
            <mask fill="white" id="path-1-inside-1_10_9016">
              <path d={svgPaths.p11b2fc80} />
            </mask>
            <path d={svgPaths.p11b2fc80} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p20f72500} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_10_9016)" />
          </g>
          <g id="Vector_2">
            <mask fill="white" id="path-3-inside-2_10_9016">
              <path d={svgPaths.p31c0c700} />
            </mask>
            <path d={svgPaths.p31c0c700} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p2dd20e00} fill="var(--stroke-0, #111827)" mask="url(#path-3-inside-2_10_9016)" />
          </g>
          <g id="Vector_3">
            <mask fill="white" id="path-5-inside-3_10_9016">
              <path d={svgPaths.p86f5700} />
            </mask>
            <path d={svgPaths.p86f5700} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p186df600} fill="var(--stroke-0, #111827)" mask="url(#path-5-inside-3_10_9016)" />
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
          <div className="absolute inset-[-6.55%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.63131 8.63131">
              <path d={svgPaths.p16556680} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[13.75%_8.33%_8.33%_8.5%]" data-name="Vector">
          <div className="absolute inset-[-3.21%_-3.01%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6338 16.5833">
              <path d={svgPaths.pc326b80} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[64.58%_64.58%_9.17%_8.75%]" data-name="Vector">
          <div className="absolute inset-[-9.52%_-9.37%_-9.52%_-9.38%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.33333 6.25">
              <path d="M0.5 5.75L5.83333 0.5" id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/2 left-1/2 right-[20.83%] top-[20.83%]" data-name="Vector">
          <div className="absolute inset-[-8.57%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.83333 6.83333">
              <path d="M6.33333 0.5L0.5 6.33333" id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Menu</p>
    </div>
  );
}

function VuesaxOutlineProfile2User() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/profile-2user">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="profile-2user">
          <g id="Vector">
            <mask fill="white" id="path-1-inside-1_10_9007">
              <path d={svgPaths.p33208d80} />
            </mask>
            <path d={svgPaths.p33208d80} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p29c19f00} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_10_9007)" />
          </g>
          <g id="Vector_2">
            <mask fill="white" id="path-3-inside-2_10_9007">
              <path d={svgPaths.p19e57c40} />
            </mask>
            <path d={svgPaths.p19e57c40} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p21141000} fill="var(--stroke-0, #111827)" mask="url(#path-3-inside-2_10_9007)" />
          </g>
          <g id="Vector_3">
            <mask fill="white" id="path-5-inside-3_10_9007">
              <path d={svgPaths.p1cf7e280} />
            </mask>
            <path d={svgPaths.p1cf7e280} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p362bba00} fill="var(--stroke-0, #111827)" mask="url(#path-5-inside-3_10_9007)" />
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
            <mask fill="white" id="path-1-inside-1_10_9002">
              <path d={svgPaths.p9e91f80} />
            </mask>
            <path d={svgPaths.p9e91f80} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p258fea80} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_10_9002)" />
          </g>
          <g id="Vector_2">
            <mask fill="white" id="path-3-inside-2_10_9002">
              <path d={svgPaths.p14883f00} />
            </mask>
            <path d={svgPaths.p14883f00} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p9f7a400} fill="var(--stroke-0, #111827)" mask="url(#path-3-inside-2_10_9002)" />
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
            <mask fill="white" id="path-1-inside-1_10_9083">
              <path d={svgPaths.p3d7b9f80} />
            </mask>
            <path d={svgPaths.p3d7b9f80} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p103b7d00} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_10_9083)" />
          </g>
          <g id="Vector_2">
            <mask fill="white" id="path-3-inside-2_10_9083">
              <path d={svgPaths.p17c44e00} />
            </mask>
            <path d={svgPaths.p17c44e00} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p38c19000} fill="var(--stroke-0, #111827)" mask="url(#path-3-inside-2_10_9083)" />
          </g>
          <g id="Vector_3">
            <mask fill="white" id="path-5-inside-3_10_9083">
              <path d={svgPaths.p228a900} />
            </mask>
            <path d={svgPaths.p228a900} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p37bc5600} fill="var(--stroke-0, #111827)" mask="url(#path-5-inside-3_10_9083)" />
          </g>
          <g id="Vector_4">
            <mask fill="white" id="path-7-inside-4_10_9083">
              <path d={svgPaths.pd0c4240} />
            </mask>
            <path d={svgPaths.pd0c4240} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p17321880} fill="var(--stroke-0, #111827)" mask="url(#path-7-inside-4_10_9083)" />
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

function VuesaxOutlineMoneys() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/moneys">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="moneys">
          <g id="Vector">
            <mask fill="white" id="path-1-inside-1_10_8992">
              <path d={svgPaths.p36c18e00} />
            </mask>
            <path d={svgPaths.p36c18e00} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p28e6d900} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_10_8992)" />
          </g>
          <g id="Vector_2">
            <mask fill="white" id="path-3-inside-2_10_8992">
              <path d={svgPaths.pcd2d400} />
            </mask>
            <path d={svgPaths.pcd2d400} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p68fa300} fill="var(--stroke-0, #111827)" mask="url(#path-3-inside-2_10_8992)" />
          </g>
          <g id="Vector_3">
            <mask fill="white" id="path-5-inside-3_10_8992">
              <path d={svgPaths.p37c02580} />
            </mask>
            <path d={svgPaths.p37c02580} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p1c1aef00} fill="var(--stroke-0, #111827)" mask="url(#path-5-inside-3_10_8992)" />
          </g>
          <path d={svgPaths.p2e9cdd00} fill="var(--fill-0, #292D32)" id="Vector_4" />
          <path d={svgPaths.p8788a00} fill="var(--fill-0, #292D32)" id="Vector_5" />
          <g id="Vector_6" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[20px]" data-name="moneys">
        <VuesaxOutlineMoneys />
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
            <mask fill="white" id="path-1-inside-1_10_8987">
              <path d={svgPaths.p26866280} />
            </mask>
            <path d={svgPaths.p26866280} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p370217f0} fill="var(--stroke-0, #111827)" mask="url(#path-1-inside-1_10_8987)" />
          </g>
          <g id="Vector_2">
            <mask fill="white" id="path-3-inside-2_10_8987">
              <path d={svgPaths.p872e500} />
            </mask>
            <path d={svgPaths.p872e500} fill="var(--fill-0, #111827)" />
            <path d={svgPaths.p1589fc80} fill="var(--stroke-0, #111827)" mask="url(#path-3-inside-2_10_8987)" />
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
      <div className="bg-[#fffbfa] content-stretch flex gap-[105px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="Nav Item">
        <Content1 />
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[248px]" data-name="Nav Item with sub nav">
        <div className="content-stretch flex gap-[105px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="Nav Item">
          <Content2 />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[248px]" data-name="Nav Item with sub nav">
        <div className="content-stretch flex gap-[105px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="Nav Item">
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

function Frame5() {
  return (
    <div className="content-stretch flex gap-[104px] items-center justify-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Logout</p>
      </div>
    </div>
  );
}

function VuesaxLinearMessageText() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/message-text">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="message-text">
          <path d={svgPaths.p12513380} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
          <path d="M5.83333 6.66667H14.1667" id="Vector_2" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M5.83333 10.8333H10.8333" id="Vector_3" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <g id="Vector_4" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e91835] content-stretch flex flex-col gap-[11px] items-start p-[10px] rounded-[12px] shrink-0 sticky top-0 w-[239px]" data-name="Background">
      <Frame5 />
      <div className="bg-white relative rounded-[5px] shrink-0 w-full" data-name="_Button base">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
            <div className="relative shrink-0 size-[20px]" data-name="message-text">
              <VuesaxLinearMessageText />
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Need Help?</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[5px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-white h-[908px] left-0 top-[69px] w-[285px]" data-name="Sidebar">
      <div className="content-stretch flex flex-col gap-[378px] items-start overflow-clip p-[20px] relative rounded-[inherit] size-full">
        <Frame1 />
        <Background />
      </div>
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-full whitespace-nowrap" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#0a0a0a] text-[18px] tracking-[0.3955px]">Reports</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#4a5565] text-[14px]">Insight of your business performance</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-[91.258px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#696d77] text-[14px] top-[0.5px] whitespace-nowrap">{`Today's Revenue`}</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_10_9142)" id="Icon">
          <path d={svgPaths.p1bbdde70} id="Vector" stroke="var(--stroke-0, #0F9C5A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_10_9142">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#e7f8f0] relative rounded-[16777200px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Container4 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[#111827] text-[24px] top-[-1px] whitespace-nowrap">₦5,317.442</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#696d77] text-[12px] top-[0.5px] whitespace-nowrap">50 Sales</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[14px] row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[21px] px-[21px] relative size-full">
        <Container3 />
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[75.391px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#696d77] text-[14px] top-[0.5px] whitespace-nowrap">Total Order</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_10_9059)" id="Icon">
          <path d={svgPaths.p1abd1c00} id="Vector" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_10_9059">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[#feeceb] relative rounded-[16777200px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph3 />
      <Container7 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[#111827] text-[24px] top-[-1px] whitespace-nowrap">60</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#696d77] text-[12px] top-[0.5px] whitespace-nowrap">{`Today's orders`}</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[14px] row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[21px] px-[21px] relative size-full">
        <Container6 />
        <Paragraph4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[60.102px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#696d77] text-[14px] top-[0.5px] whitespace-pre">{`Average Order  Value`}</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.pdd4800} id="Vector" stroke="var(--stroke-0, #E91835)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#feeceb] relative rounded-[16777200px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph6 />
      <Container10 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[#111827] text-[24px] top-[-1px] whitespace-nowrap">₦15,317.442</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] top-[0.5px] whitespace-nowrap">Per order average</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white col-3 justify-self-stretch relative rounded-[14px] row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[21px] px-[21px] relative size-full">
        <Container9 />
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[87.773px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#696d77] text-[14px] top-[0.5px] whitespace-nowrap">{`Week's Profit`}</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3ed57680} id="Vector" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#e7f8f0] relative rounded-[16777200px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph9 />
      <Container13 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[#111827] text-[24px] top-[-1px] whitespace-nowrap">₦0.00</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#696d77] text-[12px] top-[0.5px] whitespace-nowrap">0.0% margin</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-white col-4 justify-self-stretch relative rounded-[14px] row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[21px] px-[21px] relative size-full">
        <Container12 />
        <Paragraph10 />
        <Paragraph11 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[126px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container5 />
      <Container8 />
      <Container11 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px] whitespace-nowrap">Top 10 Best Sellers</p>
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="_Button base">
        <div className="content-stretch flex items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit]">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] whitespace-nowrap">View All</p>
        </div>
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Plantain Chips 100g</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#696d77] text-[12px] top-px whitespace-nowrap">SNK003</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[36px] relative shrink-0 w-[131.156px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph12 />
        <Paragraph13 />
      </div>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[77.41px] not-italic text-[#e7000b] text-[14px] text-right top-[0.5px] tracking-[-0.1504px] w-[46px]">5 units</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[78px] not-italic text-[#696d77] text-[12px] text-right top-px w-[78px]">Reorder at 20</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[36px] relative shrink-0 w-[77.336px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph14 />
        <Paragraph15 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-white h-[62px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0.44px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12.44px] py-[0.44px] relative size-full">
          <Container18 />
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Sliced Bread</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#696d77] text-[12px] top-px whitespace-nowrap">BAK001</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[36px] relative shrink-0 w-[82.945px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph16 />
        <Paragraph17 />
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[76.47px] not-italic text-[#e7000b] text-[14px] text-right top-[0.5px] tracking-[-0.1504px] w-[47px]">0 units</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[76px] not-italic text-[#696d77] text-[12px] text-right top-px w-[76px]">Reorder at 10</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[36px] relative shrink-0 w-[75.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph18 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-white h-[62px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0.44px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12.44px] py-[0.44px] relative size-full">
          <Container21 />
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Sliced Bread</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#696d77] text-[12px] top-px whitespace-nowrap">BAK001</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[36px] relative shrink-0 w-[82.945px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph20 />
        <Paragraph21 />
      </div>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[76.47px] not-italic text-[#e7000b] text-[14px] text-right top-[0.5px] tracking-[-0.1504px] w-[47px]">0 units</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[76px] not-italic text-[#696d77] text-[12px] text-right top-px w-[76px]">Reorder at 10</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[36px] relative shrink-0 w-[75.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph22 />
        <Paragraph23 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-white h-[62px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0.44px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12.44px] py-[0.44px] relative size-full">
          <Container24 />
          <Container25 />
        </div>
      </div>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Sliced Bread</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#696d77] text-[12px] top-px whitespace-nowrap">BAK001</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[36px] relative shrink-0 w-[82.945px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph24 />
        <Paragraph25 />
      </div>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[76.47px] not-italic text-[#e7000b] text-[14px] text-right top-[0.5px] tracking-[-0.1504px] w-[47px]">0 units</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[76px] not-italic text-[#696d77] text-[12px] text-right top-px w-[76px]">Reorder at 10</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[36px] relative shrink-0 w-[75.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph26 />
        <Paragraph27 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-white h-[62px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0.44px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12.44px] py-[0.44px] relative size-full">
          <Container27 />
          <Container28 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container20 />
      <Container23 />
      <Container26 />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-white col-2 relative rounded-[14px] row-1 self-stretch shrink-0 w-[577px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0.44px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[36px] items-start px-[24px] py-[15px] relative size-full">
        <Frame2 />
        <Container16 />
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[19.23%_3.9%_10.61%_11.25%]" data-name="Group">
      <div className="absolute inset-[-0.18%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 490.039 278.854">
          <g id="Group">
            <path d="M1.60932e-06 278.354H490.039" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeDasharray="3 3" strokeWidth="0.998996" />
            <path d="M1.60932e-06 208.891H490.039" id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeDasharray="3 3" strokeWidth="0.998996" />
            <path d="M1.60932e-06 139.426H490.039" id="Vector_3" stroke="var(--stroke-0, #D0D5DD)" strokeDasharray="3 3" strokeWidth="0.998996" />
            <path d="M1.60932e-06 69.9629H490.039" id="Vector_4" stroke="var(--stroke-0, #D0D5DD)" strokeDasharray="3 3" strokeWidth="0.998996" />
            <path d="M0 0.499498H490.039" id="Vector_5" stroke="var(--stroke-0, #D0D5DD)" strokeDasharray="3 3" strokeWidth="0.998996" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[19.23%_3.9%_10.61%_11.25%]" data-name="Group">
      <div className="absolute inset-[0_-0.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 491.038 277.854">
          <g id="Group">
            <path d="M35.5026 1.19209e-07V277.854" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeDasharray="3 3" strokeWidth="0.998996" />
            <path d="M105.507 1.19209e-07V277.854" id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeDasharray="3 3" strokeWidth="0.998996" />
            <path d="M175.514 1.19209e-07V277.854" id="Vector_3" stroke="var(--stroke-0, #D0D5DD)" strokeDasharray="3 3" strokeWidth="0.998996" />
            <path d="M245.519 1.19209e-07V277.854" id="Vector_4" stroke="var(--stroke-0, #D0D5DD)" strokeDasharray="3 3" strokeWidth="0.998996" />
            <path d="M315.524 1.19209e-07V277.854" id="Vector_5" stroke="var(--stroke-0, #D0D5DD)" strokeDasharray="3 3" strokeWidth="0.998996" />
            <path d="M385.531 1.19209e-07V277.854" id="Vector_6" stroke="var(--stroke-0, #D0D5DD)" strokeDasharray="3 3" strokeWidth="0.998996" />
            <path d="M455.535 1.19209e-07V277.854" id="Vector_7" stroke="var(--stroke-0, #D0D5DD)" strokeDasharray="3 3" strokeWidth="0.998996" />
            <path d="M0.499498 0V277.854" id="Vector_8" stroke="var(--stroke-0, #D0D5DD)" strokeDasharray="3 3" strokeWidth="0.998996" />
            <path d="M490.539 1.19209e-07V277.854" id="Vector_9" stroke="var(--stroke-0, #D0D5DD)" strokeDasharray="3 3" strokeWidth="0.998996" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[19.23%_3.9%_10.61%_11.25%]" data-name="Group">
      <Group1 />
      <Group2 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[89.39%_80.62%_5.68%_15.06%]" data-name="Group">
      <div className="absolute inset-[89.39%_82.66%_9.09%_17.34%]" data-name="Vector">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.998996 5.99398">
            <path d="M0.499498 5.99398V0" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="0.998996" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[90.53%_80.62%_5.68%_15.06%] leading-[normal] not-italic text-[#3c424e] text-[11.988px] text-center whitespace-nowrap">Mon</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[89.39%_68.77%_5.68%_27.6%]" data-name="Group">
      <div className="absolute inset-[89.39%_70.46%_9.09%_29.54%]" data-name="Vector">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.998996 5.99398">
            <path d="M0.499498 5.99398V0" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="0.998996" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[90.53%_68.77%_5.68%_27.6%] leading-[normal] not-italic text-[#3c424e] text-[11.988px] text-center whitespace-nowrap">Tue</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[89.39%_56.22%_5.68%_39.28%]" data-name="Group">
      <div className="absolute inset-[89.39%_58.27%_9.09%_41.73%]" data-name="Vector">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.998996 5.99398">
            <path d="M0.499498 5.99398V0" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="0.998996" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[90.53%_56.22%_5.68%_39.28%] leading-[normal] not-italic text-[#3c424e] text-[11.988px] text-center whitespace-nowrap">Wed</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[89.39%_43.73%_5.68%_51.6%]" data-name="Group">
      <div className="absolute inset-[89.39%_46.07%_9.09%_53.93%]" data-name="Vector">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.998996 5.99398">
            <path d="M0.499498 5.99398V0" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="0.998996" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[90.53%_43.73%_5.68%_51.6%] leading-[normal] not-italic text-[#3c424e] text-[11.988px] text-center whitespace-nowrap">Thur</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[89.39%_32.7%_5.68%_64.71%]" data-name="Group">
      <div className="absolute inset-[89.39%_33.87%_9.09%_66.13%]" data-name="Vector">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.998996 5.99398">
            <path d="M0.499498 5.99398V0" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="0.998996" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[90.53%_32.7%_5.68%_64.71%] leading-[normal] not-italic text-[#3c424e] text-[11.988px] text-center whitespace-nowrap">Fri</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[89.39%_20.15%_5.68%_76.56%]" data-name="Group">
      <div className="absolute inset-[89.39%_21.68%_9.09%_78.32%]" data-name="Vector">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.998996 5.99398">
            <path d="M0.499498 5.99398V0" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="0.998996" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[90.53%_20.15%_5.68%_76.56%] leading-[normal] not-italic text-[#3c424e] text-[11.988px] text-center whitespace-nowrap">Sat</p>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[89.39%_7.93%_5.68%_88.26%]" data-name="Group">
      <div className="absolute inset-[89.39%_9.48%_9.09%_90.52%]" data-name="Vector">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.998996 5.99398">
            <path d="M0.499498 5.99398V0" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="0.998996" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[90.53%_7.93%_5.68%_88.26%] leading-[normal] not-italic text-[#3c424e] text-[11.988px] text-center whitespace-nowrap">Sun</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[89.39%_7.93%_5.68%_15.06%]" data-name="Group">
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
      <Group8 />
      <Group9 />
      <Group10 />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[82.87%_88.75%_13.35%_8.31%]" data-name="Group">
      <div className="absolute inset-[84.82%_88.75%_15.18%_10.21%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99398 0.998996">
            <path d="M0 0.499498H5.99398" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="0.998996" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[82.87%_90.31%_13.35%_8.31%] leading-[normal] not-italic text-[#696d77] text-[11.988px] text-right whitespace-nowrap">0</p>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[66.47%_88.75%_29.74%_4.85%]" data-name="Group">
      <div className="absolute inset-[68.42%_88.75%_31.58%_10.21%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99398 0.998996">
            <path d="M0 0.499498H5.99398" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="0.998996" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[66.47%_90.3%_29.74%_4.85%] leading-[normal] not-italic text-[#696d77] text-[11.988px] text-right whitespace-nowrap">1500</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[50.07%_88.75%_46.14%_4.33%]" data-name="Group">
      <div className="absolute inset-[52.02%_88.75%_47.98%_10.21%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99398 0.998996">
            <path d="M0 0.499498H5.99398" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="0.998996" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[50.07%_90.3%_46.14%_4.33%] leading-[normal] not-italic text-[#696d77] text-[11.988px] text-right whitespace-nowrap">3000</p>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-[33.67%_88.75%_62.54%_4.5%]" data-name="Group">
      <div className="absolute inset-[35.63%_88.75%_64.37%_10.21%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99398 0.998996">
            <path d="M0 0.499498H5.99398" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="0.998996" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[33.67%_90.3%_62.54%_4.5%] leading-[normal] not-italic text-[#696d77] text-[11.988px] text-right whitespace-nowrap">4500</p>
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents inset-[19.04%_88.75%_77.17%_4.5%]" data-name="Group">
      <div className="absolute inset-[19.23%_88.75%_80.77%_10.21%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99398 0.998996">
            <path d="M0 0.499498H5.99398" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="0.998996" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[19.04%_90.3%_77.17%_4.5%] leading-[normal] not-italic text-[#696d77] text-[11.988px] text-right whitespace-nowrap">6000</p>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[19.04%_88.75%_13.35%_4.33%]" data-name="Group">
      <Group13 />
      <Group14 />
      <Group15 />
      <Group16 />
      <Group17 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[19.04%_88.75%_13.35%_4.33%]" data-name="Group">
      <div className="absolute inset-[19.23%_88.75%_15.18%_11.25%]" data-name="Vector">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.998996 259.739">
            <path d="M0.499498 0V259.739" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="0.998996" />
          </svg>
        </div>
      </div>
      <Group12 />
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute inset-[50.76%_19.22%_10.38%_76.71%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.4831 153.884">
        <g id="Group">
          <path d={svgPaths.pd485f80} fill="var(--fill-0, #E91835)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[50.76%_19.22%_10.38%_76.71%]" data-name="Group">
      <Group21 />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents inset-[50.76%_19.22%_10.38%_76.71%]" data-name="Group">
      <Group20 />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-[50.76%_19.22%_10.38%_76.71%]" data-name="Group">
      <Group19 />
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute inset-[50.76%_7.97%_10.38%_87.97%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.4831 153.884">
        <g id="Group">
          <path d={svgPaths.pd485f80} fill="var(--fill-0, #E91835)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents inset-[50.76%_7.97%_10.38%_87.97%]" data-name="Group">
      <Group25 />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents inset-[50.76%_7.97%_10.38%_87.97%]" data-name="Group">
      <Group24 />
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents inset-[50.76%_7.97%_10.38%_87.97%]" data-name="Group">
      <Group23 />
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute inset-[65.4%_31.34%_10.38%_64.59%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.4831 95.8845">
        <g id="Group">
          <path d={svgPaths.p256fa900} fill="var(--fill-0, #E91835)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents inset-[65.4%_31.34%_10.38%_64.59%]" data-name="Group">
      <Group29 />
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents inset-[65.4%_31.34%_10.38%_64.59%]" data-name="Group">
      <Group28 />
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[65.4%_31.34%_10.38%_64.59%]" data-name="Group">
      <Group27 />
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute inset-[65.4%_56.45%_10.38%_39.48%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.4831 95.8845">
        <g id="Group">
          <path d={svgPaths.p256fa900} fill="var(--fill-0, #E91835)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents inset-[65.4%_56.45%_10.38%_39.48%]" data-name="Group">
      <Group33 />
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents inset-[65.4%_56.45%_10.38%_39.48%]" data-name="Group">
      <Group32 />
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents inset-[65.4%_56.45%_10.38%_39.48%]" data-name="Group">
      <Group31 />
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute inset-[65.4%_79.48%_10.38%_16.45%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.4831 95.8845">
        <g id="Group">
          <path d={svgPaths.p256fa900} fill="var(--fill-0, #E91835)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute contents inset-[65.4%_79.48%_10.38%_16.45%]" data-name="Group">
      <Group37 />
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute contents inset-[65.4%_79.48%_10.38%_16.45%]" data-name="Group">
      <Group36 />
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute contents inset-[65.4%_79.48%_10.38%_16.45%]" data-name="Group">
      <Group35 />
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute inset-[75.76%_44.16%_10.64%_51.77%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.4831 53.8845">
        <g id="Group">
          <path d={svgPaths.p2cd451c0} fill="var(--fill-0, #E91835)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute contents inset-[75.76%_44.16%_10.64%_51.77%]" data-name="Group">
      <Group41 />
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents inset-[75.76%_44.16%_10.64%_51.77%]" data-name="Group">
      <Group40 />
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute contents inset-[75.76%_44.16%_10.64%_51.77%]" data-name="Group">
      <Group39 />
    </div>
  );
}

function Group45() {
  return (
    <div className="absolute inset-[75.76%_69.44%_10.64%_26.5%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.4831 53.8845">
        <g id="Group">
          <path d={svgPaths.p2cd451c0} fill="var(--fill-0, #E91835)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group44() {
  return (
    <div className="absolute contents inset-[75.76%_69.44%_10.64%_26.5%]" data-name="Group">
      <Group45 />
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute contents inset-[75.76%_69.44%_10.64%_26.5%]" data-name="Group">
      <Group44 />
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute contents inset-[75.76%_69.44%_10.64%_26.5%]" data-name="Group">
      <Group43 />
    </div>
  );
}

function VuesaxLinearArrowDown() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/arrow-down">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="arrow-down">
          <path d={svgPaths.p1134a680} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
          <g id="Vector_2" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[14px] row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0.44px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[25px] not-italic text-[#111827] text-[16px] top-[24.5px] tracking-[-0.3125px] whitespace-nowrap">Sales Overview (Last 7 Days)</p>
      <Group />
      <div className="absolute inset-[89.39%_3.38%_10.61%_11.25%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 493 0.998996">
            <path d="M0 0.499498H493" id="Vector" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="0.998996" />
          </svg>
        </div>
      </div>
      <Group3 />
      <Group11 />
      <Group18 />
      <Group22 />
      <Group26 />
      <Group30 />
      <Group34 />
      <Group38 />
      <Group42 />
      <div className="absolute bg-white left-[453px] rounded-[8px] top-[15px]" data-name="_Button base">
        <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit]">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3c424e] text-[14px] whitespace-nowrap">7 Days</p>
          <div className="relative shrink-0 size-[20px]" data-name="arrow-down">
            <VuesaxLinearArrowDown />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[396px] relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container29 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex font-['Inter:Medium',sans-serif] font-medium items-center justify-between leading-[20px] not-italic relative shrink-0 w-[1121px] whitespace-nowrap">
      <p className="relative shrink-0 text-[#111827] text-[16px] tracking-[-0.3125px]">Recent Orders</p>
      <p className="relative shrink-0 text-[#e91835] text-[14px]">View All</p>
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="h-[44.5px] relative shrink-0 w-[259.711px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Invoice</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="h-[44.5px] relative shrink-0 w-[237.031px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Date</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="h-[44.5px] relative shrink-0 w-[146.297px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Customer</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="h-[44.5px] relative shrink-0 w-[258.281px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Cashier</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Header Cell">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[20px] py-[12px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-right tracking-[-0.1504px] whitespace-nowrap">Amount</p>
        </div>
      </div>
    </div>
  );
}

function TableRow() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-b border-solid border-white inset-0 pointer-events-none" />
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[0.12px] w-[1127px]" data-name="Table Header">
      <TableRow />
    </div>
  );
}

function TableCell() {
  return (
    <div className="h-[45px] relative shrink-0 w-[259.711px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">INV-1770730269974</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="h-[45px] relative shrink-0 w-[237.031px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">Feb 10, 2026 14:31</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="h-[45px] relative shrink-0 w-[146.297px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">Walk-in</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="h-[45px] relative shrink-0 w-[258.281px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">System Administrator</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[20px] py-[12px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-right tracking-[-0.1504px] w-[74px]">₦1,217.442</p>
        </div>
      </div>
    </div>
  );
}

function TableRow1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-b border-solid border-white inset-0 pointer-events-none" />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="h-[45px] relative shrink-0 w-[259.711px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">INV-1770728324064</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="h-[45px] relative shrink-0 w-[237.031px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">Feb 10, 2026 13:58</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="h-[45px] relative shrink-0 w-[146.297px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">Walk-in</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="h-[45px] relative shrink-0 w-[258.281px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">System Administrator</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[20px] py-[12px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-right tracking-[-0.1504px] w-[68px]">₦695.349</p>
        </div>
      </div>
    </div>
  );
}

function TableRow2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-b border-solid border-white inset-0 pointer-events-none" />
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
    </div>
  );
}

function TableCell10() {
  return (
    <div className="h-[45px] relative shrink-0 w-[259.711px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">INV-1770727547609</p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="h-[45px] relative shrink-0 w-[237.031px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">Feb 10, 2026 13:45</p>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="h-[45px] relative shrink-0 w-[146.297px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">Walk-in</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="h-[45px] relative shrink-0 w-[258.281px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">System Administrator</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[20px] py-[12px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-right tracking-[-0.1504px] w-[79px]">₦1,434.884</p>
        </div>
      </div>
    </div>
  );
}

function TableRow3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-b border-solid border-white inset-0 pointer-events-none" />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
    </div>
  );
}

function TableCell15() {
  return (
    <div className="h-[45px] relative shrink-0 w-[259.711px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">INV-1770727131233</p>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="h-[45px] relative shrink-0 w-[237.031px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">Feb 10, 2026 13:38</p>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="h-[45px] relative shrink-0 w-[146.297px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">Walk-in</p>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="h-[45px] relative shrink-0 w-[258.281px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#111827] text-[14px] top-[13px] tracking-[-0.1504px] whitespace-nowrap">System Administrator</p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Cell">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[20px] py-[12px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-right tracking-[-0.1504px] w-[76px]">₦1,969.767</p>
        </div>
      </div>
    </div>
  );
}

function TableRow4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-b border-solid border-white inset-0 pointer-events-none" />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[44.12px] w-[1129px]" data-name="Table Body">
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
      <TableRow4 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[225px] overflow-clip relative shrink-0 w-full" data-name="Table">
      <TableHeader />
      <TableBody />
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0.44px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[15px] items-start px-[25px] py-[20px] relative w-full">
        <Frame3 />
        <Table />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-0 not-italic text-[#111827] text-[16px] top-[0.5px] whitespace-pre">{`Revenue  Distribution`}</p>
    </div>
  );
}

function Group48() {
  return (
    <div className="col-1 h-[60px] ml-[2.45%] mt-0 relative row-1 w-[117.063px]" data-name="Group">
      <div className="absolute inset-[-0.83%_-0.43%_-0.83%_-0.54%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 118.193 61.0001">
          <g id="Group">
            <path d={svgPaths.p3de9ef70} fill="var(--fill-0, #E91835)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group49() {
  return (
    <div className="col-1 ml-0 mt-[34.55%] relative row-1 size-[78.541px]" data-name="Group">
      <div className="absolute inset-[-0.8%_-0.8%_-0.64%_-0.64%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79.6711 79.6711">
          <g id="Group">
            <path d={svgPaths.p10540d00} fill="var(--fill-0, #2C74BC)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group50() {
  return (
    <div className="col-1 h-[57.063px] ml-[59.01%] mt-1/2 relative row-1 w-[49.184px]" data-name="Group">
      <div className="absolute inset-[-0.88%_-1.02%_-1.1%_-1.28%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.3144 58.1934">
          <g id="Group">
            <path d={svgPaths.p1b7aa800} fill="var(--fill-0, #CEE2F7)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group47() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Group">
      <Group48 />
      <Group49 />
      <Group50 />
    </div>
  );
}

function Group46() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <Group47 />
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">Payment Methods</p>
    </div>
  );
}

function Container38() {
  return <div className="bg-[#e91835] rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#3c424e] text-[12px] top-[0.5px] whitespace-nowrap">CASH</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[18px] relative shrink-0 w-[49.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container38 />
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[35.68px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">₦1.9M</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[18px] relative shrink-0 w-[139.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container37 />
        <Text1 />
      </div>
    </div>
  );
}

function Container41() {
  return <div className="bg-[#2c74bc] rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />;
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#3c424e] text-[12px] top-[0.5px] whitespace-nowrap">CARD</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[18px] relative shrink-0 w-[49.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container41 />
        <Text2 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[18px] relative shrink-0 w-[35.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">₦1.5M</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[18px] relative shrink-0 w-[139.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container40 />
        <Text3 />
      </div>
    </div>
  );
}

function Container44() {
  return <div className="bg-[#cee2f7] rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />;
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#3c424e] text-[12px] top-[0.5px] whitespace-nowrap">TRANSFER</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[18px] relative shrink-0 w-[78.063px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container44 />
        <Text4 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[18px] relative shrink-0 w-[39.445px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic right-[39.51px] text-[#111827] text-[12px] top-[0.5px] translate-x-full whitespace-nowrap">₦860K</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[139.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container43 />
        <Text5 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[78px] items-start relative shrink-0 w-full" data-name="Container">
      <Container36 />
      <Container39 />
      <Container42 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[108px] items-start relative shrink-0 w-[139.703px]" data-name="Container">
      <Paragraph28 />
      <Container35 />
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="content-stretch flex h-[10px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[10px] min-h-px min-w-px not-italic relative text-[#111827] text-[8px] text-center">Total</p>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="content-stretch flex h-[10px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[#111827] text-[8px] text-center whitespace-nowrap">₦4.3M</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex flex-col h-[20px] items-start left-[53px] top-[54.75px] w-[25.219px]" data-name="Container">
      <Paragraph29 />
      <Paragraph30 />
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 w-[287px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative w-full">
        <Group46 />
        <Container34 />
        <Container45 />
      </div>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">Best Day</p>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">Sat</p>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#696d77] text-[10px] top-[0.5px] whitespace-nowrap">(NGN 890,000)</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[65px] relative shrink-0 w-[72.242px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative size-full">
        <Paragraph31 />
        <Paragraph32 />
        <Paragraph33 />
      </div>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">Worst Day</p>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">Sun</p>
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#696d77] text-[10px] top-[0.5px] whitespace-nowrap">(NGN 420,000)</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="flex-[1_0_0] h-[65px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative size-full">
        <Paragraph34 />
        <Paragraph35 />
        <Paragraph36 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[75px] relative shrink-0 w-[185px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[40px] items-start relative size-full">
        <Container47 />
        <Container48 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex h-[120px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <Container46 />
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[15px] items-start px-[26px] py-[20px] relative w-full">
        <Heading />
        <Container32 />
      </div>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#3c424e] text-[14px] top-0 whitespace-nowrap">Total Profit</p>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-0 not-italic text-[#111827] text-[16px] top-[-0.5px] whitespace-nowrap">NGN 1,195,000</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[142.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5px] items-start relative size-full">
        <Paragraph37 />
        <Paragraph38 />
      </div>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#3c424e] text-[14px] top-0 whitespace-nowrap">Profit Margin</p>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="h-[28.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-0 not-italic text-[#111827] text-[16px] top-[-0.5px] whitespace-nowrap">7.8%</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[54.5px] relative shrink-0 w-[142.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5px] items-start relative size-full">
        <Paragraph39 />
        <Paragraph40 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[130.5px] relative shrink-0 w-[142.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[20px] items-start relative size-full">
        <Container52 />
        <Container53 />
      </div>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#3c424e] text-[14px] top-0 whitespace-nowrap">Total Revenue</p>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-0 not-italic text-[#111827] text-[16px] top-[-0.5px] whitespace-nowrap">NGN 3,977,500</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[146.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5px] items-start relative size-full">
        <Paragraph41 />
        <Paragraph42 />
      </div>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#3c424e] text-[14px] top-0 whitespace-nowrap">Total VAT Collected</p>
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="h-[28.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-0 not-italic text-[#111827] text-[16px] top-[-0.5px] whitespace-nowrap">NGN 322,500</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[54.5px] relative shrink-0 w-[146.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5px] items-start relative size-full">
        <Paragraph43 />
        <Paragraph44 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[130.5px] relative shrink-0 w-[146.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[20px] items-start relative size-full">
        <Container55 />
        <Container56 />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex h-[130.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container51 />
      <Container54 />
    </div>
  );
}

function Container49() {
  return (
    <div className="bg-white h-[182.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[26px] px-[26px] relative size-full">
        <Container50 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[153.938px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#111827] text-[16px] top-[-1px] whitespace-nowrap">Customer Overview</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[18px] relative shrink-0 w-[60.922px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[30.5px] not-italic text-[#e91835] text-[12px] text-center top-[0.5px] whitespace-nowrap">View More</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Button />
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="h-[21px] relative shrink-0 w-[101.008px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#3c424e] text-[14px] top-0 whitespace-nowrap">Total Customer</p>
      </div>
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[101.008px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#111827] text-[14px] top-0 whitespace-nowrap">270</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[48px] relative shrink-0 w-[101.008px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Paragraph45 />
        <Paragraph46 />
      </div>
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="h-[21px] relative shrink-0 w-[98.141px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[99px] not-italic text-[#3c424e] text-[14px] text-right top-0 whitespace-nowrap">Best Customer</p>
      </div>
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[98.141px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[98.5px] not-italic text-[#111827] text-[14px] text-right top-0 whitespace-nowrap">NGN 344,000</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[48px] relative shrink-0 w-[98.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Paragraph47 />
        <Paragraph48 />
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container60 />
      <Container61 />
    </div>
  );
}

function Container57() {
  return (
    <div className="bg-white h-[145px] relative rounded-[5px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex flex-col gap-[21px] items-start pb-px pt-[26px] px-[26px] relative size-full">
        <Container58 />
        <Container59 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[143.836px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#111827] text-[16px] top-[-1px] whitespace-nowrap">Expense Overview</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[60.922px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[30.5px] not-italic text-[#e91835] text-[12px] text-center top-[0.5px] whitespace-nowrap">View More</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Button1 />
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="h-[21px] relative shrink-0 w-[155.414px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#3c424e] text-[14px] top-0 whitespace-nowrap">Total Expenses Amount</p>
      </div>
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[155.414px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#111827] text-[14px] top-0 whitespace-nowrap">NGN 860,000</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[48px] relative shrink-0 w-[155.414px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Paragraph49 />
        <Paragraph50 />
      </div>
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="h-[21px] relative shrink-0 w-[91.18px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[91.78px] not-italic text-[#3c424e] text-[14px] text-right top-0 whitespace-nowrap">Net Profit</p>
      </div>
    </div>
  );
}

function Paragraph52() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[91.18px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[92px] not-italic text-[#111827] text-[14px] text-right top-0 whitespace-nowrap">NGN 335,000</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[48px] relative shrink-0 w-[91.18px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Paragraph51 />
        <Paragraph52 />
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container65 />
      <Container66 />
    </div>
  );
}

function Container62() {
  return (
    <div className="bg-white h-[148px] relative rounded-[5px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start pb-px pt-[26px] px-[26px] relative size-full">
        <Container63 />
        <Container64 />
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[787.5px] items-start relative shrink-0 w-[593px]">
      <Container31 />
      <Container49 />
      <Container57 />
      <Container62 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#111827] text-[16px] top-[-1px] whitespace-nowrap">Branch Performance</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[18px] relative shrink-0 w-[109.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">Total Sales Amount</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[18px] relative shrink-0 w-[88.57px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">NGN 4,300,000</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[18px] relative shrink-0 w-[480px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Text6 />
        <Text7 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[18px] relative shrink-0 w-[110.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">Total Products Sold</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">812</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="h-[18px] relative shrink-0 w-[480px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Text8 />
        <Text9 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[18px] relative shrink-0 w-[153.836px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">Total Unique Products Sold</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[18px] relative shrink-0 w-[21.961px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">487</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[18px] relative shrink-0 w-[480px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Text10 />
        <Text11 />
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[18px] relative shrink-0 w-[54.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">Net Profit</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[18px] relative shrink-0 w-[78.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">NGN 335,000</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[18px] relative shrink-0 w-[480px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Text12 />
        <Text13 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[18px] relative shrink-0 w-[133.211px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">Total Expenses Amount</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[18px] relative shrink-0 w-[77.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#111827] text-[12px] top-[0.5px] whitespace-nowrap">NGN 860,000</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[480px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Text14 />
        <Text15 />
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] h-[134px] items-start relative shrink-0 w-full" data-name="Container">
      <Container69 />
      <Container70 />
      <Container71 />
      <Container72 />
      <Container73 />
    </div>
  );
}

function Container67() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[20px] relative w-full">
        <Heading3 />
        <Container68 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150.133px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#111827] text-[16px] top-[-1px] whitespace-nowrap">Purchase Overview</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[18px] relative shrink-0 w-[60.922px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[30.5px] not-italic text-[#e91835] text-[12px] text-center top-[0.5px] whitespace-nowrap">View More</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Button2 />
    </div>
  );
}

function Paragraph53() {
  return (
    <div className="h-[21px] relative shrink-0 w-[141.813px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#3c424e] text-[14px] top-0 whitespace-nowrap">Total Purchase Count</p>
      </div>
    </div>
  );
}

function Paragraph54() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[141.813px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#111827] text-[16px] top-[-1px] whitespace-nowrap">30</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[47px] relative shrink-0 w-[141.813px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph53 />
        <Paragraph54 />
      </div>
    </div>
  );
}

function Paragraph55() {
  return (
    <div className="h-[21px] relative shrink-0 w-[150.742px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[151px] not-italic text-[#3c424e] text-[14px] text-right top-0 whitespace-nowrap">Total Purchase Volume</p>
      </div>
    </div>
  );
}

function Paragraph56() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[150.742px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[151.72px] not-italic text-[#111827] text-[16px] text-right top-[-1px] whitespace-nowrap">NGN 3,000,000</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="h-[47px] relative shrink-0 w-[150.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph55 />
        <Paragraph56 />
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex h-[47px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container77 />
      <Container78 />
    </div>
  );
}

function Container74() {
  return (
    <div className="bg-white h-[147px] relative rounded-[5px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start pb-px pt-[26px] px-[26px] relative size-full">
        <Container75 />
        <Container76 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[151.164px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#111827] text-[16px] top-[-1px] whitespace-nowrap">Inventory Overview</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[18px] relative shrink-0 w-[60.922px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[30.5px] not-italic text-[#e91835] text-[12px] text-center top-[0.5px] whitespace-nowrap">View More</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading5 />
      <Button3 />
    </div>
  );
}

function Paragraph57() {
  return (
    <div className="h-[21px] relative shrink-0 w-[138.75px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#696d77] text-[14px] top-0 whitespace-nowrap">Total Inventory Value</p>
      </div>
    </div>
  );
}

function Paragraph58() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[138.75px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#111827] text-[16px] top-[-1px] whitespace-nowrap">NGN 6,000,000</p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[51px] relative shrink-0 w-[138.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Paragraph57 />
        <Paragraph58 />
      </div>
    </div>
  );
}

function Paragraph59() {
  return (
    <div className="h-[21px] relative shrink-0 w-[115.047px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[115.34px] not-italic text-[#696d77] text-[14px] text-right top-0 whitespace-nowrap">Inventory Profit</p>
      </div>
    </div>
  );
}

function Paragraph60() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[115.047px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[116px] not-italic text-[#111827] text-[16px] text-right top-[-1px] whitespace-nowrap">NGN 1,200,000</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="h-[51px] relative shrink-0 w-[115.047px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Paragraph59 />
        <Paragraph60 />
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex h-[51px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container82 />
      <Container83 />
    </div>
  );
}

function Container79() {
  return (
    <div className="bg-white h-[149px] relative rounded-[5px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex flex-col gap-[22px] items-start pb-px pt-[26px] px-[26px] relative size-full">
        <Container80 />
        <Container81 />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[532px]">
      <Container67 />
      <Container74 />
      <Container79 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0">
      <Frame6 />
      <Frame7 />
    </div>
  );
}

function Pq() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start p-[24px] right-0 top-[69px] w-[1227px]" data-name="pq">
      <Container />
      <Container1 />
      <Container14 />
      <Container30 />
      <Frame8 />
    </div>
  );
}

export default function Reports() {
  return (
    <div className="bg-white relative size-full" data-name="Reports">
      <div className="absolute bg-white content-stretch flex h-[69px] items-center left-0 pl-[24px] pr-[40px] py-[20px] top-0 w-[1512px]" data-name="Header">
        <div aria-hidden="true" className="absolute border-[#d0d5dd] border-b border-solid inset-0 pointer-events-none" />
        <Frame4 />
      </div>
      <Sidebar />
      <Pq />
    </div>
  );
}