import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const scryptAsync = promisify(scrypt);
const input = createInterface({ input: stdin, output: stdout });
try {
  const password = await input.question("Nova senha administrativa (mínimo 12 caracteres): ");
  if (password.length < 12 || password.length > 128) {
    throw new Error("A senha deve ter entre 12 e 128 caracteres.");
  }
  const salt = randomBytes(16).toString("base64url");
  const hash = await scryptAsync(password, salt, 64);
  stdout.write(`\nADMIN_PASSWORD_HASH=scrypt$${salt}$${Buffer.from(hash).toString("base64url")}\n`);
} finally {
  input.close();
}
