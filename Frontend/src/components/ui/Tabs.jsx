import React, { useState } from 'react';

export function Tabs({ children, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { selectedValue: value, setValue })
  );
}

export function TabsList({ children }) {
  return <div className="flex space-x-2 mb-2">{children}</div>;
}

export function TabsTrigger({ value, selectedValue, setValue, children }) {
  const isActive = selectedValue === value;
  return (
    <button
      onClick={() => setValue(value)}
      className={`px-4 py-2 rounded ${
        isActive ? 'bg-blue-500 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, selectedValue, children }) {
  return selectedValue === value ? <div>{children}</div> : null;
}
