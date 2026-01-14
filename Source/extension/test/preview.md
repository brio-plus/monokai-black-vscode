# Monokai Black - Markdown Preview Test

This file tests syntax highlighting in VS Code's markdown preview with the Monokai Black theme.

## JavaScript

```javascript
// Comment - should be gray italic
const greeting = "Hello, World!"; // String - should be yellow
let count = 42; // Number - should be purple

function sayHello(name) { // Function - should be green, param - should be orange
  if (name) { // Keyword - should be pink
    console.log(`${greeting}, ${name}!`);
  }
  return true; // Constant - should be purple
}

class Person { // Class - should be cyan
  constructor(name) {
    this.name = name;
  }
}

export default sayHello;
```

## TypeScript

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

type Status = 'active' | 'inactive';

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

const users: User[] = [];
```

## Python

```python
# This is a comment
import re
from typing import List, Optional

class DataProcessor:
    """A class for processing data."""

    def __init__(self, data: List[str]):
        self.data = data
        self.processed = False

    def process(self, pattern: str = r'\w+') -> Optional[List[str]]:
        if not self.data:
            return None

        results = []
        for item in self.data:
            matches = re.findall(pattern, item)
            results.extend(matches)

        self.processed = True
        return results

# Usage
processor = DataProcessor(["Hello World", "Test 123"])
output = processor.process()
print(f"Found {len(output)} matches")
```

## JSON

```json
{
  "name": "monokai-black",
  "version": "1.1.0",
  "settings": {
    "enabled": true,
    "count": 42,
    "colors": ["#000000", "#f7f1ff", "#fce566"]
  }
}
```

## CSS

```css
/* Theme variables */
:root {
  --background: #000000;
  --foreground: #f7f1ff;
  --accent: #fce566;
}

.code-block {
  background-color: var(--background);
  color: var(--foreground);
  padding: 16px;
  border-radius: 4px;
}

.code-block:hover {
  border-color: var(--accent);
}
```

## Bash

```bash
#!/bin/bash

# Build script
echo "Building extension..."

npm install
npm run build

if [ $? -eq 0 ]; then
  echo "Build successful!"
  vsce package
else
  echo "Build failed!"
  exit 1
fi
```

## Rust

```rust
use std::collections::HashMap;

#[derive(Debug)]
struct Config {
    name: String,
    enabled: bool,
}

impl Config {
    fn new(name: &str) -> Self {
        Config {
            name: name.to_string(),
            enabled: true,
        }
    }
}

fn main() {
    let config = Config::new("monokai-black");
    println!("Config: {:?}", config);
}
```

## Go

```go
package main

import "fmt"

type Person struct {
    Name string
    Age  int
}

func (p Person) Greet() string {
    return fmt.Sprintf("Hello, my name is %s", p.Name)
}

func main() {
    person := Person{Name: "Alice", Age: 30}
    fmt.Println(person.Greet())
}
```

## Inline Code

You can also use `inline code` which should have a dark background.

## Expected Color Results

| Element | Expected Color | Hex Code |
|---------|----------------|----------|
| Comments | Gray (italic) | `#69676c` |
| Strings | Yellow | `#fce566` |
| Keywords | Pink | `#fc618d` |
| Functions | Green | `#7bd88f` |
| Types/Classes | Cyan | `#5ad4e6` |
| Numbers/Constants | Purple | `#948ae3` |
| Parameters | Orange | `#fd9353` |
| Punctuation | Gray | `#8b888f` |
| Background | Black | `#000000` |
| Foreground | Off-white | `#f7f1ff` |

## How to Test

1. Install the extension VSIX in VS Code
2. Open this file
3. Press `Ctrl+Shift+V` (or `Cmd+Shift+V` on Mac) to open preview
4. Verify code blocks have syntax highlighting with colors matching the table above
5. Verify code blocks have black background with gray border
