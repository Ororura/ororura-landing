type ClassValue = false | null | string | undefined;

const cn = (...values: ClassValue[]) => {
  return values.filter(Boolean).join(" ");
};

export { cn };

