"use client";

/**
 * SAMPLE CONTENT PATTERN
 * ----------------------
 * Example of a PatternFly form rendered from a JSON schema. Provided for demo
 * purposes so teams can see how to wire form controls; feel free to replace or
 * streamline it for production use.
 */

import { useState, useEffect } from "react";
import {
  PageSection,
  Title,
  Form,
  FormGroup,
  TextInput,
  FormSelect,
  FormSelectOption,
  TextArea,
  Checkbox,
  Radio,
  ActionGroup,
  Button,
  Alert,
} from "@patternfly/react-core";
import type { FormField } from "@/lib/data/types";

export interface FormViewProps {
  formSchema: FormField[];
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
}

export function FormView({
  formSchema,
  initialData = {},
  onSubmit,
  onCancel,
  title = "Form",
  description,
}: FormViewProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize form data from schema defaults
  useEffect(() => {
    const defaults: Record<string, unknown> = {};
    formSchema.forEach((field) => {
      if (field.type === "checkbox" || field.type === "radio") {
        defaults[field.name] = [];
      } else if (field.type === "select" && field.options?.[0]?.value) {
        defaults[field.name] = field.options[0].value;
      } else {
        defaults[field.name] = "";
      }
    });
    const raf = requestAnimationFrame(() => {
      setFormData({ ...defaults, ...initialData });
    });
    return () => cancelAnimationFrame(raf);
  }, [formSchema, initialData]);

  const validateField = (field: FormField, value: unknown): string | null => {
    if (!field.validation) return null;

    const { required, minLength, maxLength, pattern } = field.validation;

    if (required && (value === "" || value === null || value === undefined)) {
      return `${field.label} is required`;
    }

    if (typeof value === "string") {
      if (minLength && value.length < minLength) {
        return `${field.label} must be at least ${minLength} characters`;
      }
      if (maxLength && value.length > maxLength) {
        return `${field.label} must be no more than ${maxLength} characters`;
      }
      if (pattern) {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
          return `${field.label} format is invalid`;
        }
      }
    }

    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    formSchema.forEach((field) => {
      const value = formData[field.name];
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (name: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCheckboxChange = (
    name: string,
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => {
      const current = Array.isArray(prev[name])
        ? (prev[name] as string[])
        : [];
      const nextValues: string[] = checked
        ? [...current, value]
        : current.filter((v) => v !== value);
      return { ...prev, [name]: nextValues };
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Reset to initial data
      setFormData(initialData);
      setErrors({});
    }
  };

  const renderField = (field: FormField) => {
    const rawValue = formData[field.name];
    const stringValue = typeof rawValue === "string" ? rawValue : "";
    const arrayValue = Array.isArray(rawValue)
      ? (rawValue as string[])
      : [];
    const error = errors[field.name];

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <TextInput
            id={field.name}
            type={field.type}
            value={stringValue}
            onChange={(_event, val) => handleChange(field.name, val)}
            placeholder={field.placeholder}
            validated={error ? "error" : "default"}
            aria-describedby={error ? `${field.name}-helper` : undefined}
          />
        );

      case "textarea":
        return (
          <TextArea
            id={field.name}
            value={stringValue}
            onChange={(_event, val) => handleChange(field.name, val)}
            placeholder={field.placeholder}
            validated={error ? "error" : "default"}
            aria-describedby={error ? `${field.name}-helper` : undefined}
          />
        );

      case "select":
        return (
          <FormSelect
            id={field.name}
            value={stringValue}
            onChange={(_event, val) => handleChange(field.name, val)}
          >
            {field.options?.map((option) => (
              <FormSelectOption
                key={option.value}
                value={option.value}
                label={option.label}
              />
            ))}
          </FormSelect>
        );

      case "checkbox":
        return (
          <div>
            {field.options?.map((option) => (
              <Checkbox
                key={option.value}
                id={`${field.name}-${option.value}`}
                label={option.label}
                isChecked={arrayValue.includes(option.value)}
                onChange={(_event, checked) =>
                  handleCheckboxChange(field.name, option.value, checked)
                }
              />
            ))}
          </div>
        );

      case "radio":
        return (
          <div>
            {field.options?.map((option) => (
              <Radio
                key={option.value}
                id={`${field.name}-${option.value}`}
                name={field.name}
                label={option.label}
                isChecked={rawValue === option.value}
                onChange={(_event, checked) => {
                  if (checked) {
                    handleChange(field.name, option.value);
                  }
                }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <PageSection>
        <Title headingLevel="h1" size="2xl">
          {title}
        </Title>
        {description && <p>{description}</p>}
      </PageSection>
      <PageSection>
        {isSubmitted && (
          <Alert
            variant="success"
            title="Form submitted successfully"
            isInline
          />
        )}
        <Form
          isHorizontal
          isWidthLimited
          maxWidth="600px"
          onSubmit={handleSubmit}
        >
          {formSchema.map((field) => {
            const error = errors[field.name];
            return (
              <FormGroup
                key={field.name}
                label={field.label}
                fieldId={field.name}
                isRequired={field.required || field.validation?.required}
              >
                {renderField(field)}
                {error && (
                  <div
                    style={{
                      color: "var(--pf-global--danger-color--100)",
                      fontSize: "var(--pf-global--FontSize--sm)",
                      marginTop: "var(--pf-global--spacer--xs)",
                    }}
                  >
                    {error}
                  </div>
                )}
              </FormGroup>
            );
          })}

          <ActionGroup>
            <Button type="submit" variant="primary">
              Submit
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
