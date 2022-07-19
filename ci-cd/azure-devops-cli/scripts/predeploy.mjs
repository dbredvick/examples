#!/usr/bin/env node
import fs from "fs";
import path from "path";
import * as azdev from "azure-devops-node-api";

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || !args.length) {
    return console.log(`Predeploy script for Vercel preview.

  --update-pr
    
    Updates the PR description with
    the Vercel Preview URL.

`);
  }
  const deploymentUrlPath = path.join(process.cwd(), "deployment-url.txt");
  if (
    process.env.AZURE_PULL_REQUEST_ID === "$(System.PullRequest.PullRequestId)"
  ) {
    console.log("exiting");
    // we don't want to run this script unless we're previewing. A different pipeline covers prod deployments
    process.exit(0);
  }
  if (args.includes("--update-pr")) {
    if (
      process.env.AZURE_PULL_REQUEST_ID !==
        "$(System.PullRequest.PullRequestId)" &&
      process.env.AZURE_PAT
    ) {
      try {
        const authHandler = azdev.getPersonalAccessTokenHandler(
          process.env.AZURE_PAT
        );

        const url = fs.readFileSync(deploymentUrlPath, "utf8");

        console.log("Connecting to Azure Devops Web API...");
        const connection = new azdev.WebApi(
          process.env.AZURE_ORG_URL,
          authHandler
        );

        console.log("Getting Git Api...");
        const build = await connection.getGitApi();

        console.log("Getting Pull Request description...");
        let { description = "" } = await build.getPullRequestById(
          process.env.AZURE_PULL_REQUEST_ID,
          process.env.AZURE_PROJECT
        );

        const preview = {
          url,
        };

        console.log(
          "Updating Pull Request description with the following information:",
          preview
        );

        const header = "Preview Deployment is available";
        const hasPreviewInfo = description.includes(header);
        if (hasPreviewInfo) {
          console.log(
            "Pull request already contains Vercel preview information, updating..."
          );
          description = description.replace(
            /(Preview URL: ).*/,
            `$1[${preview.url}](${preview.url})`
          );
        } else {
          console.log(
            "Adding Vercel preview information to the bottom of the description..."
          );
          const vercelDashboard = process.env.VERCEL_DASHBOARD;
          const template = `${header}
- 🔍 Vercel dashboard: [${vercelDashboard}](${vercelDashboard})
- ✅ Preview URL: [${preview.url}](${preview.url})`;
          description += `\n\n${template}`;
        }

        console.log("Updating Pull Request with new description");
        const pr = await build.updatePullRequest(
          { description: description.trim() },
          process.env.AZURE_REPOSITORY_ID,
          process.env.AZURE_PULL_REQUEST_ID,
          process.env.AZURE_PROJECT
        );
        build.updatePullRequest({ description: description.trim() });
        console.log(
          `Pull Request #${pr.pullRequestId} updated successfully 🎉`
        );
      } catch (error) {
        console.error("Pull Request could not be updated", error);
        // TODO: try to write a link to the Vercel logs to the PR
        process.exit(1);
      }
    }
  }
}

main();
