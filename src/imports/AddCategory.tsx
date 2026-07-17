function Container() {
  return (
    <div className="content-stretch flex flex-col h-[50.992px] items-start not-italic relative shrink-0 w-full whitespace-nowrap" data-name="Container">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#111827] text-[16px] tracking-[-0.55px]">Add New Category</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#696d77] text-[14px]">Create a new category</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#696d77] text-[16px] whitespace-nowrap">Enter category name</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative w-full">
          <Content />
        </div>
      </div>
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Category Name</p>
      <Input />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#696d77] text-[16px] whitespace-nowrap">Write description here</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[71px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      <div className="content-stretch flex gap-[8px] items-start px-[14px] py-[10px] relative size-full">
        <Content1 />
      </div>
    </div>
  );
}

function InputWithLabel1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Description</p>
      <Input1 />
    </div>
  );
}

function InputDropdownBase() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="_Input dropdown base">
      <InputWithLabel1 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[6.8px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e8e9] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[17px] py-[9px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center whitespace-nowrap">Cancel</p>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-[282px]">
      <Button />
      <div className="bg-[#e91835] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]" data-name="_Button base">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[16px] py-[10px] relative w-full">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Create</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e91835] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
    </div>
  );
}

export default function AddCategory() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[21px] items-end p-[25px] relative rounded-[10px] size-full" data-name="Add Category">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Container />
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="_Input dropdown base">
        <InputWithLabel />
      </div>
      <InputDropdownBase />
      <Frame />
    </div>
  );
}