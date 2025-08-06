module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "import",
    "jsx-a11y"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  rules: {
    "prettier/prettier": "off",
    "import/no-unresolved": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react/react-in-jsx-scope": "off",
    "import/named": "off",
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/img-redundant-alt": "off",
    "jsx-a11y/heading-has-content": "off",
    "react/no-unescaped-entities": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react-hooks/exhaustive-deps": "off"
  },
  overrides: [
    {
      files: ["*.tsx"],
      rules: {
        "react/prop-types": "off"
      }
    }
  ]
}