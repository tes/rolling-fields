# dynamic-form-generator

A simple library that will dynamically generate a form with the fields you specify.

## Props

```
  <DynamicFormBuilder
    fields={} // array of field objects
    mappings={} // optional object to define how to render different types of fields
    onSubmit={} 
    onBlur={}
    onChange={}
  />
```

If no custom mappings are supplied, [default mappings](https://github.com/tes/dynamic-form-generator/blob/master/lib/defaultMappings.jsx) will be used.

## Usage

#### Basic

```
   const fields = [
      { name: 'green field' },
      { name: 'open field', type: 'password' },
    ];
    
   <DynamicFormBuilder fields={fields} />
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
    
   <DynamicFormBuilder fields={fields} mappings={mappings} />
```

renders:

```
 <form>
  <input name="green field" id="string-field" />
  <input name="open field" id="custom"> Something cool! </input>
  <button type="submit">Just do it!</button>
 </form>
 ```
 
 
 
