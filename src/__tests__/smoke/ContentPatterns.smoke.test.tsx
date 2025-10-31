import { render, screen } from "@testing-library/react";
import { DashboardView } from "@/components/content-patterns/DashboardView";
import { Card, CardBody } from "@patternfly/react-core";
import { CardView } from "@/components/content-patterns/CardView";
import { TableView } from "@/components/content-patterns/TableView";

describe("Content patterns", () => {
  it("DashboardView renders children", () => {
    render(
      <DashboardView title="Test">
        <Card>
          <CardBody>Metric</CardBody>
        </Card>
      </DashboardView>
    );
    expect(screen.getByText("Metric")).toBeInTheDocument();
  });

  it("CardView renders items", () => {
    render(
      <CardView
        items={[{ id: "1", title: "Card 1", content: <div>One</div> }]}
      />
    );
    expect(screen.getByText("Card 1")).toBeInTheDocument();
  });

  it("TableView renders table", () => {
    render(
      <TableView columns={["A", "B"]} rows={[{ id: 1, cells: ["x", "y"] }]} />
    );
    // PF v6 Table uses role="grid"
    expect(screen.getByRole("grid", { name: /data table/i })).toBeInTheDocument();
  });
});
