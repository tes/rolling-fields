# rolling-fields

[![dependencies Status](https://david-dm.org/tes/rolling-fields/status.svg)](https://david-dm.org/tes/rolling-fields)
[![NPM version](https://img.shields.io/npm/v/marv.svg?style=flat-square)](https://www.npmjs.com/package/marv)

![alt text](https://upload.wikimedia.org/wikipedia/commons/4/41/Landscape-agriculture.svg)

_Image by gnokii - Open Clipart, CC0_ 


A simple library that dynamically generates fields for your React form.

Use rolling-fields to create forms on-the-fly from a field definition stored outside your deployed code and read in at runtime.

How you build your field schema is up to you. It could be a simple as a JSON file or an API call that fetches your field schema from a database.

rolling-fields also enables you to make your form even more dynamic by loading different fields depending on the values a user selects inside the form. 

rolling-fields is designed to be used within [Formik](https://jaredpalmer.com/formik/) or plain [React forms](https://reactjs.org/docs/forms.html).

To find out more about the benefits of using rolling-fields, check out this [Rolling Your Own Dynamic Forms](https://engineering.tes.com/post/rolling-fields/) blog post.

## Usage

### Basic

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

### Props

```jsx
  <DynamicFieldBuilder
    fields={} // Array of field objects
    mappings={} // Optional object to define how to render different types of fields
    fieldContext={} // Optional value that will be shared among all fields when using custom mappping
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
      { name: 'hide', type: 'invisible', },
      { name: 'show' type: 'visible', },
      { type: 'submit', text: 'Just do it!' },
    ];
    
    const mappings = {
      string: ({ name }) => (
        <input name={name} className="string-field" />
      ),
      custom: ({ name }) => (
        <MyCustomComponent name={name} />
      ),
      invisible: ({ name }, fieldContext) => !fieldContext.isVisible && (
        <input name={name} />
      ),
      visible: ({ name }, fieldContext) => fieldContext.isVisible && (
        <input name={name} />
      ),
      submit: ({ name, text }) => (
        <button type="submit" >{text}</button>
      ),
    };
    
  <form>
    <DynamicFieldBuilder
        fields={fields}
        mappings={mappings}
        fieldContext={{ isVisible: true }}
        />
  </form>
```

**renders:**

```html
 <form>
  <input name="green field" class="string-field" />
  <input name="open field" class="custom"> Something cool! </input>
  <input name="show" />
  <button type="submit">Just do it!</button>
 </form>
 ``` 

## Installation

```
npm i rolling-fields
```

## Running the tests 

Clone this repository and run
```
npm install
```
You can run the [mocha](https://mochajs.org/) unit tests with
```
npm test
```
## Running storybook

You can run [storybook](https://github.com/storybooks/storybook/tree/master/app/react/) locally using:
```
npm run storybook
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/tes/rolling-fields/tags). 

## Contribution

This project is brought to you by [Tes](https://github.com/tes) engineers. Check out [contributors](https://github.com/tes/rolling-fields/graphs/contributors) who participated in this project.

If you have improvements to offer, please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

