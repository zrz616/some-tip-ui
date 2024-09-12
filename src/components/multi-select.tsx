"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
];

export default function MultiSelect() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<typeof fruits>([]);

  const handleSelect = (currentValue: string) => {
    const newSelected = selected.some((item) => item.value === currentValue)
      ? selected.filter((item) => item.value !== currentValue)
      : [...selected, fruits.find((fruit) => fruit.value === currentValue)!];
    setSelected(newSelected);
  };

  const handleRemove = (currentValue: string) => {
    const newSelected = selected.filter((item) => item.value !== currentValue);
    setSelected(newSelected);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected.length > 0
            ? `${selected.length} selected`
            : "Select fruits"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search fruits..." />
          <CommandList>
            <CommandEmpty>No fruit found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {fruits.map((fruit) => (
                <CommandItem
                  key={fruit.value}
                  onSelect={() => handleSelect(fruit.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.some((item) => item.value === fruit.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {fruit.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      <div className="flex flex-wrap gap-2 mt-2">
        {selected.map((item) => (
          <Badge key={item.value} variant="secondary">
            {item.label}
            <button
              className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleRemove(item.value);
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={() => handleRemove(item.value)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
      </div>
    </Popover>
  );
}
