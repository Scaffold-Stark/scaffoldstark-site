---
sidebar_position: 2
---

# Pull Requests

## Pull Request Process

We follow the ["fork-and-pull" Git workflow](https://github.com/Scaffold-Stark/scaffold-stark-2)

1. Fork the repo
2. Clone the project
3. Create a new branch with a descriptive name
4. Commit your changes to the new branch
5. Push changes to your fork
6. Open a PR in our repository and tag one of the maintainers to review your PR

## Tips for Pull Requests

- Create a title for the PR that accurately defines the work done with conventional commits with proper prefix. Make sure we can tell what you have done in the title.

```
fix: useScaffoldReadContract unable to read error
feat: switch buttons within debug page
chore: bump version of starknetjs
docs: update README.md for new dependencies
build: update CI for branch sync
```

- Structure the description neatly to make it easy to consume by the readers. For example, you can include bullet points and screenshots instead of having one large paragraph.
- If the PR is an attempt that solves an issue, include `Fixes #XXX` or `Closes #XXX`in your description so that GitHub can link the issue and close it.
- Have a good commit message that summarises the work done, use conventional commits like the above example as well.

Once you submit your PR:

- We may ask questions, request additional information, or ask for changes to be made before a PR can be merged. Please note that these are to make the PR clear for everyone involved and aims to create a frictionless interaction process.
- As you update your PR and apply changes, mark each conversation resolved.

Once the PR is approved, we'll "squash-and-merge" to keep the git commit history clean.
