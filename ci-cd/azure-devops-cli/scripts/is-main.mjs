async function main() {
  if (
    process.env.AZURE_PULL_REQUEST_ID === "$(System.PullRequest.PullRequestId)"
  ) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}
main();
