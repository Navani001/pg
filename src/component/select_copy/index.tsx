import { Select, SelectItem } from "@heroui/react";
import React from "react";

interface SelectItem {
  id?: string;
  item?: string;
}

// type for the selectComponent
export interface SelectComponentDatas {
  className?: string;
  triggerClassName?: string;
  placeHolderClassName?: string;
  selectorIcon?: React.ReactNode;
  selectorIconClassName?: string;
  selectBaseClass?: string;
  selectListBoxClass?: string;
  selectDescriptionClass?: string;
  selectErrorClass?: string;
  selectSpinnerClass?: string;
  selectMainWrapperClass?: string;
  selectInnerWrapperClass?: string;
  selectHelperClass?: string;
  selectLabelClass?: string;
  selectListWrapperClass?: string;
  selectPopOverClass?: string;
  selectItem?: {
    id?: string;
    item?: string;
    icon?: React.ReactNode;
    onClick?: (id: string) => void;
  };
  selectItems?: SelectComponentDatas["selectItem"][];
  placeHolder?: string;
  startContent?: React.ReactNode;
  selectionMode?: string;
  items?: SelectItem[];
  onSelectionChange?: (value: any) => void;
  value?: any;
  renderValue?: (items: any) => void;
  error?: boolean;
  errorMessage?: string;
  customErrorStyle?: string;
  selectedItem?: string[];
  onSelect?: (item: SelectComponentDatas["selectItem"]) => void;
}

export const SelectComponent = ({
  className = "",
  triggerClassName = "",
  placeHolderClassName = "",
  selectorIcon = "",
  selectorIconClassName = "",
  selectBaseClass = "",
  selectListBoxClass = "",
  selectDescriptionClass = "",
  selectErrorClass = "",
  selectSpinnerClass = "",
  selectMainWrapperClass = "",
  selectInnerWrapperClass = "",
  selectHelperClass = "",
  selectLabelClass = "",
  selectListWrapperClass = "",
  selectPopOverClass = "",
  selectItems = [],
  placeHolder,
  error= false,
  errorMessage= '',
  customErrorStyle = 'font-source text-[0.875rem] text-danger-200 font-normal',
  selectedItem = [],
  onSelect,
}: SelectComponentDatas) => {

  // Convert selectedItem array to Set for the Select component
  const selectedKeys = React.useMemo(() => {
    return new Set(selectedItem);
  }, [selectedItem]);

  return (
    <div>
      <Select
        disableAnimation
        className={className}
        disallowEmptySelection={true}
        placeholder={placeHolder}
        selectorIcon={selectorIcon || undefined}
        classNames={{
          trigger: triggerClassName,
          value: placeHolderClassName,
          selectorIcon: selectorIconClassName,
          base: selectBaseClass,
          listbox: selectListBoxClass,
          description: selectDescriptionClass,
          errorMessage: selectErrorClass,
          spinner: selectSpinnerClass,
          mainWrapper: selectMainWrapperClass,
          innerWrapper: selectInnerWrapperClass,
          helperWrapper: selectHelperClass,
          label: selectLabelClass,
          listboxWrapper: selectListWrapperClass,
          popoverContent: selectPopOverClass,
        }}
        onSelectionChange={(keys) => {
          const selectedId = Array.from(keys)[0] as string; // Extract selected item ID
          const selectedItem = selectItems?.find((item) => item?.id === selectedId);
          if (selectedItem?.onClick) {
            selectedItem?.onClick(selectedId); // Call the onClick function of the selected item
          }
        }}
        selectedKeys={selectedKeys}
      >
        {selectItems?.map((item) => {
          return (
            <SelectItem key={item?.id} id={item?.id}>
              {item?.icon ? (
                <div className="flex gap-2.5">
                  {item?.icon}
                  {item?.item}
                </div>
              ) : (
                item?.item
              )}
            </SelectItem>
          );
        })}
      </Select>
      			{/* Error message */}
			{error && errorMessage && (
				<p className={`${customErrorStyle}`}>{errorMessage}</p>
			)}
    </div>
  );
};
