#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";

const program = new Command();

// CLI version
program.version("1.0.0").description("My Awesome CLI App");

// Example command
program
  .command("greet")
  .description("Greet the user")
  .action(async () => {
    // Ask user's name
    const answers = await inquirer.prompt([
      { type: "input", name: "name", message: "What's your name?" },
    ]);

    console.log(chalk.green(`Hello, ${answers.name}! 👋`));
  });

// Another simple command
program
  .command("bye")
  .description("Say goodbye")
  .action(() => {
    console.log(chalk.blue("Goodbye! Have a nice day! 🌟"));
  });

program.parse(process.argv);
