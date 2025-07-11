import React from "react";


export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className="border p-2 rounded w-full" />
  );
}

