"use client";

import { useState, useEffect } from "react";
import { FormView } from "@/components/content-patterns/FormView";
import { useAppData } from "@/lib/data/useAppData";
import {
  PageSection,
  Title,
  Form,
  FormGroup,
  TextInput,
  FormSelect,
  FormSelectOption,
  ActionGroup,
  Button,
  Alert,
} from "@patternfly/react-core";

export default function Settings() {
  const { data, loading, error } = useAppData();

  // Toggle hooks for content pattern selection
  const useFormView = true;
  const useCustomForm = false;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    title: "",
    timeZone: "Eastern",
  });
  const [isSaved, setIsSaved] = useState(false);

  // Load initial values from data if available
  useEffect(() => {
    if (data?.formView?.fields && !loading) {
      const initialValues: Record<string, string> = {};
      data.formView.fields.forEach((field) => {
        if (field.type === "select" && field.options?.[0]?.value) {
          initialValues[field.name] = field.options[0].value;
        } else {
          initialValues[field.name] = "";
        }
      });
      if (initialValues.timeZone) {
        setFormData((prev) => ({ ...prev, ...initialValues }));
      }
    }
  }, [data, loading]);

  // Load saved settings from localStorage on mount
  // This is a valid use case for setState in useEffect (synchronizing external state)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("userSettings");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Synchronizing external state (localStorage) with React state after mount
          setFormData((prev) => ({ ...prev, ...parsed }));
        } catch {
          // Invalid JSON, ignore
        }
      }
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("userSettings", JSON.stringify(formData));
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCancel = () => {
    // Reset form
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("userSettings");
      if (saved) {
        setFormData(JSON.parse(saved));
      } else {
        setFormData({
          fullName: "",
          email: "",
          title: "",
          timeZone: "Eastern",
        });
      }
    }
  };

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
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("userSettings", JSON.stringify(formData));
      }
    };

    return (
      <FormView
        formSchema={data.formView.fields}
        initialData={formData}
        onSubmit={handleSubmit}
        title="Settings"
        description="Manage your account settings"
      />
    );
  }

  if (useCustomForm) {
    return (
      <>
        <PageSection>
          <Title headingLevel="h1" size="2xl">
            Settings
          </Title>
        </PageSection>
        <PageSection>
          {isSaved && (
            <Alert
              variant="success"
              title="Settings saved successfully"
              isInline
              style={{ marginBottom: "var(--pf-v5-global--spacer--md)" }}
            />
          )}
          <Form
            isHorizontal
            isWidthLimited
            maxWidth="600px"
            onSubmit={handleSubmit}
          >
            <FormGroup label="Full name" fieldId="full-name">
              <TextInput
                id="full-name"
                value={formData.fullName}
                onChange={(_event, value) =>
                  setFormData({ ...formData, fullName: value })
                }
              />
            </FormGroup>

            <FormGroup label="Email" fieldId="email">
              <TextInput
                id="email"
                type="email"
                value={formData.email}
                onChange={(_event, value) =>
                  setFormData({ ...formData, email: value })
                }
              />
            </FormGroup>

            <FormGroup label="Title" fieldId="title">
              <FormSelect
                id="title"
                value={formData.title}
                onChange={(_event, value) =>
                  setFormData({ ...formData, title: value })
                }
              >
                <FormSelectOption value="" label="Select one" />
                <FormSelectOption value="Mr" label="Mr" />
                <FormSelectOption value="Miss" label="Miss" />
                <FormSelectOption value="Mrs" label="Mrs" />
                <FormSelectOption value="Ms" label="Ms" />
                <FormSelectOption value="Dr" label="Dr" />
                <FormSelectOption value="Other" label="Other" />
              </FormSelect>
            </FormGroup>

            <FormGroup label="Time zone" fieldId="timezone">
              <FormSelect
                id="timezone"
                value={formData.timeZone}
                onChange={(_event, value) =>
                  setFormData({ ...formData, timeZone: value })
                }
              >
                <FormSelectOption value="Eastern" label="Eastern" />
                <FormSelectOption value="Central" label="Central" />
                <FormSelectOption value="Pacific" label="Pacific" />
              </FormSelect>
            </FormGroup>

            <ActionGroup>
              <Button type="submit" variant="primary">
                Save
              </Button>
              <Button type="button" variant="link" onClick={handleCancel}>
                Cancel
              </Button>
            </ActionGroup>
          </Form>
        </PageSection>
      </>
    );
  }

  return null;
}
