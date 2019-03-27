# rolling-fields

A simple library that will dynamically generate fields for your form.

## Props

```
  <DynamicFieldBuilder
    fields={} // Array of field objects
    mappings={} // Optional object to define how to render different types of fields
    onBlur={}
    onChange={}
    setFieldValue={} // Use for custom input that does not support HTML SyntheticEvent
  />
```

If no custom mappings are supplied, [default mappings](https://github.com/tes/rolling-fields/blob/master/lib/defaultMappings.jsx) will be used.

## Usage

#### Basic

```
   const fields = [
      { name: 'green field' },
      { name: 'open field', type: 'password' },
      { type: 'submit', text: 'Submit' },
    ];

   <form>
    <DynamicFieldBuilder fields={fields} />
   </form>
```

renders:

```
 <form>
  <input name="green field" />
  <input name="open field" type="password" />
  <button type="submit">Submit</button>
 </form>
 ```


 
#### Custom mappings

```
  const MyCustomInput = ({name, key}) => (
    <input name={name} key={key} id="custom"> Something cool! </input>
    )

   const fields = [
      { name: 'green field' },
      { name: 'open field', type: 'custom' },
      { type: 'submit', text: 'Just do it!' },
    ];
    
    const mappings = {
      string: ({
        name, key
      }) => (<input name={name} key={key} id="string-field" />),
      custom: ({
        name, key
      }) => (<MyCustomComponent name={name} key={key} />),
     submit: ({
        key, text
      }) => (<button type="submit key={key}>{text}</button>),
    
  <form>
    <DynamicFieldBuilder fields={fields} mappings={mappings} />
  </form>
```

renders:

```
 <form>
  <input name="green field" id="string-field" />
  <input name="open field" id="custom"> Something cool! </input>
  <button type="submit">Just do it!</button>
 </form>
 ``` 

#### How to run storybook
Clone this repository and run
```
npm install
```
You can run storybook on development using:
```
npm run storybook
```
