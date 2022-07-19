async function main() {
  if (
    process.env.AZURE_PULL_REQUEST_ID === "$(System.PullRequest.PullRequestId)"
  ) {
    return "production";
    // is main
  } else {
    // is PR
    return "preview";
  }
}
main();
