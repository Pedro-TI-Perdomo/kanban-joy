import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormConfig, FormField } from "@/types/formConfig";
import { cn } from "@/lib/utils";

interface DynamicFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, unknown>) => void;
  config: FormConfig;
}

export function DynamicFormModal({
  isOpen,
  onClose,
  onSubmit,
  config,
}: DynamicFormModalProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data with default values
  useEffect(() => {
    if (isOpen) {
      const initialData: Record<string, unknown> = {};
      config.fields.forEach((field) => {
        if (field.defaultValue !== undefined) {
          initialData[field.id] = field.defaultValue;
        } else if (field.type === "checkbox") {
          initialData[field.id] = false;
        } else {
          initialData[field.id] = "";
        }
      });
      setFormData(initialData);
      setErrors({});
    }
  }, [isOpen, config.fields]);

  const handleChange = (fieldId: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors((prev) => ({ ...prev, [fieldId]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    config.fields.forEach((field) => {
      if (field.required) {
        const value = formData[field.id];
        if (value === undefined || value === "" || value === null) {
          newErrors[field.id] = "Este campo é obrigatório";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Inclui o formId nos dados do formulário
      onSubmit({ ...formData, _formId: config.formId });
      onClose();
    }
  };

  const renderField = (field: FormField) => {
    const hasError = !!errors[field.id];

    switch (field.type) {
      case "text":
        return (
          <Input
            id={field.id}
            type="text"
            placeholder={field.placeholder}
            value={(formData[field.id] as string) || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={cn(hasError && "border-destructive")}
          />
        );

      case "number":
        return (
          <Input
            id={field.id}
            type="number"
            placeholder={field.placeholder}
            value={(formData[field.id] as number) || ""}
            min={field.min}
            max={field.max}
            onChange={(e) => handleChange(field.id, e.target.valueAsNumber || "")}
            className={cn(hasError && "border-destructive")}
          />
        );

      case "textarea":
        return (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={(formData[field.id] as string) || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={cn("resize-none", hasError && "border-destructive")}
            rows={3}
          />
        );

      case "date":
        return (
          <Input
            id={field.id}
            type="date"
            value={(formData[field.id] as string) || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={cn(hasError && "border-destructive")}
          />
        );

      case "select":
        return (
          <Select
            value={(formData[field.id] as string) || ""}
            onValueChange={(value) => handleChange(field.id, value)}
          >
            <SelectTrigger className={cn(hasError && "border-destructive")}>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <Checkbox
              id={field.id}
              checked={(formData[field.id] as boolean) || false}
              onCheckedChange={(checked) => handleChange(field.id, checked)}
            />
            <Label htmlFor={field.id} className="text-sm font-normal cursor-pointer">
              {field.label}
            </Label>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 bg-black/20 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        className={cn(
          "fixed z-50 bg-card border border-border rounded-xl shadow-2xl",
          "animate-in slide-in-from-bottom-4 fade-in-0 duration-300",
          // Desktop: bottom-right, max 30% width
          "md:bottom-4 md:right-4 md:w-[30vw] md:max-w-md md:min-w-80",
          // Mobile: full width at bottom
          "bottom-0 left-0 right-0 md:left-auto w-full md:rounded-xl rounded-t-xl rounded-b-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">{config.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[60vh] md:max-h-[50vh] overflow-y-auto scrollbar-thin">
          {/* Ordena os campos pelo order antes de renderizar */}
          {[...config.fields]
            .sort((a, b) => a.order - b.order)
            .map((field) => (
              <div key={field.id} className="space-y-1.5">
                {field.type !== "checkbox" && (
                  <Label htmlFor={field.id} className="text-sm">
                    {field.label}
                    {field.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </Label>
                )}
                {renderField(field)}
                {errors[field.id] && (
                  <p className="text-xs text-destructive">{errors[field.id]}</p>
                )}
              </div>
            ))}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-border">
          <Button variant="ghost" onClick={onClose}>
            {config.cancelLabel || "Cancelar"}
          </Button>
          <Button onClick={handleSubmit}>
            {config.submitLabel || "Salvar"}
          </Button>
        </div>
      </div>
    </>
  );
}
