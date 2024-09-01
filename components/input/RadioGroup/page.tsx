import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

interface Props {
  dataArr: { id: number; label: string }[];
  infodata: string | number;
  handleChange: (e: any) => void;
}
const RadioGroupSelector = ({ dataArr, infodata, handleChange }: Props) => {
  return (
    <div>
      <RadioGroup
        row
        className="b w-full h-[55px]  flex items-center justify-start pl-4 md:pl-1 "
      >
        {dataArr?.map((data) => (
          <FormControlLabel
            key={data.id}
            value={data.label}
            className="dark:text-[#D1D5DB] text-whiteText"
            control={
              <Radio
                checked={data.label === infodata}
                className="dark:text-[#D1D5DB]"
                onChange={(e) => handleChange(e)}
              />
            }
            label={data.label}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioGroupSelector;
