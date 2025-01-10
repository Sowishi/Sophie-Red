"use client";

import { Label, Select } from "flowbite-react";

export function CustomSelect({ data = [], onChange, name, label }) {
  return (
    <div className="max-w-md mx-3">
      <div className="mb-2 block">
        <Label htmlFor="countries" value={label} />
      </div>
      <Select onChange={onChange} name={name} id="countries" required>
        {data.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </Select>
    </div>
  );
}
