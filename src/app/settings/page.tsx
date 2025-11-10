"use client";

import { FormView } from "@/components/content-patterns/FormView";
import { useAppData } from "@/lib/data/useAppData";

export default function Settings() {
  const { data, loading, error } = useAppData();

  // Toggle hooks for content pattern selection
  const useFormView = true;

  if (loading) {
    return (
      <FormView
        formSchema={[]}
        initialData={{}}
        onSubmit={() => {}}
        title="Settings"
        description="Loading..."
      />
    );
  }

  if (error) {
    return (
      <FormView
        formSchema={[]}
        initialData={{}}
        onSubmit={() => {}}
        title="Settings"
        description={`Error loading data: ${error.message}`}
      />
    );
  }

  if (useFormView && data?.formView) {
    const handleSubmit = (formData: Record<string, any>) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("userSettings", JSON.stringify(formData));
      }
    };

    return (
      <FormView
        formSchema={data.formView.fields}
        initialData={{}}
        onSubmit={handleSubmit}
        title="Settings"
        description="Manage your settings"
      />
    );
  }

  return (
    <FormView
      formSchema={[]}
      initialData={{}}
      onSubmit={() => {}}
      title="Settings"
      description="No data available"
    />
  );
}
