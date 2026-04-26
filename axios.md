*async/await is part of ECMAScript 2017 and is not supported in Internet Explorer and older browsers.*      

axios is a universal HTTP client that can be used in both the browser and Node.js.  
This means you can use axios to make API requests from your frontend code as well as your backend code.  
This makes axios a great choice for building progressive web apps, single-page applications, and server-side rendered applications.  
By using axios for both frontend and backend code, you can have a consistent API for making HTTP requests, which can help reduce the complexity of your codebase.   
# Installation
```
npm install axios
```
```jsx
import axios from "axios"
const response = await axios.get(
    "http://api/posts"
)

console.log(response.data)
```
axios provides a simple API for making requests. You can use the `axios.get` method for a GET Request, `axios.post` for a POST request, `axios.request` method to make a request with any method,,,  
You can set a timeout: 
```jsx
const response = await axios.get("url/posts", {
    timeout: 5000  //5 seconds
})
```
### Using then/catch/finally
Since axios returns a promise at its core, you can use callbacks with `then`, `catch`, and `finally` to handle your response data, errors, and completion.  
**GET**
```jsx
axios
    .get("url/posts", {
        params: {
            postId: 5
        },
    }
    // , {headers: {"Authorization": "Bearer..."}} //  Third arg: the Config for headers, timeouts, etc  [OPTIONAL]
    )
    .then (r => r.data)  //Axios automatically does parses our data as JSON hence no need to jsonify them.  
    .catch(err => console.error(err))
    .finally(() => {
        console.log("Request completed")
    })
```
**POST**
```jsx
axios 
    .post("url/items", {
        title: "foo", 
        body: "bar", 
        userId: 1
    })
    .then(r => r.data)
    .catch(err => console.error(err))
    .finally(() => {
        console.log("Done")
    })
```
In the method above we are not actually returning anything. To ensure we get our data we will take the example format below.  
```jsx
const postData = async () => {
    try {
        const response = await axios.post(
            "url/posts", 
            { MyObjkey: "Value"}
        )
        return response.data
    } catch (err) {
        console.error("Request Failed", err)
    } finally {
        console.log("Done!")
    }
}

const myData = await updatePost()
console.log(myData)
```
**PUT**
```jsx
axios
    .put("url/items/1", {
        title: "foo", 
        body: "bar", 
        userId: 1
    })
    .then(r => r.data)
    .catch(err => console.error(err))
    .finally(() => {
        console.log("Done")
    })
```
**PATCH**
```jsx
axios
    .patch("url/items/1", {
        title: "foo"
    })
    .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Request completed");
  });
```
**DELETE**
```jsx
axios
    .delete("url/items/1")
    .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Request completed");
  });
```
### Using async/await
Using async and await allows you to use try/catch/finally blocks to handle errors and completion making your code more readable and easier to understand, this also helps prevents so called callback hell.     
**GET**
```jsx
const getPosts = async () => {
    try {
        const response = await axios.get(
            "url/items", 
            {
                params: {
                    postId: 5
                }
            }
        )
        console.log(response.data)
    } catch (err) {
        console.error(errr)
    } finally {
        console.log("Done")
    }
}
```
**POST**
```jsx
const createPost = async () => {
    try {
        const response = await axios.post(
            "url/items", 
            {
                title: "foo", 
                body: "bar", 
                userId: 1
            }
        )
        console.log(response.data)
    } catch (err) {
        console.error(err)
    } finally {
        console.log("Done")
    }
}
```
**PUT**
```jsx
const updatePost = async () => {
  try {
    const response = await axios.put(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        title: "foo",
        body: "bar",
        userId: 1,
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Request completed");
  }
};
```
**PATCH**
```jsx
const updatePost = async () => {
  try {
    const response = await axios.patch(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        title: "foo",
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Request completed");
  }
};
```
**DELETE**
```jsx
const deletePost = async () => {
    try {
        const response = await axios.delete("url/items/1")
        console.log(response.data)
    } catch (err){
        console.error(err)
    } finally {
        console.log("Post deleted successfully!")
    }
}
```
*With Axios, there is no need to convert the response to json as it handles it for us.*
### PUT, POST, PATCH
In axios, these methods typically take three arguments: 
- `url`  
- `data`, 
- config
```
Method              Axios Argument Structure                                Fetch Equivalent
POST                axios.post(url, data, config)                           fetch(url,{ method: 'POST', body: JSON.stringify(data) })
PUT                 axios.put(url, data, config)                            fetch(url,{ method: 'PUT', body: JSON.stringify(data) })
PATCH               axios.patch(url, data, config)                          fetch(url, { method: 'PATCH', body: JSON.stringify(data) })
```
### GET and DELETE 
These methods usually don't have a "body", therefore, Axios only takes two args: 
- `url`
- `config`

**GET with Params**
When you use `params` in Axios, it automatically appends them to the URL as a query string.  
- **Axios**: `axios.get(url, {params: {postId: 5}})`
- **Fetch**: One must manually append it: `fetch(url + '?postId=5')` or use the `URLSearchParams` object. 

**DELETE**
- **Axios**: `axios.delete(url, config)`
- **Fetch**: fetch(url, { method: 'DELETE' })