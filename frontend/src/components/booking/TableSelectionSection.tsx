import { Users, Check } from "lucide-react";
import { TABLE_TYPES } from "../../constants/bookingConstants";
import type { TableType } from "../../constants/bookingConstants";
import { ErrorMessage } from "../ui/ErrorMessage";

interface TableSelectionSectionProps {
  selectedTable: string;
  onTableSelect: (tableName: string) => void;
  error?: string;
}

export const TableSelectionSection = ({
  selectedTable,
  onTableSelect,
  error,
}: TableSelectionSectionProps) => {
  return (
    <div className="bg-black/40 backdrop-blur-sm p-8">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Users className="w-6 h-6 text-primary" />
        Choose Your Table
      </h3>

      <div className="space-y-4">
        {TABLE_TYPES.map((table: TableType) => {
          const isSelected = selectedTable === table.name; // ✅ So sánh theo tên table
          return (
            <div
              key={table.id}
              onClick={() => onTableSelect(table.name)} // ✅ Gửi table.name thay vì id
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border/50 hover:border-primary/50 bg-black/20"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {table.name}
                  </h4>
                  <p className="text-primary font-medium">{table.capacity}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {table.price}
                  </div>
                  <div className="text-xs text-white/60">per table</div>
                </div>
              </div>
              <p className="text-white/70 text-sm">{table.description}</p>
              {isSelected && (
                <div className="flex items-center gap-2 mt-3 text-primary">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Selected</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ErrorMessage message={error} />
    </div>
  );
};
