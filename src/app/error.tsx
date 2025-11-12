"use client";

import { useEffect } from "react";
import {
  Button,
  EmptyState,
  EmptyStateBody,
  PageSection,
} from "@patternfly/react-core";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const raf = requestAnimationFrame(() => console.error(error));
    return () => cancelAnimationFrame(raf);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <PageSection isFilled aria-label="Application error">
          <EmptyState
            headingLevel="h1"
            titleText="Something went wrong"
            icon={ExclamationCircleIcon}
          >
            <EmptyStateBody>
              We ran into an unexpected error while rendering this page. Try the
              action below to retry, or return to the navigation to continue
              exploring the application.
            </EmptyStateBody>
            <Button variant="primary" onClick={() => reset()}>
              Try again
            </Button>
          </EmptyState>
        </PageSection>
      </body>
    </html>
  );
}
