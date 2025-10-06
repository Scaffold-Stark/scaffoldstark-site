---
sidebar_position: 11
---

# Creating Your Own Extension

This section will help you develop custom extensions for Scaffold-Stark 2, from simple additions to more complex modifications.

## Extension Structure

Before diving into the development process, let's understand the structure an extension should follow:

```
your-extension/
├── extension/
│   ├── packages/
│   │   ├── snfoundry/        # (optional) For Foundry-specific additions
│   │   └── nextjs/
│   │       ├── app/        # Any new pages/files
│   │       │   └── my-page
│   │       │       ├── page.tsx
│   │       │
│   │       ├── ...         # Any extra files/directories
│   │       └── package.json  # Only include additional dependencies/scripts
│   ├── package.json        # Monorepo root package.json file
│   └── README.md           # Instance README
└── README.md               # Documentation for your extension
```

## Developing a Simple Extension

For simple extensions, such as adding a new page or component, you can directly create the extension structure without going through the full development workflow. Here's how:

1. Create the directory structure as shown above.
2. Add your new page or component in the appropriate directory.
3. If needed, create a `package.json` with any additional dependencies.
4. Push your extension to our [create-stark-extension](https://github.com/Scaffold-Stark/create-starknet-extensions) github and create a PR.
5. That's it! Your simple extension is ready to be reviewed and merge by us.

<!-- That's it! Your simple extension is ready to be used by others via:

```shell
npx create-stark@latest -e {github-username}/{extension-repo-name}:{branch-name} # branch-name is optional
``` -->

## Developing an Advanced Extension

### Template Files and Args

`create-stark` uses a templating system for advanced extensions that need to modify existing files. This system allows you to inject content into specific files in the base project using the `*.args.mjs` files.

Key points:

- They allow you to add specific content to files in the base project.
- Not all files can be modified this way, files with `*.template.mjs` are supported template files.
- To use a template file, create an `*.args.mjs` file in your extension having the same path structure as `*.template.mjs`. For example, to modify .gitignore, you'd create `extension/packages/nextjs/.gitignore.args.mjs`.

### Advanced Development Workflow

When creating complex extensions, Scaffold-Stark 2 provides a set of tools to make the process easier. This workflow allows you to test your extension locally.

### Extension Development Utility

1. **Clone the `create-stark` Repository:**

   ```bash
   git clone https://github.com/Scaffold-Stark/create-stark.git
   cd create-stark
   yarn install
   ```

2. **Add your extension:**

In `src/extensions.js`, add path to your extensions:

```
...,
{
  "extensionFlagValue": "your-extension",
  "description": "Your extension",
  "repository": "https://github.com/{github-username}/{extension-repo-name}",
  "branch": "{branch-name}"
}
```

3. **Run the Build Script:**

   ```bash
   yarn build:dev
   ```

   This creates `cli.js` in the `dist` directory.

4. **Run the CLI to Create a New Instance:**

   ```bash
   yarn cli
   ```

   This command will create a **new base instance**, similar to running `npx create-stark@latest`.
   Note: It's recommended to create a **new base instance** outside of the `create-stark` folder, so use `../<your-instance-name>`.

   The name mentioned for the "Your project name" question will be used as the **extension name**. For example, if you provide `../eip` as the value to the question, then the final extension name will be `eip`.

5. **Test the Extension:**

   - cd into the instance directory.
   - Install dependencies and test your extension.

<!-- ### Local Testing:

This phase allows you to test your extension locally and see how it works when used by other developers.

> NOTE: If you've already published your extension to GitHub using the "Developing a Simple Extension" approach, make sure to clone that extension repository into the `create-stark/externalExtensions/` directory before proceeding with local testing.

1. **Run the CLI in dev mode:**

   ```bash
   yarn cli -e {extensionName} --dev
   ```

   Example: `yarn cli -e eip --dev`

   The `extensionName` should be present in `create-stark/externalExtensions/${extensionName}`.

   Let's suppose you named your project "../my-dev-instance". Then this `../my-dev-instance` should contain all your extension changes. `--dev` will symlink the extension to the instance project.

2. **Test and Tweak the Extension:**
   Since the instance is symlinked with the extension, make necessary changes directly in the symlinked files within `../my-dev-instance`, and the changes should be automatically reflected in the `create-stark/externalExtensions/${extensionName}` directory.

3. **Push the tweaked changes**

   - Go inside the extension directory.
   - Push the changes to GitHub.

   ```bash
   cd create-stark/externalExtensions/${extensionName}
   git add .
   git commit -m "some changes"
   git push
   ```

   Next time users call your extension via `npx create-stark@latest -e`, they will get the updated version. -->
