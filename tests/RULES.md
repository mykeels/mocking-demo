# Function Rules

- On lines 3-7, we can see that if there’s an validation error, the function is expected to respond with a 400 http status code, and a message.

- On lines 10-13, if a product category already exists, it should respond with a 409 status code, and a message.

- If we pass the previous two checkpoints, then we can create the product category, and respond with it,

  - unless something goes wrong during the creation, in which case, we respond with a 500 status code, and an error message.
