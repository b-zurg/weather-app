import React from "react";
import { debounce } from "lodash";
interface TextInputProps {
  onChange: (value: string) => void;
  initialValue?: string;
}
export const TextInput: React.FC<TextInputProps> = ({
  onChange,
  initialValue,
}) => {
  const debouncedChange = debounce((value: string) => onChange(value), 300);
  return (
    <input
      type="text"
      placeholder={initialValue}
      className="mt-1 text-gray-900 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
      onChange={(event) => debouncedChange(event.target.value)}
    />
  );
};
