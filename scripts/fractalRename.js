/**
 * Rename files recursively in directory to follow "fractal" folder structure. Improve readability, file-discovery, and tooling integration
 * - Rename index.js and index.spec.js to parent directory e.g. MyComponent/index.js -> MyComponent/MyComponent
 * - Create index.js file that exports main component, skipping snapshot directories
 *
 * **Before**
 *
 *  * MyFeature /
 *  - index.js
 *  - index.spec.js
 *  - Subcomponent /
 *     - index.js
 *     - index.spec.js
 *
 * **After**
 *
 * MyFeature /
 *  - index.js
 *  - MyFeature.js
 *  - MyFeature.spec.js
 *  - Subcomponent /
 *     - index.js
 *     - Subcomponent.js
 *     - Subcomponent.spec.js
 *
 * Based on: https://gabrieleromanato.name/nodejs-renaming-files-recursively
 */

const path = require("path");
const fs = require("fs");

const CURR_DIR = `${process.cwd()}/src/Components`;

const listDir = (dir, fileList = []) => {
  let files = fs.readdirSync(dir);

  files.forEach((file) => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      fileList = listDir(path.join(dir, file), fileList);
    } else {
      const parentDirName = path.basename(dir);
      let src = path.join(dir, file);
      if (/^index\.js$/.test(file)) {
        let newSrc = path.join(dir, `${parentDirName}.js`);
        fileList.push({
          oldSrc: src,
          newSrc: newSrc,
        });
      }
      if (/^index\.spec\.js$/.test(file)) {
        let newSrc = path.join(dir, `${parentDirName}.spec.js`);
        fileList.push({
          oldSrc: src,
          newSrc: newSrc,
        });
      }
    }
  });

  return fileList;
};

let foundFiles = listDir(CURR_DIR);
foundFiles.forEach((f) => {
  fs.renameSync(f.oldSrc, f.newSrc);
});

const recurisvelyCreateNewFile = (dir, fileList = []) => {
  let files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory() && file !== "__snapshots__") {
      fileList.push({
        path: `${fullPath}/index.js`,
        content: `export { default } from "./${path.basename(fullPath)}"`,
      });

      fileList = recurisvelyCreateNewFile(path.join(dir, file), fileList);
    }
  });

  return fileList;
};

let filesToWrite = recurisvelyCreateNewFile(CURR_DIR);
filesToWrite.forEach((f) => {
  fs.writeFileSync(f.path, f.content, "utf8");
});
