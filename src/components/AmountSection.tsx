import { Scale, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Amount() {
  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Income Card */}
        <Card className="border border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm font-medium ">Income</p>
            </div>
            <h2 className="text-3xl font-bold text-green-600">₹42,000</h2>
          </CardContent>
        </Card>

        {/* Expense Card */}
        <Card className="border border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-sm font-medium ">Expense</p>
            </div>
            <h2 className="text-3xl font-bold text-red-600">₹33,000</h2>
          </CardContent>
        </Card>

        {/* Remaining Card */}
        <Card className="border border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Scale className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm font-medium ">Remaining</p>
            </div>
            <h2 className="text-3xl font-bold text-blue-600">₹9,000</h2>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
