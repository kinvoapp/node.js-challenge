import { defineConfig } from "vitest/config"

export default () => {
  const config = defineConfig({ test: { globals: true } })
  return config
}
