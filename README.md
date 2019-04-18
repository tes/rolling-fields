# rolling-fields

A simple library that will dynamically generate fields for your form.

## Installation

```
npm i rolling-fields
```

## Usage

#### Basic

```jsx
import DynamicFieldBuilder from 'rolling-fields';

   const fields = [
      { name: 'green field' },
      { name: 'open field', type: 'password' },
      { type: 'submit', text: 'Submit' },
    ];

   <form>
    <DynamicFieldBuilder fields={fields} />
   </form>
```

**renders:**

```html
 <form>
  <input name="green field" />
  <input name="open field" type="password" />
  <button type="submit">Submit</button>
 </form>
 ```

## Props

```jsx
  <DynamicFieldBuilder
    fields={} // Array of field objects
    mappings={} // Optional object to define how to render different types of fields
    onBlur={}
    onChange={}
    setFieldValue={} // Use for custom input that does not support HTML SyntheticEvent
  />
```

If no custom mappings are supplied, [default mappings](https://github.com/tes/rolling-fields/blob/master/lib/defaultMappings.jsx) will be used.
 
#### Custom mappings

```jsx
  const MyCustomInput = ({ name }) => (
    <input name={name} className="custom"> Something cool! </input>
    )

   const fields = [
      { name: 'green field' },
      { name: 'open field', type: 'custom' },
      { type: 'submit', text: 'Just do it!' },
    ];
    
    const mappings = {
      string: ({ name }) => (<input name={name} className="string-field" />),
      custom: ({ name }) => (<MyCustomComponent name={name} />),
      submit: ({ name }) => (<button type="submit" >{text}</button>),
    
  <form>
    <DynamicFieldBuilder fields={fields} mappings={mappings} />
  </form>
```

**renders:**

```html
 <form>
  <input name="green field" class="string-field" />
  <input name="open field" class="custom"> Something cool! </input>
  <button type="submit">Just do it!</button>
 </form>
 ``` 

#### How to run tests and storybook

Clone this repository and run
```
npm install
```
You can run the [mocha](https://github.com/mochajs/mocha) tests with
```
npm test
```
You can run [storybook]()https://github.com/storybooks/storybook/tree/master/app/react on locally using:
```
npm run storybook
```
