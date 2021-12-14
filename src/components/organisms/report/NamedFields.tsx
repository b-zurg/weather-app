import React from "react";
import { NamedField } from "../../molecules/report/NamedField";

interface NamedFieldProps {
  values: [name: string, value?: string][];
  title: string;
}

export const NamedFields: React.FC<NamedFieldProps> = ({ values, title }) => {
  return (
    <div className="col-span-1 min-w-fit space-y-2 p-3 rounded-lg bg-gray-700 shadow-lg">
      <div className="text-2xl underline py-3">{title}</div>
      {values.map(([name, value], idx) => (
        <NamedField key={name + idx} name={name} value={value} />
      ))}
    </div>
  );
};
