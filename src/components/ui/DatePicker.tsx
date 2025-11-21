"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface Calendar22Props {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  className?: string
}

export function Calendar22({ value, onChange, disabled, className }: Calendar22Props) {
  const [date, setDate] = React.useState<Date>()

  const selected = value ?? date
  const handleSelect = (d?: Date) => {
    if (onChange) onChange(d)
    else setDate(d)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          data-empty={!selected}
          className={`data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal ${className ?? ""}`}
        >
          <CalendarIcon />
          {selected ? format(selected, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={selected} onSelect={handleSelect} disabled={disabled} />
      </PopoverContent>
    </Popover>
  )
}