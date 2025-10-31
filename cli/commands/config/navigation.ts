import chalk from "chalk";
import path from "path";
import fs from "fs/promises";
import inquirer from "inquirer";

export async function configNavigationCommand() {
  console.log(chalk.blue.bold("\n🧭 Configuring Navigation\n"));

  try {
    const projectRoot = process.cwd();
    const routesJsonPath = path.join(projectRoot, "public", "routes.json");

    // Read existing routes
    let routes: any[] = [];
    try {
      const existing = await fs.readFile(routesJsonPath, "utf-8");
      const parsed = JSON.parse(existing);
      routes = Array.isArray(parsed?.routes) ? parsed.routes : [];
    } catch {
      console.log(
        chalk.yellow(
          "No existing routes.json found. Run 'npm run sync routes' first."
        )
      );
      return;
    }

    console.log(chalk.cyan(`Found ${routes.length} routes\n`));

    let done = false;
    while (!done) {
      const { action } = await inquirer.prompt<{
        action: "edit" | "reorder" | "save" | "cancel";
      }>([
        {
          type: "list",
          name: "action",
          message: "What would you like to do?",
          choices: [
            { name: "Edit a route (title, hidden, order)", value: "edit" },
            { name: "Save & exit", value: "save" },
            { name: "Cancel", value: "cancel" },
          ],
        },
      ]);

      if (action === "cancel") {
        console.log(chalk.yellow("\nCancelled. No changes written.\n"));
        return;
      }

      if (action === "edit") {
        const { routePath } = await inquirer.prompt<{ routePath: string }>([
          {
            type: "list",
            name: "routePath",
            message: "Select a route to edit",
            choices: routes.map((r, idx) => ({
              name: `${idx + 1}. ${r.path}  (${r.title ?? "Untitled"})`,
              value: r.path,
            })),
          },
        ]);

        const route = routes.find((r) => r.path === routePath)!;
        const answers = await inquirer.prompt<{
          title: string;
          hidden: boolean;
          order: number;
        }>([
          {
            type: "input",
            name: "title",
            message: "Title",
            default: route.title ?? "",
          },
          {
            type: "confirm",
            name: "hidden",
            message: "Hidden?",
            default: !!route.hidden,
          },
          {
            type: "number",
            name: "order",
            message: "Order (lower appears first)",
            default:
              typeof route.order === "number"
                ? route.order
                : routes.indexOf(route) + 1,
            validate: (val) =>
              val !== undefined && Number.isFinite(val) && val > 0
                ? true
                : "Enter a positive number",
          },
        ]);

        route.title = answers.title;
        route.hidden = answers.hidden;
        route.order = answers.order;

        // Normalize to stable ordering by order then existing index
        routes = routes
          .map((r, idx) => ({ r, idx }))
          .sort((a, b) => {
            const ao = typeof a.r.order === "number" ? a.r.order : a.idx + 1;
            const bo = typeof b.r.order === "number" ? b.r.order : b.idx + 1;
            if (ao !== bo) return ao - bo;
            return a.idx - b.idx;
          })
          .map(({ r }) => r);

        console.log(chalk.green("Updated."));
        continue;
      }

      if (action === "save") {
        // Write file
        const payload = { routes, lastSynced: new Date().toISOString() };
        await fs.writeFile(
          routesJsonPath,
          JSON.stringify(payload, null, 2),
          "utf-8"
        );
        console.log(
          chalk.green(
            `\n✅ Saved ${routes.length} routes to public/routes.json\n`
          )
        );
        done = true;
      }
    }
  } catch (error) {
    console.error(chalk.red("\n❌ Error:"), error);
    process.exit(1);
  }
}
