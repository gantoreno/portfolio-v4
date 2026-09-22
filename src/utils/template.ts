import chalk from "chalk";

export function render(template: string, values: { [key: string]: string }) {
  let finalTemplate = template;

  for (let key of Object.keys(values)) {
    finalTemplate = finalTemplate.replace(`{{ ${key} }}`, values[key]);
  }

  return finalTemplate;
}
