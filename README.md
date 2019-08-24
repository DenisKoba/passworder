# passworder

Easy to use lib for generating and validating passwords.

## Installation

```bash
npm i passworder
```

## Usage

Generate password with default length (8 digits)
```javascript
import passowrder from 'passworder'

passowrder.generate() // => "scs9&J01"
```

Generate password with custom length
```javascript
import passowrder from 'passworder'

passowrder.generate(20) // => "scs9&J01ligb*0MB6fd0"
```

Validate password
```javascript
import passowrder from 'passworder'

passworder.validate('1234lowercaseUPPERCASE') // => { status: true, warning: '' }
passworder.validate('only_lower_case_and_1234') // => { status: false, warning: "Your password should contain at least one uppercase letter" }
```
Use custom warning text
```javascript
import passowrder from 'passworder'

passworder.digitErrorMessage = 'your custom digit error message'
passworder.lengthErrorMessage = 'your custom length error message'
passworder.uppercaseErrorMessage = 'your custom uppercase error message'

```

Generate custom password using words and numbers
```javascript
import passowrder from 'passworder'

passworder.generateCustom('Mike', 1977, 'Donovan') // => { first: "Mike1977Donovan", second: "19MikeDonovan77", third: "Donovan1977Mike" }

```

github https://github.com/DenisKoba/passworder
