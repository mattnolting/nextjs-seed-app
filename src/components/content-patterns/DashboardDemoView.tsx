"use client";

import { useRef, useEffect, useState } from "react";
import {
  PageSection,
  Content,
  Gallery,
  GalleryItem,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Grid,
  GridItem,
  Title,
} from "@patternfly/react-core";
import {
  ChartArea,
  ChartBar,
  ChartDonut,
  ChartThemeColor,
} from "@patternfly/react-charts";

export function DashboardDemoView() {
  const chart1Ref = useRef<HTMLDivElement>(null);
  const chart2Ref = useRef<HTMLDivElement>(null);
  const chart3Ref = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(400);

  useEffect(() => {
    const updateWidth = () => {
      // Use any of the refs to measure container width
      const ref = chart1Ref.current || chart2Ref.current || chart3Ref.current;
      if (ref) {
        const width = ref.offsetWidth || 400;
        setChartWidth(Math.max(width - 40, 300)); // Account for padding
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      updateWidth();
    });

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  // Mock data for charts
  const latencyData = [
    { name: "Latency", x: "00:00", y: 120 },
    { name: "Latency", x: "04:00", y: 98 },
    { name: "Latency", x: "08:00", y: 145 },
    { name: "Latency", x: "12:00", y: 132 },
    { name: "Latency", x: "16:00", y: 110 },
    { name: "Latency", x: "20:00", y: 115 },
    { name: "Latency", x: "24:00", y: 125 },
  ];

  const trafficData = [
    { name: "Traffic", x: "Mon", y: 450 },
    { name: "Traffic", x: "Tue", y: 520 },
    { name: "Traffic", x: "Wed", y: 380 },
    { name: "Traffic", x: "Thu", y: 610 },
    { name: "Traffic", x: "Fri", y: 490 },
  ];

  const errorData = [
    { x: "HTTP 4xx", y: 15 },
    { x: "HTTP 5xx", y: 8 },
    { x: "Timeouts", y: 12 },
    { x: "Other", y: 5 },
  ];

  return (
    <>
      <PageSection isWidthLimited>
        <Content>
          <Title headingLevel="h1">Dashboard</Title>
          <p>
            This is a PatternFly-based dashboard built with React components.
          </p>
        </Content>
      </PageSection>

      <PageSection isWidthLimited>
        <Grid hasGutter>
          <GridItem span={12} md={6} lg={3}>
            <Card isCompact>
              <CardHeader>
                <CardTitle>CPU utilization</CardTitle>
              </CardHeader>
              <CardBody>42%</CardBody>
            </Card>
          </GridItem>
          <GridItem span={12} md={6} lg={3}>
            <Card isCompact>
              <CardHeader>
                <CardTitle>Memory</CardTitle>
              </CardHeader>
              <CardBody>68% used</CardBody>
            </Card>
          </GridItem>
          <GridItem span={12} md={6} lg={3}>
            <Card isCompact>
              <CardHeader>
                <CardTitle>Nodes</CardTitle>
              </CardHeader>
              <CardBody>8 healthy</CardBody>
            </Card>
          </GridItem>
          <GridItem span={12} md={6} lg={3}>
            <Card isCompact>
              <CardHeader>
                <CardTitle>Pods</CardTitle>
              </CardHeader>
              <CardBody>124 running</CardBody>
            </Card>
          </GridItem>
        </Grid>
      </PageSection>

      <PageSection isWidthLimited>
        <Gallery hasGutter>
          <GalleryItem>
            <Card>
              <CardHeader>
                <CardTitle>Latency</CardTitle>
              </CardHeader>
              <CardBody>
                <div ref={chart1Ref} style={{ height: "200px", width: "100%" }}>
                  {chartWidth > 0 && (
                    <ChartArea
                      data={latencyData}
                      themeColor={ChartThemeColor.blue}
                      height={200}
                      width={chartWidth}
                      padding={{ bottom: 40, left: 60, right: 20, top: 20 }}
                    />
                  )}
                </div>
              </CardBody>
            </Card>
          </GalleryItem>
          <GalleryItem>
            <Card>
              <CardHeader>
                <CardTitle>Traffic</CardTitle>
              </CardHeader>
              <CardBody>
                <div ref={chart2Ref} style={{ height: "200px", width: "100%" }}>
                  {chartWidth > 0 && (
                    <ChartBar
                      data={trafficData}
                      themeColor={ChartThemeColor.green}
                      height={200}
                      width={chartWidth}
                      padding={{ bottom: 40, left: 60, right: 20, top: 20 }}
                    />
                  )}
                </div>
              </CardBody>
            </Card>
          </GalleryItem>
          <GalleryItem>
            <Card>
              <CardHeader>
                <CardTitle>Errors</CardTitle>
              </CardHeader>
              <CardBody>
                <div ref={chart3Ref} style={{ height: "200px", width: "100%" }}>
                  {chartWidth > 0 && (
                    <ChartDonut
                      data={errorData}
                      themeColor={ChartThemeColor.multi}
                      height={200}
                      width={chartWidth}
                      legendPosition="bottom"
                      padding={{ bottom: 60, left: 20, right: 20, top: 20 }}
                    />
                  )}
                </div>
              </CardBody>
            </Card>
          </GalleryItem>
        </Gallery>
      </PageSection>

      <PageSection isWidthLimited>
        <Grid hasGutter>
          <GridItem span={12} md={6}>
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardBody>
                This section provides a summary of recent activity.
              </CardBody>
            </Card>
          </GridItem>
          <GridItem span={12} md={6}>
            <Card>
              <CardHeader>
                <CardTitle>Recent events</CardTitle>
              </CardHeader>
              <CardBody>Event list placeholder</CardBody>
            </Card>
          </GridItem>
        </Grid>
      </PageSection>
    </>
  );
}
