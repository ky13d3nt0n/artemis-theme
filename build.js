import { writeFile, readFileSync } from 'fs';
import yaml from 'js-yaml';

// Theme color definition
const themeColors = yaml.load( readFileSync( "themes/colors.yaml", "utf-8" ) );

// Base has the syntax tokens applicable across multiple languages
let base = yaml.load( readFileSync( "themes/base.yaml", "utf-8" )) ;

// Additional theme definitions to combine with base syntax token styles
const workbench = yaml.load( readFileSync( "themes/workbench.yaml", "utf-8" ) );
const js = yaml.load( readFileSync( "themes/syntax/js.yaml", "utf-8" ) );
const php = yaml.load( readFileSync( "themes/syntax/php.yaml", "utf-8" ) );
// const html = yaml.load( readFileSync( "themes/syntax/html.yaml", "utf-8" ) );
// const css = yaml.load( readFileSync( "themes/syntax/css.yaml", "utf-8" ) );
// const template = yaml.load(readFileSync("themes/template.yaml", "utf-8"));
// const markdown = yaml.load(readFileSync("themes/markdown.yaml", "utf-8"));
// const js = yaml.load(readFileSync("themes/js.yaml", "utf-8"));
// const html = yaml.load(readFileSync("themes/html.yaml", "utf-8"));
// const css = yaml.load(readFileSync("themes/css.yaml", "utf-8"));
// const regex = yaml.load(readFileSync("themes/regex.yaml", "utf-8"));
// const jsdoc = yaml.load(readFileSync("themes/jsdoc.yaml", "utf-8"));

// Merge workbench styles
Object.assign( base, workbench );

// Merge additional syntax token styles
base.tokenColors = base.tokenColors.concat(
  // template,
  // markdown,
  js,
  // html,
  // css,
  // regex,
  // jsdoc
  php
);

// Stringify all of the combined theme styles so we can run string regexes on it to
// replace color variables with color values
base = JSON.stringify(base, null, 2);

for (let color in themeColors) {
  base = base.replace(new RegExp(color + '"', "g"), themeColors[color] + '"');
}

// Base file has been extended with additional theme styles and color variables have
// been replaced with Panda theme values. Write to /dist for consumption.
writeFile("dist/Theme.json", base, err => {
  if (err) {
    console.warn(err);
  }
  console.log("Build finished");
});
