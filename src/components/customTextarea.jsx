"use client";

import { Label, Textarea } from "flowbite-react";

export function CustomTextArea({
  label,
  placeholder,
  onChange,
  value,
  type,
  name,
}) {
  return (
    <div className="max-w-md mx-3">
      <div className="mb-2 block">
        <Label htmlFor="comment" value={label} />
      </div>
      <Textarea
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder}
        required
        rows={5}
      />
    </div>
  );
}
