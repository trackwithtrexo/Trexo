import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Scale, TrendingDown, TrendingUp } from "lucide-react";

export default function Amount() {
  const stats = [
    {
      title: "Total Income",
      value: "42,000",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      accent: "bg-green-500",
    },
    {
      title: "Total Expense",
      value: "33,000",
      icon: TrendingDown,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      accent: "bg-red-500",
    },
    {
      title: "Remaining Balance",
      value: "9,000",
      icon: Scale,
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/20",
      accent: "bg-sky-500",
    },
  ];

return (
  <main className="w-full">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={cn(
            "relative overflow-hidden bg-card border border-border shadow-sm",
            "transition-all duration-300 hover:shadow-md hover:-translate-y-1",
            "before:absolute before:top-0 before:left-0 before:w-[2px] before:h-full",
            stat.accent.replace("bg-", "before:bg-")
          )}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              
              {/* Left Content */}
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {stat.title}
                </p>

                <div className="flex items-baseline gap-1">
                  <span
                    className={cn(
                      "text-lg font-medium opacity-70",
                      stat.color
                    )}
                  >
                    ₹
                  </span>

                  <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </h2>
                </div>
              </div>

              {/* Icon Box */}
              <div
                className={cn(
                  "p-2.5 rounded-xl border border-border bg-muted",
                  stat.bgColor
                )}
              >
                <stat.icon
                  className={cn("w-5 h-5", stat.color)}
                />
              </div>
            </div>

            {/* Subtle Accent Decoration */}
            <div
              className={cn(
                "absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-3xl opacity-10",
                stat.accent
              )}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  </main>
);

}