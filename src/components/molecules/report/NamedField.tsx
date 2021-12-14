import React from "react";

interface NamedFieldProps {
  name: string;
  value?: string;
}

export const NamedField: React.FC<NamedFieldProps> = ({ name, value }) => (
  <div className="grid grid-cols-2 space-x-2">
    <div className="p-2 col-start-1 col-end-1">{`${name}:`}</div>
    <div className="p-2 col-start-2 col-end-2 rounded-md bg-gray-900">
      {value}
    </div>
  </div>
);
